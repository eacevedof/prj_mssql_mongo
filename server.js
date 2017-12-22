//server.js 5.0.0
//Tutorial: Express | Node.js Framewokr, Curso Práctico Rápido Desde Cero
//https://youtu.be/8eg4w8v076w?t=3012
const colors = require("colors")

console.log("server.js 1.0.0","Tutorial: Express | Node.js Framewokr, Curso Práctico Rápido Desde Cero")
const fnExpress = require("express")
const oApp = fnExpress()
const oRouter = require("./routes")
const oRouterApi = require("./routes-api")

const oConfig = require("./config/mssql")
console.log("oConfig".red,oConfig)

const sql = require("mssql")

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

//SETTINGS https://youtu.be/8eg4w8v076w?t=3012
//sirve para establecer las configuraciones de un motor de plantillas
oApp.set("appName","Mi primer Servidor :)")
oApp.set("view engine","ejs")
oApp.set("views",__dirname.concat("/views"))

//FIN SETTINGS

//MIDDLEWARES
//https://youtu.be/8eg4w8v076w?t=2327
//un middleware es funcionalidad intermedia que necesita un estado siguiente
//de lo contrario finalizaria ahi y se podria dar un bloqueo del servidor
const fnMorgan = require("morgan")
oApp.use(fnMorgan("dev"))
//oApp.use(fnMorgan("short"))
/*GET /login/ 200 0.095 ms - -
::1 - GET /login/ HTTP/1.1 200 - - 0.095 ms*/
//oApp.use(fnMorgan("combined"))
/*
GET /login/ 200 0.805 ms - -
::1 - GET /login/ HTTP/1.1 200 - - 0.805 ms
::1 - - [03/Dec/2017:17:09:34 +0000] "GET /login/ HTTP/1.1" 200 - "-" "Mozilla/5.0 (Windows NT 6.1; Win64;
x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.94 Safari/537.36"
*/
//FIN MIDDLEWARES

//RUTAS https://youtu.be/8eg4w8v076w?t=4081
//require("./routes")//esto no funcionaría así habria que pasarle un middlware
oApp.use(oRouter)
oApp.use("/api",oRouterApi)

oApp.get("*",(req,res)=>{
    res.end("Archivo no encontrado")
})
//FIN RUTAS

//CONFIGURACION SERVIDOR
const iPort = process.env.PORT || 3000
oApp.listen(iPort, ()=>{
    console.log("Servidor funcionando en "+iPort)
    console.log("Nombre de la App: ",oApp.get("appName"))
})