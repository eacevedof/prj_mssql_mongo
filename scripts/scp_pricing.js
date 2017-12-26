const oAsync = require("async")
const oAcc = require("../models/model_accounts")
const oProd = require("../models/model_products")

const arAccounts = []
const arProducts = []

oAsync.parallel([
        function(cb){oProd.get_documents("OVMN02",cb)}
    ],function(oError,arData){
        console.log(arData)
});

console.log("process time:",process.uptime())