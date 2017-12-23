/*
SELECT Secuence
,Code_Table,Valuekey
,Code1,Code2,Code3,Code4,Code5,Code6,Code7,Code8
,Value,Base,Code_Currency,Unit_Measure
,Date_Ini,Date_Fin,Price_Min,Price_Max
,Id_Erp
FROM prj_pricing_tables

SELECT '{'+
+' id: "'+CONVERT(VARCHAR(10),id)+'", '
+' secuence: "'+Secuence+'", '
+' code_table: "'+CONVERT(VARCHAR(10),Code_Table)+'",'
+' valuekey: "'+Valuekey+'", '
+' code1: "'+ISNULL(Code1,'')+'",'+
+' code2: "'+ISNULL(Code2,'')+'",'+
+' code3: "'+ISNULL(Code3,'')+'",'+
+' code4: "'+ISNULL(Code4,'')+'",'+
+' code5: "'+ISNULL(Code5,'')+'",'+
+' code6: "'+ISNULL(Code6,'')+'",'+
+' code7: "'+ISNULL(Code7,'')+'",'+
+' code8: "'+ISNULL(Code8,'')+'",'+
+' value: "'+ISNULL(CONVERT(VARCHAR(10),Value),'')+'",'+
+' base: "'+ISNULL(CONVERT(VARCHAR(10),Base),'')+'",'+
+' code_currency: "'+ISNULL(Code_Currency,'')+'",'+
+' unit_measure: "'+ISNULL(Unit_Measure,'')+'",'+
+' date_ini: "'+ISNULL(Date_Ini,'')+'",'+
+' date_fin: "'+ISNULL(Date_Fin,'')+'",'+
+' price_min: "'+ISNULL(CONVERT(VARCHAR(10),Price_Min),'')+'",'+
+' price_max: "'+ISNULL(CONVERT(VARCHAR(10),Price_Max),'')+'",'+
+' id_erp: "'+ISNULL(Id_Erp,'')+'"}'
FROM prj_pricing_tables

*/