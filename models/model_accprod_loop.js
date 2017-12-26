const mongoose = require("mongoose"),  
      db = mongoose.createConnection('localhost','flamagas')

db.on('error', console.error.bind(console, 'connection error:'))

const get_list = function(codSO, fnCallback) {  
    db.once('open', function() {
        console.log("opened!!")
        let oSchema = new mongoose.Schema({
            code_user: String,
            code_sales_org: String,
            code_account: String,
            code_product: String
        })
        let oModel = db.model('accprod', oSchema);
        oModel.find(  function(oError, arRows) {
            if (oError) {
                on_error(oError,fnCallback);
            } else {
                mongoose.connection.close();
                console.log(arRows);
                fnCallback("", arRows);
            }
        }) // end oModel.find 
    }) // end db.once open 
}

get_list("OVMN02",(oError,arRows)=>{

})

const on_error = function(oError,fnCallback) {  
    mongoose.connection.close();
    fnCallback(oError);
}

/*
SELECT '{code_user: "'+Code_User+'", '+
+'code_sales_org: "'+Code_Sales_Org+'", '
+'code_account: "'+CONVERT(VARCHAR(18),Code_Account)+'", '
+'code_product: "'+CONVERT(VARCHAR(18),Code_Product)+'"}'
FROM prj_pricing_prc_loop
*/
