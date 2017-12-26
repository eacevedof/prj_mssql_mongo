const oConfig = require("../config/conf_mongoose")
const oMongoose = require("mongoose")

const sName = "accounts"
const oSchema = {
    code : "string",
    code_ofclient: "string",
    code_hierarchy1: "string",
    code_hierarchy2: "string",
    code_sales_org: "string",
    code_country_tax: "string",
    code_sales_org: "string",
    tax: "string",
    rec: "string",
    code_country_ec : "String",
    code_country_can : "String",
    can: "String"
}//oSchema

const oDb = oMongoose.createConnection(oConfig.url);
const ModelProducts = oDb.model(sName,oSchema);

const oExport = {

     get_documents : function(codSO, fnOnFinish) {  
        oDb.once('open', () => {
            console.log("opened!!")
            ModelProducts.find({ code_sales_org:codSO }, (oError, arRows) => {
                if (oError) {
                    on_error(oError,fnOnFinish);
                } else {
                    oMongoose.connection.close();
                    //console.log(arRows);
                    fnOnFinish("", arRows);
                }
            }) // end oModel.find 
        }) // end db.once open 
    },//get_loops

    insert : (oData)=>{
        const oModProducts = new ModelProducts(oData)
        oModProducts.save((oError)=>{
            if(oError)
                return handleError(oError)
        })//save
    },//insert

    update : (oData)=>{
        const oModProducts = new ModelProducts(oData)
        oModProducts.save((oError)=>{
            if(oError)
                return handleError(oError)
        })//save
    },//update    

    delete : (oData)=>{
        const oModProducts = new ModelProducts(oData)
        oModProducts.save((oError)=>{
            if(oError)
                return handleError(oError)
        })//save
    },//delete  

    truncate : (oData)=>{
        const oModProducts = new ModelProducts(oData)
        oModProducts.save((oError)=>{
            if(oError)
                return handleError(oError)
        })//save
    },//truncate

}//oExport

const on_error = function(oError,fnCallback) {  
    oModProducts.connection.close();
    fnCallback(oError);
}

module.exports = oExport

/*
SELECT DISTINCT '{code: "'+CONVERT(VARCHAR(10),p.Code)+'",'
,'code_ofclient: "'+ISNULL(p.Code_ofClient,'')+'",'
,'code_hierarchy1: "'+ISNULL(p.Code_Hierarchy1,'')+'",'
,'code_hierarchy2: "'+ISNULL(p.Code_Hierarchy2,'')+'",'
,'code_sales_org: "'+ISNULL(po.Code_Sales_org,'')+'",'
,'code_country_tax: "'+ISNULL(ptx.Code_Country,'')+'",'
,'tax: "'+ISNULL(ptx.TaxClassification,'')+'",'
,'code_country_ec: "'+ISNULL(prec.Code_Country,'')+'",'
,'rec: "'+ISNULL(prec.TaxClassification,'')+'",'
,'code_country_can: "'+ISNULL(pcan.Code_Country,'')+'",'
,'can: "'+ISNULL(pcan.TaxClassification,'')+'"}'
FROM products AS p
INNER JOIN products_organization AS po
ON p.Code = po.Code_Product
LEFT JOIN prj_products_tax AS ptx
ON p.Code = ptx.Code_Product
AND ptx.Type = 'MWST'
LEFT JOIN prj_products_tax AS prec
ON p.Code = prec.Code_Product
AND prec.Type = 'ZREC'
LEFT JOIN prj_products_tax AS pcan
ON p.Code = pcan.Code_Product
AND pcan.Type = 'ZZCANON'
WHERE 1=1


SELECT DISTINCT p.Code
,p.Code_ofClient
,p.Code_Hierarchy1
,p.Code_Hierarchy2
,po.Code_Sales_org
,ptx.Code_Country AS Code_Country_Tax
,ptx.TaxClassification Tax
,prec.Code_Country AS Code_Country_Rec
,prec.TaxClassification Rec
,pcan.Code_Country AS Code_Country_Can
,pcan.TaxClassification Can
FROM products AS p
INNER JOIN products_organization AS po
ON p.Code = po.Code_Product
LEFT JOIN prj_products_tax AS ptx
ON p.Code = ptx.Code_Product
AND ptx.Type = 'MWST'
LEFT JOIN prj_products_tax AS prec
ON p.Code = prec.Code_Product
AND prec.Type = 'ZREC'
LEFT JOIN prj_products_tax AS pcan
ON p.Code = pcan.Code_Product
AND pcan.Type = 'ZZCANON'
WHERE 1=1
--AND pcan.TaxClassification IS NOT NULL
*/