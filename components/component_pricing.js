const Pricing = {
    account : {
        get_reduced:(arAccounts,codAccount,codSalesOrg)=>{
            return arAccounts.filter(oAcc => oAcc.code === codAccount )
        },

        get_vars : (arAccount,codAccount)=>{
            ;//return arAccount.filter(codAcc => )
        }
    },

    product:{

    }

}

module.exports = Pricing