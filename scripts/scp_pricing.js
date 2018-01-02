//console.log("process time:",process.uptime())
console.log("https://stackoverflow.com/questions/38453801/best-way-to-process-results-of-multiple-sequential-dependent-mongo-queries-in")
console.log("\n")
const oAsync = require("async")

const oAcc = require("../models/model_accounts")
const oProd = require("../models/model_products")
const oAccProd = require("../models/model_accprods")
const oPrior = require("../models/model_priorities")
const oStruct = require("../models/model_structures")
const oConds = require("../models/model_conditions")

const oPrice = require("../components/component_pricing")

oAsync.parallel({
        //lanza consultas a mongo en paralelo
        prior: function(fnCallback){oPrior.get_documents(fnCallback)},        
        struct: function(fnCallback){oStruct.get_documents(fnCallback)},        
        accprod : function(fnCallback){oAccProd.get_documents(fnCallback)},

        acc : function(fnCallback){oAcc.get_documents("OVMN02",fnCallback)},
        prod: function(fnCallback){oProd.get_documents("OVMN02",fnCallback)},
        conds: function(fnCallback){oConds.get_documents(fnCallback)} 
    },function(oError,oR){
        console.log("\nresult in parallel")
        console.log("process time:",process.uptime())
        //console.log("iprior:",oR.prior.length,"struct:",oR.struct.length,"accprod:",oR.accprod.length)
        //console.log("iprior:",oR.prior.length,"struct:",oR.struct.length,"conds:",oR.conds.length,"accprod:",oR.accprod.length,"acc:",oR.acc.length,"prod:",oR.prod.length)
        //process.exit()

        let arLoop = oR.accprod.map(o => o.toObject())
        let arAccounts = oPrice.account.get_minified(oR.acc, oPrice.account.get_unique(oR.accprod))
        let arProducts = oPrice.product.get_minified(oR.prod, oPrice.product.get_unique(oR.accprod))
        
        //console.log("products",arProducts.length,"arProducts -> ",arProducts) 
        //console.log("prod data: ",oPrice.product.get_vars(arProducts,"101801","OVMN02").code)
        //process.exit()

        //pricing
        let arPriority = oR.prior.map(o => o.toObject())
        console.log("arPriority:",arPriority)
        let arStructure = oR.struct.map(o => o.toObject())
        let arConds = oR.conds.map(o => o.toObject())

        
        console.log("loop.length:",arLoop.length)
        console.log("process time:",process.uptime())
        let l = arLoop.length
        let lp = arPriority.length

        console.log("\nstart loop:","l:",l,"lp:",lp)
        for(let i=0; i<l; i++ ){
            console.log("i:",i)
            let o = arLoop[i]
            let oAccount = oPrice.account.get_vars(arAccounts,o.code_account,"OVMN02")
            let oProduct = oPrice.product.get_vars(arProducts,o.code_product,"OVMN02")
            //console.log("oAccount:",oAccount,"oProduct:",oProduct)
            //process.exit()
            
            for(let p=0; p<lp; p++ ){
                console.log("p:",p)
                let oP = arPriority[p]
                let arStr = arStructure.find(o => (o.secuence === oP.secuence))
                console.log("\narStr:\n",arStr)
            }//for prior
        }//for Loop

/* 
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
         */
        //let oAcc = oPrice.account.get_vars(arAccounts,"451","OVMN02")
        //let oProd = oPrice.account.get_vars(arProducts,"451","OVMN02")
        //console.log("accs:",arAccounts.length,",prod:",arProducts.length)
        //console.log("process time:",process.uptime())
        //process.exit()
});
