const sql = require("mssql")
const oConfig = require("../config/mssql")

//console.log("sql".green,sql)
sql.connect(oConfig).then(() => {
    return sql.query`select * from accounts where code = '1'`
}).then(result => {
    console.dir(result)
}).catch(err => {
    // ... error checks
})
 
sql.on('error', err => {
    // ... error handler
})
