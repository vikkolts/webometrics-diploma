const express = require('express'),
  app = express(),
  port = process.env.PORT || 3333;

const sql = require('mssql');
require("msnodesqlv8");
const cors = require('cors');
app.use(cors());
app.options('*', cors());

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

let avgApplicationsNumber = 350;

const generalCorrelationQuery = (number) =>  `WITH DataAvgStd
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
SELECT DISTINCT TOP 100 ЗВО,
    "Сер. всього заяв",
    "Сер. метрика",
      SUM(ExpectedValue) over(partition by ЗВО) / (SampleSize - 1 ) / ( XStdev * YSTDev ) AS "Кореляція"
FROM DataAvgStd
WHERE "Сер. всього заяв" > ${number}
ORDER BY "Сер. всього заяв" desc
)b`;

const univByYears = (number) =>  `WITH IntermediateResults AS (
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
      ,AVG(All_Applications_Entrants) OVER(PARTITION BY UniversityDim.Name) AS "AVG_ent"
  FROM UniversityFact
  JOIN DateDim ON DateDim.ID_Date = UniversityFact.ID_Date
  JOIN UniversityDim ON UniversityFact.ID_University = UniversityDim.ID_University
  WHERE ID_Metric=0)
  SELECT * FROM IntermediateResults AS n WHERE n."AVG_ent" > ${number}
  ORDER BY n."AVG_ent" DESC, n."Рік" ASC`;

const correlationZVOs = (number) =>  `WITH DataAvgStd
AS (SELECT ЗВО,
           STDEV([Всього заяв]) over(partition by ЗВО) AS XStdev,
           STDEV(Метрика) over(partition by ЗВО) AS YSTDev,
           COUNT(*) over(partition by ЗВО) AS SampleSize,
   AVG([Всього заяв]) OVER(PARTITION BY "ЗВО") AS "Сер. всього заяв",
   AVG("Метрика") OVER(PARTITION BY "ЗВО") AS "Сер. метрика",
           ( [Всього заяв] - AVG([Всього заяв]) over(partition by ЗВО)) * ( Метрика - AVG(Метрика) over(partition by ЗВО)) AS ExpectedValue,
   "Всього заяв",
   "Метрика",
   "Рік"
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
SELECT ЗВО,
"Всього заяв",
"Метрика",
"Рік",
  SUM(ExpectedValue) over(partition by ЗВО) / (SampleSize - 1 ) / ( XStdev * YSTDev ) AS "Кореляція"
FROM DataAvgStd
WHERE "Сер. всього заяв" > ${number}
ORDER BY "Сер. всього заяв" desc`;

const mainAPIpage = `<!DOCTYPE html>
<html>
<head>
    <title>Документація API</title>
    <meta charset="utf-8" />
</head>
<body>
    <h1>Документація API: </h1>
    <p>
      <b>[GET]</b> <a href="/univ-correlations">/univ-correlations</a>: отримати кореляцію по ЗВО. <br/> 
      <b>[GET]</b> <a href="/avg-correlation">/avg-correlation</a>: отримати загальне число кореляції. <br/>
      <b>[GET]</b> <a href="/univ-stats">/univ-stats</a>: отримати статистику по ЗВО. <br/>
      <b>[GET]</b> <a href="/avg-application-number">/avg-application-number</a>: отримати середнє число заяв абітурієнтів. <br/>
    </p>
    <b>[POST]</b> <a href="/set-avg-applications">/set-avg-applications</a>: встановити середнє число заяв абітурієнтів.
</body>
<html>`;

app.get('/avg-correlation', (req, res) => {  
  sql.connect(conn, function (err) {
    if (err) console.log(err);
    // create Request object
    var request = new sql.Request();
    // query to the database and get the records
    request.query(generalCorrelationQuery(avgApplicationsNumber), function (err, recordset) {
        if (err) console.log(err)
        // send records as a response
        let temp = recordset.recordset[0]["Загальна кореляція"];
        res.send([temp]);
    });
  });
});

app.get('/univ-correlations', (req, res) => {  
  sql.connect(conn, function (err) {
    if (err) console.log(err);
    var request = new sql.Request();
    request.query(correlationZVOs(avgApplicationsNumber), function (err, recordset) {
        if (err) console.log(err)
        res.send(recordset.recordset);
    });
  });
});

app.get('/univ-stats', (req, res) => {  
  sql.connect(conn, function (err) {
    if (err) console.log(err);
    var request = new sql.Request();
    request.query(univByYears(avgApplicationsNumber), function (err, recordset) {
        if (err) console.log(err)
        res.send(recordset.recordset);
    });
  });
});

app.use(express.json());
app.post('/set-avg-applications', function (request, response) {
  if(!request.body) return response.sendStatus(400);
  if(request.body?.number && /^\d+$/.test(request.body.number)) {
    avgApplicationsNumber = parseInt(request.body.number);
    console.log(`New avg number ${avgApplicationsNumber}`);
    return response.json({number: avgApplicationsNumber});
  }else{
    return response.sendStatus(422);
  }
});

app.get('/avg-application-number', (req, res) => {
  res.json({number: avgApplicationsNumber});
})

app.get('/', (req, res) => {
  res.send(mainAPIpage)
})

app.listen(port, () => {
  console.log(`Univ server listening at http://localhost:${port}`)
})


