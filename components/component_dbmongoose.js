
const oConfig = require("../config/conf_mongoose")
const mongoose = require("mongoose").set("debug",true)

mongoose.Promise = global.Promise
mongoose.connect(oConfig.url, {useMongoClient: true} )

const db = mongoose.connection

db.on("error", console.error.bind(console,'connection error:'))

const oDb = {
    mng: mongoose, 
    conn: db,

    //methods
    get_schema : oSchema => mongoose.Schema(oSchema),
    get_model : (sModel,oSchema) => mongoose.model(sModel,oSchema) 
}

module.exports = oDb