const config = require("./../config");
// var sql = require("mssql");

let configExport = {};


configExport.dbConfig = {
    'username': "sa",
    'password': "p@ssw0rd",
    'database': "CALIBRATION_ 2022",
    host: 'localhost',
    port: 1433,
    dialect: "mssql",
    dialectOptions: {
      options: {
        encrypt: false,
        validateBulkLoadParameters: true,
        useUTC: false,
        dateFirst: 1,
      },
    },
    define: {
        timestamps: false
    }
}



module.exports = configExport