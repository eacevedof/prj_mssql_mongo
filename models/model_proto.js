//example: connect mongo
//https://github.com/mongolab/mongodb-driver-examples/blob/master/nodejs/mongooseSimpleExample.js

const db = require("../components/component_dbmongoose")

const on_dbopen = ()=>{

  // Create song schema
  var songSchema = db.get_schema({
    decade: String,
    artist: String,
    song: String,
    weeksAtOne: Number
  })

  // Store song documents in a collection called "songs"
  var Song = db.get_model('songs', songSchema);

  // Create seed data
  var seventies = new Song({
    decade: '1970s',
    artist: 'Debby Boone',
    song: 'You Light Up My Life',
    weeksAtOne: 10
  });

  var eighties = new Song({
    decade: '1980s',
    artist: 'Olivia Newton-John',
    song: 'Physical',
    weeksAtOne: 10
  });

  var nineties = new Song({
    decade: '1990s',
    artist: 'Mariah Carey',
    song: 'One Sweet Day',
    weeksAtOne: 16
  });

  /*
   * First we'll add a few songs. Nothing is required to create the 
   * songs collection; it is created automatically when we insert.
   */
  var list = [seventies, eighties, nineties]
  Song.insertMany(list);

  /*
   * Then we need to give Boyz II Men credit for their contribution
   * to the hit "One Sweet Day".
   */
  Song.update({ song: 'One Sweet Day'}, { $set: { artist: 'Mariah Carey ft. Boyz II Men'} }, 
    function (err, numberAffected, raw) {

      if (err) return handleError(err);

      /*
       * Finally we run a query which returns all the hits that spend 10 or
       * more weeks at number 1.
       */
      Song.find({ weeksAtOne: { $gte: 10} }).sort({ decade: 1}).exec(function (err, docs){

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