const express = require("express");
const path = require('path');
const sql = require('mssql');
var config = require('./public/config/dbconfig');
var bodyParser = require('body-parser');
var urlEncodedParser = bodyParser.urlencoded({ extended: false });
var cors = require('cors');
const invRoute = require('./public/routes/inventory_route');

const app = express();
const PORT = 6969;

app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));

//----- ROUTES ------//

app.use('/api/inventory', invRoute);

//------- Start server ------//

const appPool = new sql.ConnectionPool(config);

appPool.connect().then(function (pool) {
    app.locals.db = pool;
    const server = app.listen(PORT, function () {
        const host = server.address().address
        const port = server.address().port
        console.log('Server is listening at http://%s:%s', host, port)
    })
}).catch(function (err) {
    console.log('Error creating connection pool to DB - ', err)
});
