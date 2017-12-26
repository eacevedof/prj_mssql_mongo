const oAsync = require("async")
const oAcc = require("../models/model_accounts")
const oProd = require("../models/model_products")

const arAll = []

oAsync.parallel([
        (cb)=>{oAcc.get_documents("OVMN02",cb)},
        (cb)=>{oProd.get_documents("OVMN02",cb)}
    ],function(oError,arData){
        //console.log("arData:",arData[0].length)
        let arAcc = arData[0]
        let arPrd = arData[1]
        console.log(arAcc.length,arPrd.length)
});

console.log("process time:",process.uptime())