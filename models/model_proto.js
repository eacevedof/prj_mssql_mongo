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

//================
//    TRUNCATE 
//================
const on_dropped = (oErr) => {
    console.log("on_dropped:")
    if(oErr) throw oErr
    db.close()
}//on_dropped


const drop_collection = (fnOnDone) => {
    console.log("drop_collection:")
    db.get_collection(sCollection).drop(fnOnDone)
}//drop_collection

//================
//    FIND
//================
const on_found = (oErr, arDocs) => {
    console.log("on_found:")
    if(oErr) throw oErr
    
    arDocs.forEach((oDoc) => {
        console.log("oDoc: ",oDoc)
    })//forEach
}//on_found

const get_documents = (CModel,fnOnDone) => {
    console.log("get_documents:")
    CModel.find({ weeksAtOne: { $gte: 10} }).sort({ decade: 1}).exec(fnOnDone)
}//get_documents

//================
//    INSERT
//================

const on_insert = (oErr, arResult) => {
    console.log("on_insert")
    console.log("oErr:",oErr,"arResult:",arResult)
}

const insert = (CModel,fnOnDone,...arObjects) => {
    console.log("insert:")
    CModel.insertMany(arObjects,fnOnDone)
}//insert

//================
//    UPDATE
//================
const on_update = (oErr, iNumAffected, oRaw) => {
    console.log("on_update:")
    if (oErr) return handleError(oErr)
    //imprime el listado  
    //get_documents(CModel,on_found)
}//on_update

const update = (CModel,fnOnDone) => {
    console.log("update:")
    CModel.update({ song: 'One Sweet Day'}, 
    { $set: { artist: 'Mariah Carey ft. Boyz II Men yyyy'} }, 
    fnOnDone)//CModel.update

}//update


const on_dbopen = () => {
    console.log("on_opened:")

    let oSchema = db.get_schema(oSchemaConfig)
    let Model = db.get_model(sCollection, oSchema)

    let oSeventies = new Model({
        decade: '1970s',
        artist: 'Debby Boone',
        song: 'You Light Up My Life',
        weeksAtOne: 10
    })

    let oEighties = new Model({
        decade: '1980s',
        artist: 'Olivia Newton-John',
        song: 'Physical',
        weeksAtOne: 10
    })

    let oNineties = new Model({
        decade: '1990s',
        artist: 'Mariah Carey',
        song: 'One Sweet Day',
        weeksAtOne: 16
    })

    //CRUD
    insert(Model,on_insert,oSeventies,oEighties,oNineties)
    update(Model,on_update)
    get_documents(Model,on_found)
    drop_collection(on_dropped)
}//on_dbopen

db.open(on_dbopen)