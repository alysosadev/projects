// const dboperations = require('./public/js/dboperations');
var express = require('express');
const path = require('path');
const sql = require('mssql');
var bodyParser = require('body-parser');
var urlEncodedParser = bodyParser.urlencoded({ extended: false });
var cors = require('cors');
const { poolPromise } = require('./public/js/dboperations');
var app = express();
var config = require('./public/config/dbconfig');
var router = express.Router();


const errorHandler = (error, request, response, next) => {
    console.log(`error ${error.message}`);
    const status = error.status || 400;
    response.status(status).send(error.message);
}

app.use(bodyParser.json());
app.use(cors());

app.use(express.static(path.join(__dirname, "public")));
app.use('/api', router);
app.use(errorHandler);


/* ROUTES */

// sign in 
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'signin.html'))
    console.log('testing path traversal')
})

app.post('/signin', urlEncodedParser, (req, res) => {
    console.log('Body: ', req.body);
    res.sendStatus(200);
    res.redirect('/index.html');
})

router.route('/').get((req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'signin.html'))
    console.log('testing path traversal: router')
})


router.route('/test/tickets').get(async (request, response) => {
    try {
        const sql = `SELECT TOP (100) [Ticket], [Customer], [Product], [Prod2], [Branch], [OrdDate],
        [oSales], [Writer],[Sales],[COGS],[GP] ,[Qty],[GPpct],[UnitSale],[UnitCogs],[CustomerPO]
        FROM [NEFCO_DW].[dbo].[CIS_Booked]`;

        const pool = await poolPromise;
        const result = await pool.request().query(sql);
        const tickets = result.recordset.length ? result.recordset[0] : null;

        response.status(200).send(result.recordset);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
})

const appPool = new sql.ConnectionPool(config);

appPool.connect().then(function (pool) {
    app.locals.db = pool;
    const server = app.listen(3000,'0.0.0.0', function () {
        const host = server.address().address
        const port = server.address().port
        console.log('app is listening at http://%s:%s', host, port)
        console.log(server.address())
    })
}).catch(function (err) {
    console.log('Error creating connection pool to DB - ', err)
});


//vpn attempt

const openvpnmanager = require('node-openvpn');

const opts = {
    host: '10.200.200.91',
    port: 443,
    timeout: 1500,
    logpath: 'log.txt'
};
const auth = {
    user: 'aly.sosa@nefcocorp.com',
    pass: 'Semeolvido12345!'
};
const openvpn = openvpnmanager.connect(opts)

openvpn.on('connected', () => {
    console.log("Connected to VPN successfully...")

    openvpnmanager.authorize(auth);
});

openvpn.on('error', error => {
    console.log(error);
})
openvpn.on('console-output', output => {
    console.log(output)
});
