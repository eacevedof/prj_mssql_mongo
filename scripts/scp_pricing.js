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
                            //.sort((o1,o2)=>o1.priority - o2.priority)
                            //.sort((o1,o2)=>o1.orden - o2.orden)
        //console.log("arPriority:",arPriority)
        //process.exit()
        let arStructure = oR.struct.map(o => o.toObject())
        //console.log("arStructure:",arStructure)
        //process.exit()
        let arConds = oR.conds.map(o => o.toObject())

        
        //console.log("loop.length:",arLoop.length)
        //console.log("process time:",process.uptime())
        let ll = arLoop.length
        //let lp = arPriority.length
        
        //console.log("\nstart loop:","ll:",ll,"lp:",lp)

        let arFound = []
        for(let i=0; i<ll; i++ ){
            //console.log("i:",i)
            let o = arLoop[i]
            let oAccount = oPrice.account.get_vars(arAccounts,o.code_account,"OVMN02")
            let oProduct = oPrice.product.get_vars(arProducts,o.code_product,"OVMN02")
            //console.log("oAccount:",oAccount,"oProduct:",oProduct)
            //process.exit()
            for(let iP=1; iP<4; iP++){
                let arSecPrior = arPriority.filter(o => o.priority == iP)
                let ls = arSecPrior.length //num de secuencias

                for(let iS=0; iS<ls; iS++){
                    let sSecuence = arSecPrior[iS].secuence
                    //recupero las estructuras por "code_table" de una secuencia
                    let arStructT = arStructure.filter(oStr => (oStr.secuence === sSecuence))
                    
                    let lT = arStructT.length
                    let isFound = false
                   
                    //arStructT
                    for(let iT=0; iT<lT; iT++){
                        //secuencia y tabla
                        let oStructT = arStructT[iT]
                        let sToken = oPrice.struct.get_token(oStructT,oAccount,oProduct)
                        let oFound = arConds.find((o)=>(o.secuence === oStructT.secuence 
                                                        && o.code_table === oStructT.code_table 
                                                        && o.valuekey === sToken
                                                        //Falta fecha!!!
                                                    ))
                        //si se ha encontrado se guarda el primero y se sale
                        if(oFound) 
                        {
                            isFound = true
                            arFound.push({condition:oFound,account:oAccount.code,product:oProduct.code})
                            console.log("oFound",oFound)
                            process.exit()
                            break
                        }
                    }//for arStructT
                  
                    //si no se ha encontrado y es secuencia de precio se debe saltar a la siguiente prioridad
                    if(!isFound && (sSecuence.includes("ZPUC1") || sSecuence.includes("ZPUC2")
                        || sSecuence.includes("ZPUM"))
                    ){
                        break
                    }                      
                }//for arSecPrior

            }//for (1..3)
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
