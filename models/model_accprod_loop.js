const mongoose = require("mongoose"),  
      db = mongoose.createConnection('localhost','flamagas')

      process.setMaxListeners(0)
db.on('error', console.error.bind(console, 'connection error:'))


const get_lopps = function(codSO, fnCallback) {  
    db.once('open', function() {
        console.log("opened!!")
        let oSchema = new mongoose.Schema({
            code_sales_org: String,
            code_account: String,
            code_product: String
        })
        let oModel = db.model('accproducts', oSchema);

        oModel.find(  function(oError, arRows) {
            if (oError) {
                on_error(oError,fnCallback);
            } else {
                mongoose.connection.close();
                //console.log(arRows);
                fnCallback("", arRows);
            }
        }) // end oModel.find 
    }) // end db.once open 
}//get_loops

const on_account = function(oError,arRows,codProd){
    arRows.forEach((o)=>{
        console.log("on_account",o)
    })
}

const get_account = function(codSO, codAcc,codProd, fnCallback) {  
    db.once('open', function() {
        console.log("opened!!")
        let oSchema = new mongoose.Schema({
            code_user: String,
            code_sales_org: String,
            code_account: String,
            code_product: String
        })
        let oModel = db.model('accounts', oSchema);

        oModel.find({code_sales_org:codSO,code_account:codAcc},function(oError, arRows) {
            if (oError) {
                on_error(oError,fnCallback);
            } else {
                mongoose.connection.close();
                //console.log(arRows);
                fnCallback("", arRows,codProd);
            }
        }) // end oModel.find 
    }) // end db.once open 
}//get_loops

const on_loops = (oError,arRows) => {
    arRows.forEach((o)=>{
        //if(oError) on_error(oError,fnCallback)

        const codAcc = o.code_account
        const codProd = o.code_product
        get_account("OVMN02",codAcc,codProd, on_account)
        
    })
}

//get_lopps("OVMN02",on_loops)

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
