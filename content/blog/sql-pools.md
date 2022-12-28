---
title: "SQL Pools in Azure Synapse Analytics vs Redshift"
date: 2022-11-15 23:30:13
featureImage: images/allpost/sql-pool-vertical.jpeg
postImage: images/single-blog/sql-pool.jpeg
tags: azure-synapse-analytics
categories: data-lakehouse
---

## What is Dedicated SQL Pool?

 Dedicated SQL Pool (formerly SQL DW) to store data for analytics queries because it leverages a scale-out architecture (Massively Parallel Processing) to distribute computational processing of data across multiple nodes. Applications connect and issue T-SQL commands to a Control node. The Control node hosts the distributed query engine, which optimizes queries for parallel processing, and then passes operations to Compute nodes to do their work in parallel. The Compute nodes store all user data in Azure Storage and run the parallel queries. The Data Movement Service (DMS) is a system-level internal service that moves data across the nodes as necessary to run queries in parallel and return accurate results. 

![Dedicated SQL pool (formerly SQL DW) architecture](https://docs.microsoft.com/en-us/azure/synapse-analytics/sql-data-warehouse/media/massively-parallel-processing-mpp-architecture/massively-parallel-processing-mpp-architecture.png)


Users can connect to Dedicated SQL Pool using Azure Data Studio (on Mac and Windows), SQL Server Management Studio (for Windows), and Azure Synapse Workspace web interface. Refer: [Authentication, Authorization and Access to Data Lakehouse](/Data-Lakehouse/Authentication,-Authorization-and-Access-to-Data-Lakehouse). Azure Synapse Workspace is not an option if you don't have OpenVPN connection, or if you don't need access to data in Azure Data lake storage. 

## What is Serverless SQL Pool?
* In Serverless SQL pool, there is no need to set up infrastructure and maintain clusters. While in dedicated SQL Pool, we reserved a fixed number of Data Warehouse Units (DWU) which dictate the CPU, Memory and IO power for the data warehouse.
* Serverless SQL pool uses a pay-per-use model, so there is no charge for resources reserved, and the charges are made for the data processed by each query that you run. On the other hand, we provisioned our dedicated SQL Pool and pay by Data Warehouse Unit (DWU). 
* When we query Serverless SQL Pool, we query the external tables, which are abstraction of data in data lake storage. As the result, dedicated SQL Pool doesn't support indexes for query optimization, or dynamic data masking or column level encryption for permission granting and data security, as well as materialized views. On the other hand, if we import data from the lake to regular tables in Dedicated SQL Pool, we can take advantage of these mentioned features. Dedicated SQL Pool support materialized views but LEFT, RIGHT, OUTER JOIN is not supported in materialized views query creation.
* Serverless SQL Pool is suitable for adhoc, simple queries when users must have access to data in our data lake storage account. While dedicated pool can be use for more complex queries suitable for analytics purpose, you also can connect to dedicated SQL pool using a SQL client like Azure Data Studio or SQL Server Management Studio. 


## Redshift vs Dedicated SQL Pool Comparison

|  |Redshift  | Dedicated SQL Pool (Synapse Analytics) |
|--|--|--|
|Architecture | clusters with nodes bundled of CPU, storage, memory and IOPS | similar but compute and storage are scaled and billed separately, use Data Warehouse Units with only comprises of CPU, memory and IOPS. In the current setting, we provisioned 1000c DWU for our Synapse SQL Pool, but this can scale up and down depending on how much compute we need |
|Massively Parallel Processing MPP  | available for easy scaling| available for easy scaling  |
| Data Protection | Redshift takes a snapshot about every eight hours or following every 5 GB per node of data changes, snapshot stores in AWS S3 | takes automatic snapshots of the data warehouse throughout the day to create restore points that are available for seven days |
| SQL flavor | PostgreSQL  | T-SQL |
| Permission |permissions apply to tables as a whole  | supports granular permissions on schemas, tables, views, individual columns, procedures, and other objects|
| Data Masking | not native | native dynamic data masking solution for PII and PCI data |