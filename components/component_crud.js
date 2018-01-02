
const oCrud = {
    insert : (CModel) => 
        (...arObjects) => 
            (fnOnDone) => 
                () => {console.log("insert:"); CModel.insertMany(arObjects,fnOnDone)},
    
    drop_collection : (db) => 
                        (sCollection) => 
                            (fnOnDone)=>
                                ()=>{console.log("drop_collection:");db.get_collection(sCollection).drop(fnOnDone)},
                                
    get_documents : (CModel) => (oCond) =>(oSort)=> (fnOnDone)=>()=>{CModel.find(oCond).sort(oSort).exec(fnOnDone)},
    
    update : () => ()=>{},

    update : () => ()=>{},    
}//oCrud

module.exports = oCrud