var mongoose = require('mongoose'),  
db = mongoose.createConnection('localhost', 'flamagas');

db.on('error', console.error.bind(console, 'connection error:'));  

const teamlist = function(gname, callback) {  
    db.once('open', function() {
        console.log("opened!!")
      var teamSchema = new mongoose.Schema({
        code: String,
        code_sales_org: String
      });
      var Team = db.model('products', teamSchema);
      Team.find({},function(err, teams) {
        if (err) {
          onErr(err, callback);
        } else {
          mongoose.connection.close();
          console.log(teams);
          callback("", teams);
        }
      }); // end Team.find 
    }); // end db.once open 
  };


  teamlist("a",(e,d)=>{
      ;
  })

  var onErr = function(err,callback) {  
    mongoose.connection.close();
    callback(err);
  };
/*
SELECT '{code_user: "'+Code_User+'", '+
+'code_sales_org: "'+Code_Sales_Org+'", '
+'code_account: "'+CONVERT(VARCHAR(18),Code_Account)+'", '
+'code_product: "'+CONVERT(VARCHAR(18),Code_Product)+'"}'
FROM prj_pricing_prc_loop
*/
