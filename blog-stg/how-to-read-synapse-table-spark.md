---
title: "How to read Azure Synapse Tables to Spark Dataframe"
date: 2023-01-02 00:00:59
featureImage: images/allpost/pyspark-synapse-vertical.jpg
# postImage: images/single-blog/feature-image.jpg
postImage: /images/single-blog/pyspark-synapse.png
tags: [azure-synapse-analytics, how-to, pyspark]
---

There are 2 options to read a Dedicated SQL Pool table to Spark Dataframe

#### Option 1: Use Synapse Workspace



#### Option 2: Use Synapse Spark Pool 

{{< highlight python "linenos=table,style=witchhazel" >}}
import com.microsoft.spark.sqlanalytics
from com.microsoft.spark.sqlanalytics.Constants import Constants

def load_synapse_data():
    ## Load the entire marketo table to df
    print(f"---Load {schema_name}.{table_name} to df---")
    df = spark.read
        ## If `Constants.SERVER` is not provided, 
        ## the `<database_name>` from the three-part table name argument
        ## to `synapsesql` method is used to infer the Synapse Dedicated SQL End Point.
        .option(Constants.SERVER, synapse_server)
        ## Defaults to storage path defined in the runtime configurations
        .option(Constants.TEMP_FOLDER, f"temp")
        ## Three-part table name from where data will be read.
        .synapsesql(f"{database_name}.{schema_name}.{table_name}")
        ## Column-pruning i.e., query select column values.
        .select("<some_column_1>", "<some_column_5>", "<some_column_n>")
        ## Push-down filter criteria that gets translated to SQL Push-down Predicates.
        .filter(F.col("sync_ready") = 1)
        

synapse_server = "<synapse-workspace-name>.sql.azuresynapse.net"
database_name = "<database>"
schema_name = "marketing"
table_name = "sf_incremental_sync"

{{</highlight>}}