
const oConfig = require("../config/conf_mongoose")
//const mongoose = require("mongoose").set("debug",true)
const mongoose = require("mongoose")

mongoose.Promise = global.Promise
mongoose.connect(oConfig.url, {useMongoClient: true} )

const db = mongoose.connection

db.on("error", console.error.bind(console,'connection error:'))

const oDb = {
    mng: mongoose, 
    conn: db,

    //methods
    get_schema : oSchema => mongoose.Schema(oSchema),
    get_model : (sModel,oSchema) => mongoose.model(sModel,oSchema),
    get_collection : sCollection => mongoose.connection.db.collection(sCollection),
    close : () => { 
                mongoose.connection.db.close((oErr) =>{
                    console.log("closing connection!!")
                    if(oErr) {
                        console.log("mongoose.connection.db.close: Error",oErr)
                        throw oErr
                    }
                }//on_close
                )//close()    
            },
    open :(fnOnDone) => {db.once("open",fnOnDone)}
}

module.exports = oDb