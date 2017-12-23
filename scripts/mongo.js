
const oMongoose = require("mongoose")
oMongoose.connection.openUri("mongodb://127.0.0.1/flamagas")
const oConx = oMongoose.connection;
oConx.on("error", console.error.bind(console,'connection error:'));
oConx.once("open",function() {
  // we're connected!
  console.log("Mongoose Success!!".yellow)
});

var schema = new oMongoose.Schema({ name: 'string', size: 'string' });
var Tank = oMongoose.model("accounts", schema);
