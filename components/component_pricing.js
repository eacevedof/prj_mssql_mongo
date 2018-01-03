const Pricing = {
    account : {
        get_unique:(arAccProd)=>{
 
            let arAccounts = arAccProd
                            .map(o =>o.toObject().code_account)
            /* 
            esto no se pq no va :S
            const a = arAccounts.filter((iItem,iPos)=>{
                console.log(iItem,"<-item, pos->",iPos)
                return arAccounts.indexOf(iItem)==iPos
            }) */
            let arR = [... new Set(arAccounts)]
            return arR
        },//get_unique

        get_minified : (arAccounts,arCodes)=>{
            let arR = arAccounts.filter(o =>{ return (arCodes.indexOf(o.toObject().code)!==-1) })
            return arR.map(o => o.toObject())
        },//get_minified

        get_vars : (arAccounts,codAccount,codSalesOrg)=>{
            let arR = arAccounts.filter(o => o.code===codAccount)
                        .filter(o => o.code_sales_org===codSalesOrg)
                        
            return (arR.length===1?arR[0]:arR)
        },//get_vars
    },//account

    product:{
        get_unique:(arAccProd)=>{
 
            let arProducts = arAccProd
                            .map(o =>o.toObject().code_product)
            let arR = [... new Set(arProducts)]
            return arR
        },//get_unique

        get_minified : (arProducts,arCodes)=>{
            let arR = arProducts.filter(o =>{ return (arCodes.indexOf(o.toObject().code)!==-1) })
            return arR.map(o => o.toObject())
        },//get_minified

        get_vars : (arProducts,codProduct,codSalesOrg)=>{
            let arR = arProducts.filter(o => o.code===codProduct)
                        .filter(o => o.code_sales_org===codSalesOrg)
                        
            return (arR.length>0?arR[0]:arR)
        },//get_vars
    },//product

    struct:{
        get_token : (oStruct,oAccount,oProduct) => {
            //console.log("\noStruct.code1:",oStruct.code1,"\noAccount:",oAccount,"\noProduct:",oProduct)
            let sToken = ""

            //CODE1 solo controla esos valores
            if(oStruct.code1==="01") sToken = sToken.concat(oAccount.code_sales_org)
            if(oStruct.code1==="02") sToken = sToken.concat(oAccount.code_country)
            if(oStruct.code1==="16") sToken = sToken.concat(oProduct.code_ofclient)
            if(oStruct.code1==="17") sToken = sToken.concat(oProduct.code_hierarchy1)
            //console.log("sToken1",sToken)
            //CODE2
            if(oStruct.code2==="14") sToken = sToken.concat(oAccount.code_ofclient)
            if(oStruct.code2==="16") sToken = sToken.concat(oProduct.code_ofclient)
            if(oStruct.code2==="17") sToken = sToken.concat(oProduct.code_hierarchy1)
            if(oStruct.code2==="18") sToken = sToken.concat(oProduct.code_hierarchy2) 
            if(oStruct.code2==="27") sToken = sToken.concat(oAccount.tax) 
            if(oStruct.code2==="41") sToken = sToken.concat(oAccount.code_ofclient_h1)
            if(oStruct.code2==="42") sToken = sToken.concat(oAccount.code_ofclient_h2)
            if(oStruct.code2==="43") sToken = sToken.concat(oAccount.code_ofclient_h3)
            if(oStruct.code2==="44") sToken = sToken.concat(oAccount.rec) 
            if(oStruct.code2==="46") sToken = sToken.concat(oProduct.can)          
            ///console.log("sToken2",sToken)

            //CODE3
            if(oStruct.code3==="16") sToken = sToken.concat(oProduct.code_ofclient)
            if(oStruct.code3==="17") sToken = sToken.concat(oProduct.code_hierarchy1)
            if(oStruct.code3==="18") sToken = sToken.concat(oAccount.code_hierarchy2) 
            if(oStruct.code3==="28") sToken = sToken.concat(oProduct.tax) 
            if(oStruct.code3==="45") sToken = sToken.concat(oProduct.rec) 
            //console.log("sToken3",sToken)

            //CODE4
            if(oStruct.code4==="18") sToken = sToken.concat(oProduct.code_hierarchy2) 
            //console.log("sToken4",sToken)

            //process.exit()
            return sToken
        },//get_token
    },

}//Pricing

module.exports = Pricing

/*
const oAccount = {
    code : "string",
    code_ofclient: "string",
    code_country: "string",
    code_ofclient_h1: "string",
    code_ofclient_h2: "string",
    code_ofclient_h3: "string",
    code_sales_org: "string",
    tax: "string",
    rec: "string"
}//oAccount

const oProduct = {
    code : "string",
    code_ofclient: "string",
    code_hierarchy1: "string",
    code_hierarchy2: "string",
    code_sales_org: "string",
    code_country_tax: "string",
    tax: "string",
    rec: "string",
    code_country_ec : "String",
    code_country_can : "String",
    can: "String"
}//oProduct

+-------------+------+------+-----------------------------+---------------------+---------------+------------------+------------+----------------------------------------+
|     SAP     | Code | Type |         Description         |    Table_Select     |  Code_Select  | Code_Description | Type_Array |                                        |
+-------------+------+------+-----------------------------+---------------------+---------------+------------------+------------+----------------------------------------+
| VKORG+VTWEG |   01 | B    | Sales Org                   | sales_organization  | Code          | Description      | NULL       | accounts_organization.Code_Sales_Org   |
|             |   02 | B    | Countries                   | countries           | Code          | Description      | NULL       | accounts.Code_Country                  |
| KUNNR       |   14 | B    | Customer                    | accounts            | Code_ofClient | Name1            | NULL       | accounts.Code_ofClient                 |
| MATNR       |   16 | O    | Item                        | products            | Code_ofClient | Description      | NULL       | products.Code_ofClient                 |
| JMARCA      |   17 | O    | Hierarchy 1                 | products_hierarchy1 | Code          | Description      | NULL       | products.Code_h1                       |
| JGRUPO      |   18 | O    | Hierarchy 2                 | products_hierarchy2 | Code          | Description      | NULL       | products.Code_h2                       |
|             |   27 | O    | Customer Tax Classification |                     |               |                  | NULL       | prj_accounts_tax.TaxClassification     |
|             |   28 | O    | Item Tax Classification     |                     |               |                  | NULL       | prj_products_tax.TaxClassification     |
| VTWEG       |   29 | O    | Channel (value Z1)          | accounts_array      | Code          | Description      | 600        | prj_accounts_organization.Code_Channel |
| HIENR       |   41 | B    | Customer H1                 | accounts            | Code_ofClient | Code_ofClient_H1 | NULL       | prj_accounts.Code_ofClient_H1          |
| HIENR       |   42 | B    | Customer H2                 | accounts            | Code_ofClient | Code_ofClient_H2 | NULL       | prj_accounts.Code_ofClient_H2          |
| HIENR       |   43 | B    | Customer H3                 | accounts            | Code_ofClient | Code_ofClient_H3 | NULL       | prj_accounts.Code_ofClient_H3          |
|             |   44 | O    | Customer Recargo            |                     |               |                  | NULL       | prj_accounts_tax.TaxClassification     |
|             |   45 | O    | Products Recargo            |                     |               |                  | NULL       | prj_products_tax.TaxClassification     |
|             |   46 | O    | Products Canon              |                     |               |                  | NULL       | prj_products_tax.TaxClassification     |
+-------------+------+------+-----------------------------+---------------------+---------------+------------------+------------+----------------------------------------+
*/