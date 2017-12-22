//routes-api.js
const oExpress = require("express")
const oRouter = oExpress.Router()

oRouter.get("/",(req,res) => {
    res.json({
        miprimeraapi: "Works!"
    })
})

module.exports = oRouter