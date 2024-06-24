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


async function connect() {
    
    try {
        let sqlConnection = await sql.connect(config);
        let tickets = await sqlConnection.request().query('SELECT TOP(10) CleanTicket, Customer FROM dbo.Errors_HISTORY');
        return tickets.recordsets;
    }
    catch (error) {
        throw new Error(error);

    }
}

async function getTickets() {
    try {
        let pool = await sql.connect(config);
        let tickets = await pool.request().query('SELECT Error_Category, CleanTicket, Customer, Branch, Issue, Employee_Name, Submitted_By, Amount FROM dbo.Errors_HISTORY');
        return tickets.recordsets;
    }
    catch (error) {
        console.log(error);
    }
}

async function getTicket(ticketNum) {
    try {
        let pool = await sql.connect(config);
        let tickets = await pool.request()
            .input('input_parameter', sql.VarChar, ticketNum)
            .query('SELECT Error_Category, CleanTicket, Customer, Branch, Issue, Employee_Name, Submitted_By FROM dbo.Errors_HISTORY WHERE dbo.Errors_HISTORY.CleanTicket = @input_parameter');
        return tickets.recordsets;
    }
    catch (error) {
        console.log(error);
    }
}

async function getTableView(errorCategory) {
    try {
        let pool = await sql.connect(config);
        let tickets = await pool.request()
            .input('input_parameter', sql.VarChar, errorCategory)
            // .query('SELECT TOP(1) * FROM dbo.Errors_HISTORY WHERE dbo.Errors_HISTORY.Error_Category = @input_parameter');
            .query('SELECT TOP(30) Error_Category, CleanTicket, Customer, Branch, Issue, Employee_Name, Submitted_By FROM dbo.Errors_HISTORY WHERE dbo.Errors_HISTORY.Error_Category = @input_parameter');
        return tickets.recordsets;
    }
    catch (error) {
        console.log(error);
    }
}

async function getAllBranches() {
    try {
        let pool = await sql.connect(config);
        let branches = await pool.request().query('SELECT BranchNum, BranchGroup FROM dbo.Branch_Table');
        return branches.recordsets;
    }
    catch (error) {
        console.log(error);
    }
}

async function createTicket(ticket) {
    try {
        let pool = await sql.connect(config);
        let ticketInfo = await pool.request()
            .input('errorCat', sql.VarChar, ticket.errorCategories)
            .input('ticketNum', sql.VarChar, ticket.orderNum)
            .input('Customer', sql.VarChar, ticket.customer)
            .input('Branch', sql.Int, ticket.branch)
            .input('Issue', sql.VarChar, ticket.issue)
            .input('employeeName', sql.VarChar, ticket.employeeName)
            .input('submittedBy', sql.VarChar, ticket.submittedBy)
            .input('Amount', sql.Decimal(18,3), ticket.Amount)
            .query('INSERT INTO dbo.Errors_HISTORY ( Error_Category, CleanTicket, Customer, Branch, Issue, Employee_Name, Submitted_By, Amount) VALUES (@errorCat, @ticketNum, @Customer, @Branch, @Issue, @employeeName, @submittedBy, @Amount)')
        return ticketInfo.recordsets;

    }
    catch (error) {
        throw new Error(error);
        // console.log(error);
    }
}

module.exports = {
    connect: connect,
    getTickets: getTickets,
    getTicket: getTicket,
    getTableView: getTableView,
    getAllBranches: getAllBranches,
    createTicket: createTicket,
    poolPromise: poolPromise
}