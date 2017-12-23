/*
SELECT Secuence,Code_Table,Orden
,Code1,Code2,Code3,Code4,Code5,Code6,Code7,Code8
,Code_Type,Special,Type_Price,On_Base,Exclusive
FROM prj_pricing_structure
ORDER BY Orden

SELECT '{secuence: "'+Secuence+'", '
+' code_table: "'+CONVERT(VARCHAR(10),Code_Table)+'",'+
+' orden: "'+CONVERT(VARCHAR(10),Orden)+'",'+
+' code1: "'+Code1+'",'+
+' code2: "'+ISNULL(Code2,'')+'",'+
+' code3: "'+ISNULL(Code3,'')+'",'+
+' code4: "'+ISNULL(Code4,'')+'",'+
+' code5: "'+ISNULL(Code5,'')+'",'+
+' code6: "'+ISNULL(Code6,'')+'",'+
+' code7: "'+ISNULL(Code7,'')+'",'+
+' code8: "'+ISNULL(Code8,'')+'",'+
+' code_type: "'+ISNULL(Code_Type,'')+'",'+
+' special: "'+ISNULL(Special,'')+'",'+
+' type_price: "'+ISNULL(Type_Price,'')+'",'+
+' on_base: "'+CONVERT(VARCHAR(10),ISNULL(On_Base,''))+'",'+
+' exclusive: "'+CONVERT(VARCHAR(10),ISNULL(Exclusive,''))+'"}'
FROM prj_pricing_structure
ORDER BY Orden

*/