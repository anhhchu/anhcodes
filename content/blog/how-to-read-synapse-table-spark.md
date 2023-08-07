---
title: "How to read Azure Synapse Tables to Spark Dataframe"
date: 2023-01-02 00:00:59
featureImage: /images/single-blog/synapse/pyspark-synapse.png
postImage: /images/single-blog/synapse/pyspark-synapse.png
categories: data-lakehouse
tags: [azure-synapse-analytics, how-to, pyspark]
draft: true
---

Thanks to [Azure Synapse Dedicated SQL Pool Connector for Apache Spark](https://learn.microsoft.com/en-us/azure/synapse-analytics/spark/synapse-spark-sql-pool-import-export?tabs=scala%2Cscala1%2Cscala2%2Cscala3%2Cscala4%2Cscala5), you can directly read Synapse Dedicated SQL Pool tables into Spark dataframe with Python and Scala using Synapse Spark Pool.  These solutions work when the Spark Pool and the Dedicated SQL Pool are in the same workspaces. 

To create Synapse Spark Pool in Azure Synapse, you can follow this [documentation](https://learn.microsoft.com/en-us/azure/synapse-analytics/quickstart-create-apache-spark-pool-studio). .

#### Option 1: Use Scala

In Synapse Workspace, you can right-click the table in Dedicated SQL Pool database, and pick **Load to Dataframe** 

{{< image image="/images/single-blog/load-to-df.png" width=500 >}}

The notebook will automatically open up with 1 default code:

{{< highlight python "linenos=table,style=witchhazel" >}}
%%spark
val df = spark.read.synapsesql("<sql-pool-database>.<schema_name>.<table_name>")

{{< /highlight >}}


{{< image image="images/single-blog/scala-solution.png"  width="500" >}}

#### Option 2: Use Python

With Python solution, you will need to import an additional package `com.microsoft.spark.sqlanalytics`

{{< highlight python "linenos=table,style=witchhazel" >}}
%%pyspark
import com.microsoft.spark.sqlanalytics
from com.microsoft.spark.sqlanalytics.Constants import Constants

synapse_server = 'anh-test-synapse.sql.azuresynapse.net'
database_name = 'anhtestdedicated'
schema_name = 'dbo'
table_name = 'a_new_table'

df = spark.read.option(Constants.SERVER, synapse_server) \
    .synapsesql(f"{database_name}.{schema_name}.{table_name}")

{{< /highlight >}}

{{< image image="images/single-blog/python.png" width=500 >}}


