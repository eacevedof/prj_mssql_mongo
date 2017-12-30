const oConfig = require("../config/conf_mongoose")
const mongoose = require("mongoose").set("debug",true)
mongoose.Promise = global.Promise

mongoose.connect( oConfig.url, { useMongoClient: true } )