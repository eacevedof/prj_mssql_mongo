const oConfig = require("../config/conf_mongoose")
const oMongoose = require("mongoose").set("debug",true)

const sName = "priority"
const oSchema = {
    secuence : "string",
    code_type : "string",
    orden : "string",
    priority : "string",
    agrupation : "string",
    type_based : "string"    
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
