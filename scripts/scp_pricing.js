console.log("process time:",process.uptime())
console.log("https://stackoverflow.com/questions/38453801/best-way-to-process-results-of-multiple-sequential-dependent-mongo-queries-in")
const oAsync = require("async")
const oAcc = require("../models/model_accounts")
const oProd = require("../models/model_products")
const oAccProd = require("../models/model_accprods")

const arAll = []

oAsync.parallel([
        (cb)=>{oAccProd.get_documents(cb)},
        (cb)=>{oAcc.get_documents("OVMN02",cb)},
        (cb)=>{oProd.get_documents("OVMN02",cb)}
    ],function(oError,arData){
        console.log("arData[0]:",arData[0].length)
        let arAcc = arData[0]
        let arPrd = arData[1]
        console.log(arAcc.length,arPrd.length)
        console.log("process time:",process.uptime())
});
