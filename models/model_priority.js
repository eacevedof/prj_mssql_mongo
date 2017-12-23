/*
SELECT Secuence,Code_Type,Orden,Priority,Agrupation,Type_Based
FROM prj_pricing_priority
WHERE 1=1
AND Code_Trademark = 'FBRA01GNR'
ORDER BY Priority,Agrupation,Orden

SELECT '{secuence: "'+Secuence+'",'
+' code_type: "'+Code_Type+'",'
+' orden: "'+CONVERT(VARCHAR(10),Orden)+'",'
+' priority: "'+CONVERT(VARCHAR(10),Priority)+'",'
+' agrupation: "'+CONVERT(VARCHAR(10),Agrupation)+'",'
+' type_based: "'+CONVERT(VARCHAR(10),Type_Based)+'"}'
FROM prj_pricing_priority
WHERE 1=1
AND Code_Trademark = 'FBRA01GNR'
ORDER BY Priority,Agrupation,Orden
*/
