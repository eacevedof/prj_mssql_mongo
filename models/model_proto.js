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

const add = (CModel,...arObjects)=>{
    console.log("insert many...")
    CModel.insertMany(arObjects)
}//add

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

  add(Model,seventies,eighties,nineties)

  /*
   * Then we need to give Boyz II Men credit for their contribution
   * to the hit "One Sweet Day".
   */
  Model.update({ song: 'One Sweet Day'}, { $set: { artist: 'Mariah Carey ft. Boyz II Men'} }, 
    function (err, numberAffected, raw) {

      if (err) return handleError(err);

      /*
       * Finally we run a query which returns all the hits that spend 10 or
       * more weeks at number 1.
       */
      Model.find({ weeksAtOne: { $gte: 10} }).sort({ decade: 1}).exec(function (err, docs){

        if(err) throw err;

        docs.forEach(function (doc) {
          console.log(
            'In the ' + doc['decade'] + ', ' + doc['song'] + ' by ' + doc['artist'] + 
            ' topped the charts for ' + doc['weeksAtOne'] + ' straight weeks.'
          );
        });

/*         // Since this is an example, we'll clean up after ourselves.
        db.mng.connection.db.collection('songs').drop(function (err) {
            console.log("dropping songs")
          if(err) throw err;

          // Only close the connection when your app is terminating
          db.mng.connection.db.close(function (err) {
            if(err) throw err;
          });
        });//drop */
      });
    }
  )
  
}//on_dbopen

db.conn.once("open",on_dbopen)