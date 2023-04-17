---
title: "Query Performance Tuning in Dedicated SQL Pool (Azure Synapse Analytics)"
date: 2022-12-15
featureImage: /images/single-blog/query-performance.jpeg
#/images/allpost/query-performance.jpeg
postImage: /images/single-blog/query-performance.jpeg
categories: data-lakehouse
tags: [azure-synapse-analytics]
author: Anh Chu
---

### 1. Best practices when Creating Tables

When creating table in Dedicated SQL Pool, choose the correct Distribution Column and Index for best query performance. Follow [Best Practices in creating tables in Azure Synapse Analytics](./content/blog/create-table-azure-synapse-analytics.md)

**Remember to create and Update Stats on your new tables**
[Table statistics for dedicated SQL pool in Azure Synapse Analytics](https://learn.microsoft.com/en-us/azure/synapse-analytics/sql-data-warehouse/sql-data-warehouse-tables-statistics#examples-update-statistics)


### 2. Identify slow-running QID and analyze compilation

To best determine what is causing any given query's slow performance, you will need to identify an example long-running query:

```sql
SELECT total_elapsed_time/60000 as minutes, s.login_name, 
    r.request_id, r.status, r.[label], r.resource_class, [submit_time], 
    command, r.request_id, start_time, end_time, 
    total_elapsed_time, result_cache_hit
FROM sys.dm_pdw_exec_requests r 
JOIN sys.dm_pdw_exec_sessions s 
on r.session_id = s.session_id
where r.session_id <> session_id()  
    AND r.status not in ('Completed','Failed','Cancelled') 
order by total_elapsed_time desc;
```

See [Monitor query execution](https://docs.microsoft.com/azure/synapse-analytics/sql-data-warehouse/sql-data-warehouse-manage-monitor?WT.mc_id=Portal-Microsoft_Azure_Support#monitor-query-execution) for additional context.

{{< bootstrap-table "table table-light table-striped table-bordered" >}}
| Issue Description      | Mitigation(s)|
| --- | --- |
| Query is waiting on resources | Check for waits that are preventing the query from progressing. You may have to consider killing a blocking statement in order for the query to start processing. Exceeding concurrency limits is a type of wait that is often experienced when workload volume is high, when larger resource classes (for example: xlargerc, staticrc80, etc.) are used, or when your workload isolation configuration conflicts with your expectations.   |
| Metadata is not optimized     | Rebuild clustered columnstore indexes for all tables in your dedicated SQL pool to reduce and better optimize metadata.         |
| Usage of older SQL syntax     | Adhere your query to ANSI-92 style joins (have joiners in FROM clause instead of in WHERE clause). Alternatively, consider adding the query hints OPTION(FORCE_ORDER, FORCE_LEGACY_CARDINALITY_ESTIMATION) to the problem query to allow the distributed optimizer better interpret an ANSI-89 style query syntax.  |
| Highly complex queries | Highly complex queries can sometimes impact compilation performance/duration. Consider breaking the query into multiple steps to reduce the complexity of any one given query.              |
| Long-running DROP TABLE or TRUNCATE TABLE statements | In the event that your workload has recently or very frequently issues a high volume of DROP TABLE or TRUNCATE TABLE statements, asynchronous background processes to complete the data removal may impede currently running DROP TABLE and TRUNCATE TABLE statements. To workaround this issue, run DBCC SHRINKDATABASE against your dedicated SQL pool to immediately force this cleanup. This process should be run in isolation (without any other workload running). |

{{</bootstrap-table>}}

### 3. Analyze the distributed query plan

You may need to analyze all of the steps of the distributed plan. Run the following statement to retrieve these details:

```sql
select * from sys.dm_pdw_request_steps where request_id = 'QID######' order by step_index;
```

As you review each step of the distributed plan, evaluate following conditions and complete the recommended mitigation if applicable:

{{< bootstrap-table "table table-light table-striped table-bordered" >}}
| Evaluate   | Mitigation(s)    |
| --- |---|
| Are row estimations inaccurate by more than 10% (compare row_count to estimated_rows)?| Create/Update statistics for all tables referenced in the query. For large tables, you may need to consider executing WITH FULLSCAN in order to achieve the best estimations.  |
| Is the health of clustered columnstore indexes for all tables referenced in longest-running step in poor condition? | Evaluate and consider rebuilding clustered columnstore indexes for tables referenced by the query in in question in order to reduce IO, memory, and CPU overhead.      |
| Do BroadcastMoveOperations exist for replicated tables? | Review our Design guidance for replicated tables. The poor query performance could be mitigated by warming the replicated cache prior to user queries are executed. However, if the replicated cache is frequently rebuilding due to INSERT/UPDATE/DELETE statements or if it is a very large table, consider changing the table distribution type from REPLICATE to ROUND_ROBIN. |
| Are there a large number of steps to the plan or data movement operations (for example: ShuffleMoveOperation) that are moving unexpectedly large number of rows? | Carefully review our tables overview, distributed table design guidance, and replicated table design guidance articles to ensure your table design choices align to best practices. Alternatively, the query may be very complex and would benefit from being broken into multiple statements. |
{{</bootstrap-table>}}

### 4. Analyze a specific query plan

Using the output of the query from the Analyze the distributed query plan section, identify the longest-running (by total_elapsed_time) step of the query plan. Once identified, note the location_type of the step and then choose the appropriate query below to update with request_id (QID) and step_index and then execute the query:

- If location_type in ('Compute', 'Control')
```sql
select * from sys.dm_pdw_sql_requests where request_id = 'QID######' and step_index = #;
```

- If location_type = 'DMS' (DMS = Data Movement Service)
```sql
select * from sys.dm_pdw_dms_workers where request_id = 'QID######' and step_index = #;
```

**a. Analyze distributed query plan**

The output from these queries show information about the execution of the step's query on each distribution. Though there will be variations, the durations of each distribution should be generally similar. If, however, you observe a small number of distributions taking significantly more time than the other distributions, consider the following possible causes and mitigations:

{{< bootstrap-table "table table-light table-striped table-bordered" >}}
| Issue                  | Mitigation  |
| ---| --- |
| Out-of-date statistics | Though mentioned previously, inaccurate statistics can result in inconsistent execution plans for specific distributions. Create/Update statistics for all tables referenced in the query.                              |
| Data skew              | Use DBCC PDW_SHOWSPACEUSED to evaluate the distribution of data for the tables in your query. If you find that the rows are not evenly distributed, review our guidance on choosing a good distribution column in order to modify any problematic table(s)                         |
| In-flight data skew    | Even if your tables are properly distributed, some queries may result in a ShuffleMoveOperation which moves a disproportionate set of data to one distribution. To mitigate, you will have to force the distributed plan to change so that the shuffle does not occur on a low-cardinality column. Consider:- Changing the order of your GROUP BY columns to lead with a higher cardinality column- Creating multi-column statistic if joins cover multiple columns- Adding query hint OPTION(FORCE_ORDER) to your query- Refactoring the query |
{{</bootstrap-table>}}

**b. Use EXPLAIN WITH RECOMMENDATION**

You can also review the query plan before executing a query using Explain [With_Recommendation] command following: [Explain (T-SQL)](https://learn.microsoft.com/en-us/sql/t-sql/queries/explain-transact-sql?view=azure-sqldw-latest) and [How to read execution plan](https://www.sqlshack.com/how-to-read-an-execution-plan-with-all-details/)

### 5. Analyze impacts of concurrent workload
If you eliminated all previous criteria, it's possible that your query is from a a server or client system resource bottleneck. Be sure to revisit the anti-patterns section above and ensure you are following our recommended best practices .

However, one final possibility to consider is that your overall concurrent workload is constraining shared resources such as IO, network IO, CPU, memory, etc based on your current resource configuration. Perceived poor performance can be the result of either an undersized dedicated SQL pool or client.

{{< bootstrap-table "table table-light table-striped table-bordered" >}}
| Resource           | How to detect    | Mitigation   |
| ---| --- | --- |
| Dedicated SQL pool | Review metrics of your dedicated SQL pool to determine if resources are peaking during times of poor performance. | Consider temporarily scaling up your dedicated SQL pool to determine if the execution duration improves with increased resources.                          |
| Client             | Monitor your client resources while reproducing the issue.           | Consider spreading out the workload that the client is processing, scale up the client resources, or scale out portions of the workload to another client. |
{{</bootstrap-table>}}
