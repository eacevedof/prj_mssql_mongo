const oConfig = require("../config/conf_mongoose")
const oMongoose = require("mongoose")

const sName = "conditions"
const oSchema = {
    code : "string",
    code_ofclient: "string",
    code_country: "string",
    code_ofclient_h1: "string",
    code_ofclient_h2: "string",
    code_ofclient_h3: "string",
    code_sales_org: "string",
    tax: "string",
    rec: "string"
}//oSchema

const oDb = oMongoose.createConnection(oConfig.url);
const Model = oDb.model(sName,oSchema);

const oExport = {

     get_documents : function(fnCallback) {  
        oDb.once('open', () => {
            Model.find((oError, arRows) => {
                if (oError) {
                    on_error(oError,fnCallback)
                } else {
                    oMongoose.connection.close();
                    fnCallback("",arRows)
                }
            }) // end Model.find 
        }) // end db.once open 
    },//get_loops

    insert : (oData)=>{
        const oModelInst = new Model(oData)
        oModelInst.save((oError)=>{
            if(oError)
                return handleError(oError)
        })//save
    },//insert

    update : (oData)=>{
        const oModelInst = new Model(oData)
        oModelInst.save((oError)=>{
            if(oError)
                return handleError(oError)
        })//save
    },//update    

    delete : (oData)=>{
        const oModelInst = new Model(oData)
        oModelInst.save((oError)=>{
            if(oError)
                return handleError(oError)
        })//save
    },//delete  

    truncate : (oData)=>{
        const oModelInst = new Model(oData)
        oModelInst.save((oError)=>{
            if(oError)
                return handleError(oError)
        })//save
    },//truncate

}//oExport

const on_error = function(oError) {  
    oModelInst.connection.close();
    console.error(oError)
}

module.exports = oExport


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