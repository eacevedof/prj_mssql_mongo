const oConfig = require("../config/conf_mongoose")
const oMongoose = require("mongoose")//.set("debug",true)

const sName = "priorities"
const oSchema = {
    secuence : "string",
    code_type : "string",
    orden : "string",
    priority : "string",
    agrupation : "string",
    type_based : String   
}//oSchema

const oConn = oMongoose.createConnection(oConfig.url,{useMongoClient: true});
oConn.on("error",(e)=>{console.log("conn.error",e)})

const Model = oConn.model(sName,oSchema);

const oExport = {

     get_documents : function(fnCallback) {  
        oConn.once('open', () => {
            console.log(sName," opened!")
            Model.find({},null,{sort:{priority:1,orden:1}}
                ,(oError, arRows) => {
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
