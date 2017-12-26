const oAsync = require("async")
const oAcc = require("../models/model_accounts")
const oProd = require("../models/model_products")

const arAccounts = []
const arProducts = []

const fnAllReady = (oErr,arData) => {

    console.log(arAccounts,arProducts)
}

//oAcc.get_documents("OVMN02",fnAllReady)

const fnHandlerAll = () => {
    oAsync.parallel([
            a = function(cb){
                cb(null,oAcc.get_documents("OVMN02"))
            },
            b = function(cb){
                cb(null,oProd.get_documents("OVMN02"))
            }
        ],function(oError,arData){
            console.log("arData",arData)
        }
    )//parallel
}

fnHandlerAll(fnAllReady)
console.log("process time:",process.uptime())