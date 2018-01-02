//example: connect mongo
//https://github.com/mongolab/mongodb-driver-examples/blob/master/nodejs/mongooseSimpleExample.js
const db = require("../components/component_dbmongoose")
const crud = require("../components/component_crud")

//================
//    MODEL 
//================
const sCollection = "songs"
const oSchemaConfig = {
    decade: String,
    artist: String,
    song: String,
    weeksAtOne: Number
}

const oSchema = db.get_schema(oSchemaConfig)
const Model = db.get_model(sCollection, oSchema)

//================
//    TRUNCATE 
//================
const on_dropped = (oErr) => {
    console.log("on_dropped:")
    if(oErr) throw oErr
}//on_dropped

const drop = (fnOnDone) => {
    let fn = crud.drop_collection(db)(sCollection)(fnOnDone)
    db.open(fn)
}

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

const get_documents = (fnOnDone) => {
    console.log("get_documents:")
    let fn = crud.get_documents(Model)({ weeksAtOne: { $gte: 10} })({ decade: 1})(fnOnDone)
    db.open(fn)
}//get_documents

//================
//    INSERT
//================

const on_insert = (oErr, arResult) => {
    console.log("on_insert")
    console.log("oErr:",oErr,"arResult:",arResult)
}

const insert = (fnOnDone) => {

    let oSeventies = new Model({
        decade: '1970s',
        artist: 'Debby Boone',
        song: 'You Light Up My Life YYY',
        weeksAtOne: 10
    })

    let oEighties = new Model({
        decade: '1980s',
        artist: 'Olivia Newton-John',
        song: 'Physical YYY',
        weeksAtOne: 10
    })

    let oNineties = new Model({
        decade: '1990s',
        artist: 'Mariah Carey',
        song: 'One Sweet Day YYY',
        weeksAtOne: 16
    })

    const on_open = crud.insert(Model)(oSeventies,oEighties,oNineties)(fnOnDone)
    db.open(on_open)
}//insert_open


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

insert(on_insert)
drop(on_dropped)
get_documents(on_found)
//db.open(insert)