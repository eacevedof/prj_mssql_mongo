
const oConfig = require("../config/conf_mongoose")
//const mongoose = require("mongoose").set("debug",true)
const mongoose = require("mongoose")

mongoose.Promise = global.Promise
mongoose.connect(oConfig.url, {useMongoClient: true} )

const conn = mongoose.connection

conn.on("error", console.error.bind(console,'connection error:'))

const oDb = {
    mng: mongoose, 
    conn: conn,
    //methods
    //https://stackoverflow.com/questions/10547118/why-does-mongoose-always-add-an-s-to-the-end-of-my-collection-name
    get_schema : (oSchema,oCollection) => mongoose.Schema(oSchema,oCollection),
    get_model : (sModel,oSchema) => mongoose.model(sModel,oSchema),
    get_collection : sCollection => conn.db.collection(sCollection),
    close : () => { 
                conn.db.close((oErr) =>{
                    console.log("closing connection!!")
                    if(oErr) {
                        console.log("mongoose.connection.db.close: Error",oErr)
                        throw oErr
                    }
                }//on_close
                )//close()    
            },
    open :(fnOnDone) => {conn.once("open",fnOnDone)},
}

module.exports = oDb