/*
const config = {
    server: 'br1-sql-01.NEFCO.com',
    database: 'NEFCO_DW',
    port: 3000,
    options: {
        rowCollectionOnRequestCompletion: true,
        trustServerCertificate: true,
        enableArithAort: true
    },
    authentication: {
        type: 'default',
        options: {
            userName: 'sales_dash',
            password: '2UQvU0p4DP'
        }
    }
};*/

var config = {
    server: 'BR1-SQL-01.nefco.com',
    authentication: {
        type: 'default',
        options: {
            userName: 'sales_dash',
            password: '2UQvU0p4DP',
        }
    },
    options: {
        database: 'NEFCO_DW',
        trustServerCertificate: true,
        trustedConnection: true
    }
}


module.exports = config;