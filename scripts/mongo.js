
const oMongo = require("mongoose")
oMongo.connection.openUri("mongodb://127.0.0.1/flamagas")
const oConx = oMongo.connection;
oConx.on("error", console.error.bind(console,'connection error:'));
oConx.once("open",function() {
  // we're connected!
  console.log("Mongoose Success!!".yellow)
});

