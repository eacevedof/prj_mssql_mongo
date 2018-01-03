const oMongoose = require("mongoose")//.set("debug",true)
const oConfig = require("../config/conf_mongoose")

const sName = "structures"
const oSchema = {
    _id: oMongoose.Schema.Types.ObjectId,
    secuence: String,
    code_table: String,
    orden: String,
    code1: String,
    code2: String,
    code3: String,
    code4: String,
    code5: String,
    code6: String,
    code7: String,
    code8: String,
    code_type: String,
    special: String,
    type_price: String,
    on_base: String,
    exclusive: String 
}//oSchema

const oConn = oMongoose.createConnection(oConfig.url)
const Model = oConn.model(sName,oSchema)

const oExport = {

     get_documents : function(fnCallback) {  
        oConn.once('open', () => {
            console.log(sName," opened!")
            //oConn.db.listCollections({name:sName}).next(function(err, collinfo) {console.log(collinfo)});
            Model.find({},null,{sort:{secuence:1,code_table:1,orden:1}}
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