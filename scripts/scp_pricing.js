const oAsync = require("async")
const oAcc = require("../models/model_accounts")
const oProd = require("../models/model_products")

const fnAllReady = (oErr,arData) => {
    
    console.log(arData)
}

//oAcc.get_documents("OVMN02",fnAllReady)

const fnHandlerAll = (fnCallback) => {
    oAsync.parallel([
            () => {oAcc.get_documents("OVMN02",fnCallback)},
            () => {oProd.get_documents("OVMN02",fnCallback)}
        ]
        ,(oError,arData) => {
            if(!oError)
                //fnCallback(arData){this...}
                return fnCallback.apply(null,arData)
            console.log("fnHandlerAll",arData)
    })
}

fnHandlerAll(fnAllReady)