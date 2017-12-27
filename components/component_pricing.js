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
                        
            return (arR.length===1?arR[0]:arR)
        },//get_vars
    }//product

}//Pricing

module.exports = Pricing