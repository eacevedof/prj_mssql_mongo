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

const arAll = []

oAsync.parallel({
        accprod : function(cb){oAccProd.get_documents(cb)},
        acc : function(cb){oAcc.get_documents("OVMN02",cb)},
        prod: function(cb){oProd.get_documents("OVMN02",cb)},
        struct: function(cb){oStruct.get_documents(cb)},
        conds: function(cb){oConds.get_documents(cb)},
        prior: function(cb){oPrior.get_documents(cb)}
    },function(oError,arData){
        console.log("arData",arData.prod.length)
        console.log("process time:",process.uptime())
});
