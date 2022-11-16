---
title: "Best Practices in creating tables in Azure Synapse Analytics"
date: 2022-11-15 23:24:30
featureImage: images/allpost/allPost-7.jpg
postImage: images/single-blog/feature-image.jpg
tags: azure-synapse-analytics
categories: data-lakehouse
---

As Dedicated SQL pool uses a scaled-out node based architecture, when creating tables in Dedicated SQL Pool, remember to specify the distribution (sharding strategy) and index for your tables. 
*Reference: [Dedicated SQL Pool Architecture](https://docs.microsoft.com/en-us/azure/synapse-analytics/sql-data-warehouse/massively-parallel-processing-mpp-architecture)*

#### Choosing Distribution: 
The data is sharded into distributions to optimize the performance of the system. You can choose which sharding pattern to use to distribute the data when you define the table. These sharding patterns are supported:
* **Hash**: deliver the highest query performance for joins and aggregations on large tables. This is most relevant to analytics tables. 
* **Round Robin**: delivers fast performance when used as a staging table for loads, not relevant to analytics queries
* **Replicate**: provides the fastest query performance for small tables.A table that is replicated caches a full copy of the table on each compute node. Consequently, replicating a table removes the need to transfer data among compute nodes before a join or aggregation. Replicated tables are best utilized with small tables. Extra storage is required and there is additional overhead that is incurred when writing data, which make large tables impractical.

#### Choosing Index
Besides, you will need to specify the index for your table, there are 3 options:
* **CLUSTERED COLUMNSTORE INDEX** -- default for Synapse Analytics: if table is created without index option specified. Clustered columnstore tables offer both the highest level of data compression and the best overall query performance. Clustered columnstore tables will generally outperform clustered index or heap tables and are usually the best choice for large tables (it's recommended to use CCI for tables with more than 60 million rows).
* **CLUSTERED COLUMNSTORE INDEX ORDER**(column [,...n]) : this is a more advanced option for further query tuning (refer: [performance tuning with ordered CCI](https://docs.microsoft.com/en-us/azure/synapse-analytics/sql-data-warehouse/performance-tuning-ordered-cci?view=azure-sqldw-latest#query-performance))
* **HEAP**: it's best for staging table to load data to dedicated SQL Pool
* **CLUSTERED INDEX** ( { index_column_name [ ASC | DESC ] } [ ,...n ] ) -- default order is ASC: Clustered indexes may outperform clustered columnstore tables when a single row needs to be quickly retrieved. For queries where a single or very few row lookup is required to perform with extreme speed, consider a clustered index or nonclustered secondary index. The disadvantage of using a clustered index is that only queries that benefit are the ones that use a highly selective filter on the clustered index column. To improve filter on other columns, a nonclustered index can be added to other columns. However, each index that is added to a table adds both space and processing time to loads.


#### Update Stats on the table

```sql
declare @minRows int=1000000;
declare @minSkewPercent decimal=10.0;
declare @missingStatCtlRowCount int=1000;
declare @CtlCmpRowDifferencePercentageForOutdatedStats decimal=20.0;
 
with cmp_details as
(
       select tm.object_id, ps.index_id, ps.distribution_id, count(ps.partition_number) [partitions], sum(ps.row_count) cmp_row_count
       from sys.dm_pdw_nodes_db_partition_stats ps
              join sys.pdw_nodes_tables nt on nt.object_id=ps.object_id and ps.distribution_id=nt.distribution_id
              join sys.pdw_table_mappings tm on tm.physical_name=nt.name
       where ps.index_id<2
       group by tm.object_id, ps.index_id, ps.distribution_id
)
, cmp_summary as
(
       select object_id, index_id, sum(cmp_row_count) cmp_row_count
              , (max(cmp_row_count)-min(cmp_row_count)) highest_skew_rows_difference
              , convert(decimal(10,2),((max(cmp_row_count) - min(cmp_row_count))*100.0 / nullif(sum(cmp_row_count),0))) skew_percent
       from cmp_details
       group by object_id, index_id
)
, ctl_summary as
(
       select t.object_id, i.index_id, s.name [schema_name], t.name table_name, i.type_desc table_type, dp.distribution_policy_desc distribution_type, count(p.partition_number) [partitions], sum(p.rows) ctl_row_count
       from sys.schemas s
              join sys.tables t on t.schema_id=s.schema_id
              join sys.pdw_table_distribution_properties dp on dp.object_id=t.object_id
              join sys.indexes i on i.object_id=t.object_id and i.index_id<2
              join sys.partitions p on p.object_id=t.object_id and p.index_id=i.index_id
       group by t.object_id, i.index_id, s.name, t.name, i.type_desc, dp.distribution_policy_desc
)
, [all_results] as
(
       select ctl.object_id, ctl.index_id, ctl.[schema_name], ctl.table_name, ctl.table_type, ctl.distribution_type, ctl.[partitions]
              , ctl.ctl_row_count, cmp.cmp_row_count, convert(decimal(10,2),(abs(ctl.ctl_row_count - cmp.cmp_row_count)*100.0 / nullif(cmp.cmp_row_count,0))) ctl_cmp_difference_percent
              , cmp.highest_skew_rows_difference, cmp.skew_percent
              , case
                     when (ctl.ctl_row_count = @missingStatCtlRowCount) then 'missing stats'
                     when ((ctl.ctl_row_count <> cmp.cmp_row_count) and ((abs(ctl.ctl_row_count - cmp.cmp_row_count)*100.0 / nullif(cmp.cmp_row_count,0)) > @CtlCmpRowDifferencePercentageForOutdatedStats)) then 'outdated stats'
                     else null
                end stat_info
              , case when (cmp.skew_percent >= @minSkewPercent) then 'data skew' else null end skew_info
       from ctl_summary ctl
              join cmp_summary cmp on ctl.object_id=cmp.object_id and ctl.index_id=cmp.index_id
)
select *
from [all_results]
--where cmp_row_count>@minRows and
where (stat_info is not null or skew_info is not null)
and [schema_name] = 'analytics'
order by [schema_name], table_name;
```

