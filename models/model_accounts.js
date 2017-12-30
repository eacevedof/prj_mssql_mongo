const oConfig = require("../config/conf_mongoose")
const oMongoose = require("mongoose")

const sName = "accounts"
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

const oConn = oMongoose.createConnection(oConfig.url);
oConn.on("error",(e)=>{console.log("conn.error",e)})

const ModelAccounts = oConn.model(sName,oSchema);

const oExport = {

     get_documents : function(codSO,fnCallback) {  
        oConn.once('open', () => {
            console.log(sName," opened!")
            ModelAccounts.find({ code_sales_org:codSO }, (oError, arRows) => {
                if (oError) {
                    on_error(oError,fnCallback)
                    return []
                } else {
                    oMongoose.connection.close();
                    //console.log(arRows);
                    fnCallback("",arRows)
                }
            }) // end oModel.find 
        }) // end db.once open 
    },//get_loops

    insert : (oData)=>{
        const oModAccounts = new ModelAccounts(oData)
        oModAccounts.save((oError)=>{
            if(oError)
                return handleError(oError)
        })//save
    },//insert

    update : (oData)=>{
        const oModAccounts = new ModelAccounts(oData)
        oModAccounts.save((oError)=>{
            if(oError)
                return handleError(oError)
        })//save
    },//update    

    delete : (oData)=>{
        const oModAccounts = new ModelAccounts(oData)
        oModAccounts.save((oError)=>{
            if(oError)
                return handleError(oError)
        })//save
    },//delete  

    truncate : (oData)=>{
        const oModAccounts = new ModelAccounts(oData)
        oModAccounts.save((oError)=>{
            if(oError)
                return handleError(oError)
        })//save
    },//truncate

}//oExport

const on_error = function(oError) {  
    oModAccounts.connection.close();
    console.error(oError)
}

module.exports = oExport
/*-- accounts.json
SELECT DISTINCT '{ code : "'+CONVERT(VARCHAR(10),a.Code)+'",'
,'code_ofclient: "'+a.Code_ofClient+'",'
,'code_country: "'+ISNULL(a.Code_Country,'')+'",'
,'code_ofclient_h1: "'+ISNULL(pja.Code_ofClient_H1,'')+'",'
,'code_ofclient_h2: "'+ISNULL(pja.Code_ofClient_H2,'')+'",'
,'code_ofclient_h3: "'+ISNULL(pja.Code_ofClient_H3,'')+'",'
-- ,ao.Code_Unit_Org
,'code_sales_org: "'+ao.Code_Sales_Org+'",'
,'tax: "'+ISNULL(atx.TaxClassification,'')+'",' AS Tax
,'rec: "'+ISNULL(arec.TaxClassification,'')+'" }' AS Rec
FROM accounts AS a
INNER JOIN prj_accounts AS pja
ON a.Code = pja.Code
INNER JOIN accounts_organization AS ao
ON a.Code = ao.Code_Account
LEFT JOIN prj_accounts_tax AS atx
ON a.Code = atx.Code_Account
AND a.Code_Country = atx.Code_Country
AND atx.Type = 'MWST'
LEFT JOIN prj_accounts_tax AS arec
ON a.Code = arec.Code_Account
AND a.Code_Country = arec.Code_Country
AND arec.Type = 'ZREC'
WHERE 1=1

SELECT DISTINCT a.Code
,a.Code_ofClient
,a.Code_Country
,pja.Code_ofClient_H1
,pja.Code_ofClient_H2
,pja.Code_ofClient_H3
,ao.Code_Sales_Org
,atx.TaxClassification AS Tax
,arec.TaxClassification AS Rec
FROM accounts AS a
INNER JOIN prj_accounts AS pja
ON a.Code = pja.Code
INNER JOIN accounts_organization AS ao
ON a.Code = ao.Code_Account
LEFT JOIN prj_accounts_tax AS atx
ON a.Code = atx.Code_Account
AND a.Code_Country = atx.Code_Country
AND atx.Type = 'MWST'
LEFT JOIN prj_accounts_tax AS arec
ON a.Code = arec.Code_Account
AND a.Code_Country = arec.Code_Country
AND arec.Type = 'ZREC'
WHERE 1=1
*/