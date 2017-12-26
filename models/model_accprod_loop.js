const mongoose = require("mongoose"),  
      db = mongoose.createConnection('localhost','flamagas')

db.on('error', console.error.bind(console, 'connection error:'))

const get_list = function(codSO, callback) {  
    db.once('open', function() {
        console.log("opened!!")
        let oSchema = new mongoose.Schema({
            code: String,
            code_sales_org: String
        })
        let oModel = db.model('products', oSchema);
        oModel.find({code_sales_org:codSO},function(oError, arRows) {
            if (oError) {
                on_error(oError, callback);
            } else {
                mongoose.connection.close();
                console.log(arRows);
                callback("", arRows);
            }
        }) // end oModel.find 
    }) // end db.once open 
}

get_list("OVMN02",(e,d)=>{
    ;
})

const on_error = function(oError,callback) {  
    mongoose.connection.close();
    callback(oError);
}

/*
SELECT '{code_user: "'+Code_User+'", '+
+'code_sales_org: "'+Code_Sales_Org+'", '
+'code_account: "'+CONVERT(VARCHAR(18),Code_Account)+'", '
+'code_product: "'+CONVERT(VARCHAR(18),Code_Product)+'"}'
FROM prj_pricing_prc_loop
*/
