const oAcc = require("../models/model_accounts")

const fnAllReady = (oErr,arData) => {
    console.log(arData)
}

oAcc.get_documents("OVMN02",fnAllReady)

