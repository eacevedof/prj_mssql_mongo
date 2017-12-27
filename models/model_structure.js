const oMongoose = require("mongoose")
const oConfig = require("../config/conf_mongoose")

const sName = "structure"
const oSchema = {
    secuence: "string",
    code_table: "string",
    orden: "string",
    code1: "string",
    code2: "string",
    code3: "string",
    code4: "string",
    code5: "string",
    code6: "string",
    code7: "string",
    code8: "string",
    code_type: "string",
    special: "string",
    type_price: "string",
    on_base: "string",
    exclusive: "string" 
}//oSchema

const oDb = oMongoose.createConnection(oConfig.url);
const Model = oDb.model(sName,oSchema);

const oExport = {

     get_documents : function(fnCallback) {  
        oDb.once('open', () => {
            console.log(sName," opened!")
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