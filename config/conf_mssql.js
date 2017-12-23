//https://github.com/patriksimek/node-mssql/issues/155
const oConfig = {
    user: "sa",
    password: "Enblanco2015",
    server: "192.168.5.2",
    database: "crm3_flamagas",
    port: 1433,
    debug: true,
    options: {
        encrypt: false, // Use this if you're on Windows Azure
        instanceName: "sql2012"
    }
}

module.exports = oConfig