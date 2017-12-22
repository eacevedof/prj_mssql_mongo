//routes.js
//separando rutas
//https://youtu.be/8eg4w8v076w?t=3998
const oExpress = require("express")
const oRouter = oExpress.Router()

oRouter.get("/",(req,res)=>{
    res.render("index.ejs")
})

oRouter.get("/login",(req,res)=>{
    res.render("login.ejs")
})

module.exports = oRouter