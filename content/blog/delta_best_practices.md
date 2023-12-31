---
title: "Delta Lake Best Practices"
date: 2023-12-30 16:02:25
featureImage: images/single-blog/delta-best-practices/0.jpg
postImage: images/single-blog/delta-best-practices/0.jpg
categories: data-lakehouse
tags: [spark delta-lake]
author: Anh Chu
toc: Table of Contents
draft: True
---

## Optimize Delta Tables

In Delta Lake, it’s easy to run into small files issues. In most cases, we performed a number of operations where only one or several records were inserted.

Files will be combined toward an optimal size (scaled based on the size of the table) by using the OPTIMIZE command. OPTIMIZE will replace existing data files by combining records and rewriting the results. OPTIMIZE created another version of our table

When executing OPTIMIZE, users can optionally specify one or several fields for ZORDER indexing.  Z-Order speeds up data retrieval when filtering on provided fields by colocating data with similar values within data files.

```sql
OPTIMIZE students ZORDER BY id
```

To modify metadata on the Delta table

```sql
ALTER TABLE table_name SET TBLPROPERTIES (
   'delta.columnMapping.mode' = 'name',
   'delta.minReaderVersion' = '2',
   'delta.minWriterVersion' = '5')

ALTER TABLE table_name SET TBLPROPERTIES ('delta.columnMapping.mode' = 'name')

alter table table_name drop column column

alter table table_name drop columns (column1, column2)
```

## Schema enforcement & evolution

Delta enforces your schema by default, require explicit config option to evolve it

1. occurs on write, cancel the tranx if schema doesn’t match, raise exception
2. write data cannot have addition columns, but can have less column, cannot have diff data types
3. tables cannot have columns same name with different case

With Schema evolution:

1. schema enforcement will no longer alert
2. .option(”mergeSchema”, “true”) → use with append or overwrite the table, read-compatible schema changes: existing data can still be read. We can add new column, change data types (non-nullable to nullable), upcasts from byte to integer (not to long type). You cannot drop column, or rename column
3. .option(”overwriteSchema”, “true”) → use with overwrite the table, non-read compatible schema change. We can drop a column, change column data type in place, rename column name that differ by case

## Delta table best practices

### Extract Table Metadata

```python
def parse_table_keys(database, table=None):
    table_keys = {}
    if table:
        query = f"SHOW TABLES IN db_name LIKE '{table}'"
    else:
        query = f"SHOW TABLES IN db_name"
    for table_item in spark.sql(query).collect():
        table_name = table_item[1]
        key_values = spark.sql(f"DESCRIBE EXTENDED db_name.{table_name}").filter("col_name = 'Table Properties'").collect()[0][1][1:-1].split(",")
        table_keys[table_name] = [kv for kv in key_values if not kv.startswith("delta.")]
    return table_keys

parse_table_keys(db_name)
```

### Design table schema

When configuring tables in Delta Lake, make sure you consider the following.

1. **Precision**

Both numeric and datetime types should be stored with the correct precision specified to:
  *  Ensure integrity with source systems
  *  Maintain precision and avoid rounding errors for downstream queries
  *  Avoid unnecessary storage costs (note the significant differences in bytes for [numeric types](https://spark.apache.org/docs/latest/sql-ref-datatypes.html))

2. **Datetime Filtering**

If data will be frequently filtered by year, year & month, day of week, date, or another datetime value, consider calculating these values at write time if not present in original data. (Pushdown filters work best on fields present in a table).

3. **Case Sensitivity**: Spark does not differentiate case by default.

4. **Un-Nest Important Fields for Filtering**

Extract fields that might be useful for indexing or filtering to increase performance.

5. **Place Important Fields Early in the Schema**

Fields that will be used for filtering and optimizations should appear at the beginning of the schema declaration.

### File Statistics

By default, Delta Lake will capture statistics on the first 32 columns that appear in a table to allow for efficient file skipping. These statistics indicate:

- the total number of records per file
- minimum value in each column
- maximum value in each column
- null value counts for each of the columns

**NOTE**: These statistics are generally uninformative for string fields with very high cardinality (such as free text fields). You can omit these fields from statistic collection by [moving them outside the first 32 columns or changing the number of columns on which statistics are collected](https://docs.databricks.com/delta/optimizations/file-mgmt.html#data-skipping). Nested fields count when determining the first 32 columns, for example 4 struct fields with 8 nested fields will total to the 32 columns.

### Config Stats on table

```python
files = dbutils.fs.ls(f"{DA.paths.working_dir}/no_part_table/_delta_log")
display(files)
display(spark.read.json(f"{DA.paths.working_dir}/no_part_table/_delta_log/00000000000000000000.json"))
```

Note that columns used for Z-ordering need to have statistics collected. Even without additional optimization metrics, statistics will always be leveraged for file skipping.

**NOTE**: Calculating statistics on free-form text fields (product reviews, user messages, etc.) can be time consuming. For best performance, set these fields later in the schema and [change the number of columns that statistics are collected on](https://docs.databricks.com/delta/optimizations/file-mgmt.html#data-skipping).

```python
%sql
ANALYZE TABLE no_part_table 
COMPUTE STATISTICS FOR COLUMNS timestamp
```