---
title: "The beauty of a data lakehouse"
date: 2023-04-11 16:26:45
featureImage: /images/single-blog/data-lakehouse.png
#images/allpost/lakehouse.webp
postImage: /images/single-blog/data-lakehouse.png
categories: data-lakehouse
tags: [data-warehouse, data-lakehouse, data-lake]
author: Anh Chu
---

Choosing Enterprise Data Solution is a key challenge for modern businesses. With the explosion of data in recent years, organizations need to be able to store, manage, and analyze vast amounts of information to gain insights and make informed decisions. Data lakes, data warehouses, and data lakehouses are three popular solutions for managing data. However, Data Lakehouse has recently become a trend in distributed data management system 

# The battle: Data Warehouse vs Data Lake vs Data Lakehouse

A data warehouse is a centralized repository that stores structured, processed data from a variety of sources. It is designed to support business intelligence (BI) analytics and reporting by delivering clean, structured data. Data warehouses are typically built using a schema-on-write approach, where data is pre-processed before being loaded into the warehouse. Some popular examples of data warehouses include Teradata, Snowflake, Redshift, Big Query, and Synapse Analytics (dedicated sql pool offering).

A data lake is a large, centralized repository that stores raw, unprocessed data of any nature in any format. Unlike a data warehouse, a data lake does not enforce a schema or structure. This makes it suitable for storing massive amounts of data that may not fit into a traditional schema-on-write approach. Many organizations use data lakes for data science and machine learning, but not for BI reporting due to its unvalidated nature. Some popular examples of data lakes include Amazon S3 and Azure Data Lake Storage.

Data warehouse delivers clean, structured data for BI analytics, while a data lake permanently and cheaply stores data of any nature in any format. A data lakehouse combines the advantages of a data warehouse and a data lake, providing reliable transactions, scalability, and cost-effectiveness.


## Why the data lakehouse?

Normally, organizations who want to leverage both structured and unstructured data need to build two separate data management systems: data warehouse and data lake. These two systems require separate governance and security models, and serve different use cases. Consequently, this leads to duplicate data silos, incompatible security and governance models, and incomplete support for all use cases. Needless to say, having separate data management systems is expensive, complex, and difficult to leverage analytics and AI at the same time.

The data lakehouse is meant to be One Unified Data Platform that handles all data types, and supports multiple personas, multiple programming APIs, multiple use cases with one security and governance model.

In fact, Data lakehouse solutions have gained popularity in recent years, resulting in various options being offered by cloud providers and open source communities. The most well-known offerings include Databricks Delta Lake, Google Big Lake, Azure Synapse Analytics, Apache Iceberg, and Apache Hudi. Delta Lake, Apache Iceberg, and Apache Hudi are open source solutions among these options.

## Notable features of Databricks Delta Lake

As Databricks has been a pioneer of the Lakehouse architecture, let's examine more closely the most notable features of Delta Lake, the main components of the Databricks Lakehouse 

Delta Lake is an open source storage layer that brings reliability to data lakes. The data lake table format is the most important component of a lakehouse architecture. There must be some way to organize and manage all the raw data files in the data lake storage. Table formats help abstract the physical data structure’s complexity and allow different engines to work simultaneously on the same data. The table format in a lakehouse architecture facilitates the ability to do data warehouse-level transactions (DML) along with ACID guarantees. This is a big deal because traditional data lake doesn’t support update and delete on files. Moreover, our delta lake follows a medallion architecture where raw data is stored in the bronze layer, staging data is stored in silver layer, and aggregated data is in the gold layer. This approach provides a clean and reliable data management on the lake. Some of the other critical features of a table format are schema evolution, expressive SQL, time travel, and data compaction (i.e. Delta Lake). SparkSQL API can be used as the query engine.



