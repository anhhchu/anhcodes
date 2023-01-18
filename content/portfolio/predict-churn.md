---
title: Predict Churn of Music Hosting Service
# date: 2020-08-12T18:19:35.000|06:00
thumbnail: images/portfolio/predictchurn.jpeg
service: SparkML, Prediction
# client: Clayton Coco
shortDescription: Analyzed customer activities of a music hosting service using Spark Dataframe and Spark SQL on a 247.6 MB dataset running on IBM Watson Studio. Built ML Pipeline with Spark ML to predict churn with 0.74 F1 score and 0.8 accuracy
problemStatement: Number of active users is an essential KPI to any service businesses including music hosting service. Therefore, a critical problem for these companies is predicting whether a users will stop using their service and turn to other competitors. Because losing users mean losing advertising revenue and subscription revenue, which are 2 main streams of revenue for the company. 
solution: This project aims to predict churn of a music hosting service (Sparkify) using a 247.6 MB dataset with Python and Spark. A good model of churn prediction is expected to help the company identify users who are prone to leave, then take some preemptive actions (sending promotions, etc.) to hopefully keep them before it's too late.

---
## 1. Exploratory Data Analysis (EAD)
Due to computational constraint, this project will only use a 247.6 MB dataset of 543705 records and 448 unique users (198 Males, 250 Females). Among that, only 528k records have valid data, the rest 15k records are sessions where some random folks are merely checking out the site without signing in.



```text
Number of records in the dataset: 543705
Number of Records after removing blank userID: 528005
|-------|------------------|
|summary|         sessionId|
|-------|------------------|
|  count|            543705|
|   mean|2040.8143533717732|
| stddev| 1434.338931078271|
|    min|                 1|
|    max|              4808|
|-------|------------------|

Number of Records with blank userID: 15700
Number of Users: 448
|------|-----|
|gender|count|
|------|-----|
|     F|  198|
|     M|  250|
|------|-----|

|--------------------|-----|
|              artist|count|
|--------------------|-----|
|       Kings Of Leon| 3497|
|            Coldplay| 3439|
|Florence | The Ma...| 2314|
|                Muse| 2194|
|       Dwight Yoakam| 2187|
|      The Black Keys| 2160|
|            BjÃÂ¶rk| 2150|
|       Justin Bieber| 2096|
|        Jack Johnson| 2049|
|           Radiohead| 1694|
|--------------------|-----|
```

Each record shows the activity of 1 user at a specific time.

```text
[Row(artist='Martin Orford', auth='Logged In', firstName='Joseph', gender='M', itemInSession=20, lastName='Morales', length=597.55057, level='free', location='Corpus Christi, TX', method='PUT', page='NextSong', registration=1532063507000, sessionId=292, song='Grand Designs', status=200, ts=1538352011000, userAgent='"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/36.0.1985.125 Safari/537.36"', userId='293')]
```