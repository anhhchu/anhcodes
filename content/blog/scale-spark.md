---
title: "How to Scale and Tune Spark Effectively"
date: 2023-04-11 23:20:57
featureImage: images/single-blog/spark.jpeg
postImage: images/single-blog/spark.jpeg
categories: big-data
tags: [spark]
author: Anh Chu
---

If you're working with big data, you've probably heard of Spark. Spark is a distributed big data processing engine that provides in-memory storage for intermediate computations, making it much faster than Hadoop MapReduce. In this post, we'll cover how to scale and tune Spark effectively to make the most of its capabilities.

### What is Spark?

Spark is a distributed big data processing engine that uses the resilient distributed dataset (RDD) data structure with data abstractions such as DataFrames and Datasets. It provides API in different programming languages such as Scala, Python, and Java. One of the key benefits of Spark is that it decouples compute and storage, meaning it can be used to read from different data sources on-prem and in the cloud. Spark has four main APIs: Spark SQL, Spark MLlib, Spark Structured Streaming, and GraphX.

### Tune the Spark Hardware and Configurations

To make the most of Spark's capabilities, it's important to tune the hardware and configurations. Here are some tips:

- Choose the right instance type and cluster config. Bigger clusters aren’t necessarily faster. 32GB - 128GB RAM are best, and use compute optimized instance for ETL.
- Use dynamic resource allocation configuration and set min and max executors.
- Adjust `spark.executor.memory` and set amount of memory available to each executor. Allocate to three types: execution, storage, and reserved memory.

### Minimize data scan with `df.cache` and `df.persist`

Dataframe cache stores as many partitions as memory allows. Cache is another type of persist: `df.cache == df.persist(StorageLevel.MEMORY_AND_DISK)`. This stores partitions in memory and spills excess to disk.

When we wse `dataframe.persist(StorageLevel.LEVEL)`, we can choose different storage levels such as Memory, disk or off-heap to persist data

{{< bootstrap-table "table table-light table-striped table-bordered" >}}
| StorageLevel | Description |
| --- | --- |
| MEMORY_ONLY | Data is stored as objects only in memory. |
| MEMORY_ONLY_SER | Data is serialized as a compact byte array and stored in memory. |
| MEMORY_AND_DISK | Data is stored in memory and excess data is serialized and stored on disk. |
| DISK_ONLY | Data is serialized and stored on disk only. |
| OFF_HEAP | Data is stored off-heap and not replicated. |
| MEMORY_AND_DISK_SER | Data is serialized and stored in memory and disk. |

{{< /bootstrap-table >}}

Each StorageLevel (except OFF_HEAP) has an equivalent LEVEL_NAME_2*,* which means replicate twice on two different Spark executors: MEMORY_ONLY_2, MEMORY_AND_DISK_SER_2, etc. While this option is expensive, it allows data locality in two places, providing fault tolerance and giving Spark the option to schedule a task local to a copy of the data.

To minimize data scan and speed up Spark processing, we should use cache and persist for:

-  DataFrames that need accessed commonly for doing frequent transformations during ETL or building data pipelines
- DataFrames commonly used during iterative machine learning training
- Don’t use when data is too big to fit in memory, or require infrequent transformation

Remember that When you use `cache()` or `persist()`, the DataFrame is not fully cached until you invoke an action that goes through every record (e.g., `count()`). If you use an action like `take(1)`, only one partition will be cached because Catalyst realizes that you do not need to compute all the partitions just to retrieve one record.

### Partitioning Optimization

Partitioning is an important optimization technique in Spark. Here are some tips:

1. Parquet file size: Make sure Parquet files are around 1GiB in size, and the row group size is also large.
2. Number of partition on read: The right number of partitions depends on the task and size of the DataFrame. You want (at least) a few times the number of executors. 100 < num partitions < 10000 → reduce the Partition Bytes on Read to allow data explosion.
3. Shuffle Partition Size: Keep track of input data size per task (shuffle partitions are created during shuffle stage). Optimal shuffle partition size: 100-200 MB (data exchanged across executors).
4. Choose the Correct Partition Column when repartition: The partitioning columns are selected so that rows that must be processed together end up in the same task. When you repartition a dataframe, specify columns if possible.

### Choose the Correct Join

Choosing the correct join is crucial for optimizing performance in Spark. Here are some tips:

- At the cluster level, set these configs:
    - `spark.sql.autoBroadcastJoinThreshold 100*1024*1024`: if table is less than 100MB on disk, just broadcast it.
    - `spark.sql.join.preferSortMergeJoin false`.
- Broadcast Hash Join: This is the most efficient method. The smaller dataset is broadcast by the driver to all executors and join with the larger dataset on the executor. Avoid shuffle and sort of dataset. The driver must have enough memory.
- Shuffle Hash Join: Map two different data frames and shuffle both tables by join key. Create a hash on the join key, data exchanged between executors. In the reduce phase, join two datasets with the same key in the same partition and same executor.
- Shuffle Sort Merge Join: This is the most popular method. All rows with the same key are hashed on the same partition on the same executor. Used with two large datasets, data will be shuffled and exchanged between executors. Use partitioned buckets to eliminate the exchange step.
- Cartesian Join (BroadcastNestedLoopJoin) BNLJ: this is the most expensive and slowest join operation and should be avoided if possible

### Omit Expensive Ops

Avoid expensive operations in Spark to optimize performance. Here are some tips:

- Avoid `withColumn`.
- Avoid `repartition`.
- Avoid `count`.
- Use `approxCountDistinct()` within 5% of error.
- Use `dropDuplicates` before the join, before the groupBy.
- Avoid UDFs. Traditional UDFs cannot use Tungsten and are not vectorized. Use org.apache.spark.sql.functions, PandasUDFs, or SparkR UDFs instead.

By following these tips, hopefully you can scale and tune Spark effectively and make the most of its capabilities for big data processing.