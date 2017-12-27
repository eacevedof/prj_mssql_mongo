//console.log("process time:",process.uptime())
console.log("https://stackoverflow.com/questions/38453801/best-way-to-process-results-of-multiple-sequential-dependent-mongo-queries-in")
console.log("\n")
const oAsync = require("async")

const oAcc = require("../models/model_accounts")
const oProd = require("../models/model_products")
const oAccProd = require("../models/model_accprods")
const oPrior = require("../models/model_priority")
const oStruct = require("../models/model_structure")
const oConds = require("../models/model_conditions")

const oPrice = require("../components/component_pricing")

oAsync.parallel({
        //lanza consultas a mongo en paralelo
        accprod : function(fnCallback){oAccProd.get_documents(fnCallback)},
        acc : function(fnCallback){oAcc.get_documents("OVMN02",fnCallback)},
        prod: function(fnCallback){oProd.get_documents("OVMN02",fnCallback)},

        prior: function(fnCallback){oPrior.get_documents(fnCallback)},        
        struct: function(fnCallback){oStruct.get_documents(fnCallback)},
        conds: function(fnCallback){oConds.get_documents(fnCallback)}
    },function(oError,oR){
        process.uptime()
        console.log("\nresult in parallel")

        let arLoop = oR.accprod.map(o => o.toObject())
        let arAccounts = oPrice.account.get_minified(oR.acc, oPrice.account.get_unique(oR.accprod))
        let arProducts = oPrice.product.get_minified(oR.prod, oPrice.product.get_unique(oR.accprod))
        //console.log("products",arProducts.length,"arProducts -> ",arProducts) 
        //console.log("prod data: ",oPrice.product.get_vars(arProducts,"101801","OVMN02").code)
        //process.exit()

        //pricing
        let arPriority = oR.prior.map(o => o.toObject())
        let arStructure = oR.struct.map(o => o.toObject())
        let arConds = oR.conds.map(o => o.toObject())

        process.uptime()
        console.log("loop.length:",arLoop.length)

        arLoop.forEach(o => {
            console.log("o.code_product:",o.code_product)
            let oAccount = oPrice.account.get_vars(arAccounts,o.code_account,"OVMN02")
            let oProduct = oPrice.product.get_vars(arProducts,o.code_product,"OVMN02")

            arPriority.forEach(oP => {
                console.log(oP.secuence)
            })


            //console.log("acc:",oAccount.code)
            //console.log("prod:",oProduct.code)

        })
        
        //let oAcc = oPrice.account.get_vars(arAccounts,"451","OVMN02")
        //let oProd = oPrice.account.get_vars(arProducts,"451","OVMN02")
        //console.log("accs:",arAccounts.length,",prod:",arProducts.length)
        //console.log("process time:",process.uptime())
        //process.exit()
});
