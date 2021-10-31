const express = require('express'),
  app = express(),
  port = process.env.PORT || 3333;

const sql = require('mssql');
require("msnodesqlv8");

const conn = {
  database: "UniversitiesMetricsDWH",
  server: "DESKTOP-9UNMG1N",
  driver: "msnodesqlv8",
  user: "unimetrics",
  password: "password",
  options: {
    trustedConnection: true,
    trustServerCertificate: true
  }
}; 

const generalCorrelationQuery = `WITH DataAvgStd
AS (SELECT ЗВО,
           STDEV([Всього заяв]) over(partition by ЗВО) AS XStdev,
           STDEV(Метрика) over(partition by ЗВО) AS YSTDev,
           COUNT(*) over(partition by ЗВО) AS SampleSize,
   AVG([Всього заяв]) OVER(PARTITION BY "ЗВО") AS "Сер. всього заяв",
   AVG("Метрика") OVER(PARTITION BY "ЗВО") AS "Сер. метрика",
           ( [Всього заяв] - AVG([Всього заяв]) over(partition by ЗВО)) * ( Метрика - AVG(Метрика) over(partition by ЗВО)) AS ExpectedValue
    FROM  (
 SELECT UniversityDim.Name AS "ЗВО"
     ,All_Applications_Entrants AS "Всього заяв"
     ,Admitted_To_Competition AS "Допущено"
     ,Recommended_Entrants AS "Рекомендовано"
     ,Min_Mark AS "Мін. бал"
     ,Avarage_Mark AS "Сер. бал"
     ,Rank_Ukraine AS "Рейтинг Україна"
     ,Rank_World AS "Рейтинг світ"
     ,Metric_Value AS "Метрика"
     ,DateDim.Year AS "Рік"
 FROM UniversityFact
 JOIN DateDim ON DateDim.ID_Date = UniversityFact.ID_Date
 JOIN UniversityDim ON UniversityFact.ID_University = UniversityDim.ID_University
 WHERE ID_Metric=0
)a)
SELECT AVG("Кореляція") AS "Загальна кореляція"
FROM (
SELECT DISTINCT TOP 21 ЗВО,
    "Сер. всього заяв",
    "Сер. метрика",
      SUM(ExpectedValue) over(partition by ЗВО) / (SampleSize - 1 ) / ( XStdev * YSTDev ) AS "Кореляція"
FROM DataAvgStd
ORDER BY "Сер. всього заяв" desc
)b`;

app.get('/test', (req, res) => {  
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');
  //res.setHeader('Content-Type', 'text/plain');
  sql.connect(conn, function (err) {
    if (err) console.log(err);
    // create Request object
    var request = new sql.Request();
    // query to the database and get the records
    request.query(generalCorrelationQuery, function (err, recordset) {
        if (err) console.log(err)
        // send records as a response
        let temp = recordset.recordset[0]["Загальна кореляція"];
        res.send([temp]);
    });
  });
})

app.get('/', (req, res) => {
  res.send('/test to get general correlation')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})


