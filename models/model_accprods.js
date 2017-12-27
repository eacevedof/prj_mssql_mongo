const oConfig = require("../config/conf_mongoose")
const oMongoose = require("mongoose")

const sName = "accprods"
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
SELECT '{code_user: "'+Code_User+'", '+
+'code_sales_org: "'+Code_Sales_Org+'", '
+'code_account: "'+CONVERT(VARCHAR(18),Code_Account)+'", '
+'code_product: "'+CONVERT(VARCHAR(18),Code_Product)+'"}'
FROM prj_pricing_prc_loop
*/
