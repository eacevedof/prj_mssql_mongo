const oConfig = {
    user: 'sa',
    password: 'devuser',
    server: 'GRIFF',
    database: 'devdb',
    //port: 1433,
    debug: true,
    options: {
        encrypt: false // Use this if you're on Windows Azure
        ,instanceName: 'SQLEXPRESS'
    }
}

module.exports = oConfig