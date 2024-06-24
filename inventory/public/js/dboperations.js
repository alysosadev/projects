var config = require('../config/dbconfig');
const sql = require('mssql');

/* 
 * poolPromise : ConnectionPool to be used when operating on the DB. Allows for multiple 
 * connections (in essence queries) to hit the database without giving an ESOCKET error
 * 
 * returns --> pool: sql.Pool that can be used to run queries 
 * 
 */ 

const poolPromise = new sql.ConnectionPool(config)
    .connect()
    .then(pool => {
        console.log('Connected to MSSQL NEFCO Server');
        // console.log(pool);
        return pool
    }).catch(err => console.log('Database connection failed! Bad Config: ', err))



module.exports = {
    poolPromise: poolPromise
}