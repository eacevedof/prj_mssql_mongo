//example: connect mongo
//https://github.com/mongolab/mongodb-driver-examples/blob/master/nodejs/mongooseSimpleExample.js

const db = require("../components/component_dbmongoose")

const sCollection = "songs"
const oSchemaConfig = {
    decade: String,
    artist: String,
    song: String,
    weeksAtOne: Number
  }

const drop_collection = () => {
    const on_dropped = (oErr) => {
        console.log("dropping collection:",sCollection)
        if(oErr) throw oErr
        db.close()
    }//on_dropped

    db.get_collection(sCollection).drop(on_dropped)
}//drop_collection

const get_documents = (CModel)=>{
    const on_found = function (err, arDocs){
        if(err) throw err

        arDocs.forEach(function (oDoc) {
            console.log("oDoc: ",oDoc)
        })

        //drop_collection()

    }//on_found
    CModel.find({ weeksAtOne: { $gte: 10} }).sort({ decade: 1}).exec(on_found)

/*         // Since this is an example, we'll clean up after ourselves.
        db.mng.connection.db.collection('songs').drop(function (err) {
            console.log("dropping songs")
          if(err) throw err;

          // Only close the connection when your app is terminating
          db.mng.connection.db.close(function (err) {
            if(err) throw err;
          });
        });//drop */
      
}//get_documents

const insert = (CModel,...arObjects)=>{
    console.log("insert many...")
    CModel.insertMany(arObjects)
}//insert

const update = (CModel) => {

    const on_update = (oErr, numberAffected, raw) => {
        if (oErr) return handleError(oErr)
        //imprime el listado  
        get_documents(CModel)
    }//on_update

    CModel.update({ song: 'One Sweet Day'}, 
            { $set: { artist: 'Mariah Carey ft. Boyz II Men yyyy'} }, 
            on_update)//CModel.update

}//update


const on_dbopen = ()=>{

  // Create song schema
  var oSchema = db.get_schema(oSchemaConfig)

  // Store song documents in a collection called "songs"
  var Model = db.get_model(sCollection, oSchema);

  // Create seed data
  var seventies = new Model({
    decade: '1970s',
    artist: 'Debby Boone',
    song: 'You Light Up My Life',
    weeksAtOne: 10
  });

  var eighties = new Model({
    decade: '1980s',
    artist: 'Olivia Newton-John',
    song: 'Physical',
    weeksAtOne: 10
  });

  var nineties = new Model({
    decade: '1990s',
    artist: 'Mariah Carey',
    song: 'One Sweet Day',
    weeksAtOne: 16
  });

  insert(Model,seventies,eighties,nineties)

  update(Model)

  get_documents(Model)
}//on_dbopen

db.conn.once("open",on_dbopen)