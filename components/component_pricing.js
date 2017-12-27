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
            return arR
        },//get_minified

        get_vars : (arAccounts,codAccount,codSalesOrg)=>{
            
        },//get_vars
    },

    product:{

    }

}

module.exports = Pricing