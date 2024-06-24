const express = require('express');
const sql = require('mssql');
const { poolPromise } = require('../js/dboperations');
const router = express.Router();


//search all adjustments
router.route('/allAdjustments').get(async (request, response) => {
    try {
        const pool = await poolPromise;
        const adjustment = request.query;

        console.log(adjustment);

        let result = await pool.request()
            .input('BranchID', sql.VarChar, adjustment.branchid)
            .input('BuyLine', sql.VarChar, adjustment.buyline)
            .input('PriceLine', sql.VarChar, adjustment.priceline)
            .input('GlProductType', sql.VarChar, adjustment.glproducttype)
            .input('StartDate', sql.VarChar, adjustment.startDate)
            .input('EndDate', sql.VarChar, adjustment.endDate)
            .input('Writer', sql.VarChar, adjustment.writer)
            .input('InternalNotes', sql.VarChar, adjustment.internalnotes)
            .input('ProductID', sql.VarChar, adjustment.productid)
            .input('LedgerID', sql.VarChar, adjustment.ledgerid)
            .input('LocationType', sql.VarChar, adjustment.locationtype)
            .input('ProdStatus', sql.VarChar, adjustment.prodstatus)
            .input('ExtCogsGreaterThan', sql.VarChar, adjustment.cogsgreater)
            .input('ExtCogsLessThan', sql.VarChar, adjustment.cogslesser)
            .execute("NEFCO_DW.dbo.spValidAdjNeedsReviewSearch");

        const adjustments = result.recordset;

        adjustments.forEach(function (adj) {
            adj.AdjDate = adj.AdjDate.toLocaleDateString();
        })

        console.log(`inventory management - found ${adjustments.length} adjustments`);
        //console.log(adjustments);
        response.json(adjustments);
        
    }
    catch (err) {
        response.status(500).send(err.message);
    }

})

//search all reviewed adjustments
router.route('/reviewAllAdjustments').get(async (request, response) => {
    try {
        const pool = await poolPromise;
        const adjustment = request.query;

        console.log(adjustment);

        let result = await pool.request()
            .input('BranchID', sql.VarChar, adjustment.branchid)
            .input('BuyLine', sql.VarChar, adjustment.buyline)
            .input('PriceLine', sql.VarChar, adjustment.priceline)
            .input('GlProductType', sql.VarChar, adjustment.glproducttype)
            .input('StartDate', sql.VarChar, adjustment.startDate)
            .input('EndDate', sql.VarChar, adjustment.endDate)
            .input('Writer', sql.VarChar, adjustment.writer)
            .input('InternalNotes', sql.VarChar, adjustment.internalnotes)
            .input('ProductID', sql.VarChar, adjustment.productid)
            .input('LedgerID', sql.VarChar, adjustment.ledgerid)
            .input('LocationType', sql.VarChar, adjustment.locationtype)
            .input('ProdStatus', sql.VarChar, adjustment.prodstatus)
            .input('ExtCogsGreaterThan', sql.VarChar, adjustment.cogsgreater)
            .input('ExtCogsLessThan', sql.VarChar, adjustment.cogslesser)
            .input('IsDelete', sql.VarChar, adjustment.isDelete)
            .input('ManagerReviewed', sql.VarChar, adjustment.managerreview)
            .execute("NEFCO_DW.dbo.spValidAdjReviewedAdjSearch");

        const adjustments = result.recordset;

        adjustments.forEach(function (adj) {
            adj.AdjDate = adj.AdjDate.toLocaleDateString();
        })

        console.log(`inventory management - found ${adjustments.length} reviewed adjustments`);
        //console.log(adjustments);
        response.json(adjustments);

    }
    catch (err) {
        response.status(500).send(err.message);
    }

})

// edit adjustments
router.route('/validadjustments').post(async (request, response, next) => {
    try {
        const pool = await poolPromise;
        const adj = request.body;
        const currDateTime = new Date();

        let primaryInsert = await pool.request()
            .input('svmc', sql.Int, adj.SVMC)
            .input('datesubmitted', sql.Date, adj.AdjDate)
            .input('branchid', sql.VarChar, adj.BranchID)
            .input('buyline', sql.VarChar, adj.BuyLine)
            .input('cogs', sql.Numeric, adj.COGS)
            .input('excogs', sql.Numeric, adj.ExtendedCOGS)
            .input('prodtype', sql.VarChar, adj.GlProductType)
            .input('internalnotes', sql.VarChar, adj.InternalNotes)
            .input('lastupdated', sql.Date, adj.LastUpdate)
            .input('ledgerid', sql.VarChar, adj.LedgerID)
            .input('locationtype', sql.VarChar, adj.LocationType)
            .input('priceline', sql.VarChar, adj.PriceLine)
            .input('prodstatus', sql.SmallInt, adj.ProdStatus)
            .input('proddesc', sql.VarChar, adj.ProductDesc1)
            .input('prodid', sql.VarChar, adj.ProductID)
            .input('qty', sql.Int, adj.Qty)
            .input('validadj', sql.VarChar, adj.ValidAdj)
            .input('wdcogs', sql.Numeric, adj.WDCOGS)
            .input('wucogs', sql.Numeric, adj.WUCOGS)
            .input('weeknum', sql.Int, adj.WeekNum)
            .input('whseloc', sql.VarChar, adj.WhseLoc)
            .input('writedown', sql.Int, adj.WriteDown)
            .input('writeup', sql.Int, adj.WriteUp)
            .input('writer', sql.VarChar, adj.Writer)
            .input('addednotes', sql.VarChar, adj.entrynotes)
            .input('primarycode', sql.VarChar, adj.primarycode)
            .input('subBy', sql.VarChar, adj.submittedBy)
            .input('entrydate', sql.Date, currDateTime.toLocaleDateString())
           // .input('submittedby', sql.Date, adj.AdjDate)
            .query(`INSERT INTO [NEFCO_DW].[dbo].[InventoryAdjustmentDEV] ([SVMC], [AdjDate], [Writer], [InternalNotes], [ValidAdj], [LedgerID], [ProductID], [ProductDesc1], [BuyLine], [ProdStatus], [LocationType], [Qty]
                   ,[COGS], [ExtendedCOGS], [GlProductType], [BranchID], [WhseLoc], [LastUpdate], [PriceLine], [WeekNum], [WriteDown], [WriteUp], [WDCOGS], [WUCOGS], [EntryCategoryID], [EntryPrimaryCode], [EntryNotes], [EntryUpdatedBy], [EntryUpdateDate], [IsDelete], [EntryDateSubmitted], [EntrySubmittedBy], [ManagerReviewed]) 
                    OUTPUT inserted.*
                    VALUES (@svmc, @datesubmitted, @writer, @internalnotes, @validadj, @ledgerid, @prodid, @proddesc, @buyline, @prodstatus, @locationtype, @qty, @cogs
                        , @excogs, @prodtype, @branchid, @whseloc, @lastupdated, @priceline, @weeknum, @writedown, @writeup, @wdcogs, @wucogs, '5', @primarycode, @addednotes, @subBy, @entrydate, 'N', @entrydate, @subBy, 'N')`);

        //const insertedADJ = primaryInsert.recordset[0];

        //const sql = `SELECT TOP (10) ID, PN, POST_DATE, EXTENDED_COGS, PROD_DESC, UNIT_COST, QTY, ADJ_COMMENT, BR FROM [NEFCO_DW].[dbo].[Inventory_Adjustment]`
        //const result = await pool.request().query(sql);

        console.log(`inventory management - inserted adj ${adj.SVMC}` + '-' + `${adj.LedgerID}`);

        response.status(200).send('ok');

    }
    catch (error) {
        console.log(error);
        response.status(500).send(error.message);
    }
})

// update reviewed adjustments
router.route('/validadjustments').put(async (request, response, next) => {
    try {
        const pool = await poolPromise;
        const adj = request.body;
        const currDateTime = new Date();

        await pool.request()
            .input('addednotes', sql.VarChar, adj.entrynotes)
            .input('primarycode', sql.VarChar, adj.primarycode)
            .input('subBy', sql.VarChar, adj.submittedBy)
            .input('isDelete', sql.VarChar, adj.isDelete)
            .input('managerreview', sql.VarChar, adj.managerreview)
            .input('entrydate', sql.Date, currDateTime.toLocaleDateString())
            // .input('submittedby', sql.Date, adj.AdjDate)
            .query(`UPDATE [NEFCO_DW].[dbo].[InventoryAdjustmentDEV] 
                    SET EntryPrimaryCode = @primarycode, EntryNotes = @addednotes, EntryUpdateDate = @entrydate, EntryUpdatedBy = @subBy, IsDelete = @isDelete, ManagerReviewed = @managerreview
                    WHERE EntryID = ${adj.EntryID}`);

        //const insertedADJ = primaryInsert.recordset[0];

        //const sql = `SELECT TOP (10) ID, PN, POST_DATE, EXTENDED_COGS, PROD_DESC, UNIT_COST, QTY, ADJ_COMMENT, BR FROM [NEFCO_DW].[dbo].[Inventory_Adjustment]`
        //const result = await pool.request().query(sql);

        console.log(`inventory management - updated reviewed adjustment entryid - ${adj.EntryID}`);

        response.status(200).send('ok');

    }
    catch (error) {
        console.log(error);
        response.status(500).send(error.message);
    }
})

// all adjustments initial view !!CHANGE TOP(100)!!
router.route('/adjustments').get(async (request, response, next) => {
    try {
        const pool = await poolPromise;
        const sql = `SELECT TOP(100) * FROM [NEFCO_ECL].[dbo].[vw_Valid_Adjustments] ORDER BY AdjDate DESC`
        const oldSQL = `SELECT TOP(150) [SVMC], V.[AdjDate], V.[Writer], V.[InternalNotes], V.[ValidAdj], V.[LedgerID], V.[ProductID]
        ,V.[ProductDesc1], [BuyLine], [ProdStatus], [LocationType], [Qty], [COGS], V.[ExtendedCOGS], [GlProductType], [BranchID], [WhseLoc]
        ,[LastUpdateBy]
        ,[LastUpdate]
        ,[PriceLine]
        ,[WeekNum]
        ,[WriteDown]
        ,[WriteUp]
        ,[WDCOGS]
        ,[WUCOGS]
        FROM [NEFCO_ECL].[dbo].[vw_Valid_Adjustments] V
        INNER JOIN (SELECT [AdjDate]
            ,[Writer]
            ,[InternalNotes]
            ,[ValidAdj]
            ,[LedgerID]
            ,[ProductID]
            ,[ProductDesc1]
            ,SUM([ExtendedCOGS]) AS 'ExtendedCOGS'     
        FROM [NEFCO_ECL].[dbo].[vw_Valid_Adjustments]
        WHERE AdjDate = (CAST(GETDATE() AS DATE))
        GROUP BY [AdjDate]
            ,[Writer]
            ,[InternalNotes]
            ,[ValidAdj]
            ,[LedgerID]
            ,[ProductID]
            ,[ProductDesc1]
        HAVING SUM([ExtendedCOGS]) != 0) N ON V.LedgerID = N.LedgerID AND V.ProductID = N.ProductID`

        const oldSQL2 = `SELECT TOP(150)  A.[SVMC]
		        ,A.[AdjDate]
		        ,A.[Writer]
		        ,A.[InternalNotes]
		        ,A.[ValidAdj]
		        ,A.[LedgerID]
		        ,A.[ProductID]
                ,A.[ProductDesc1]
		        ,A.[BuyLine]
		        ,A.[ProdStatus]
		        ,A.[LocationType]
		        ,A.[Qty]
		        ,A.[COGS]
		        ,A.[ExtendedCOGS]
		        ,A.[GlProductType]
		        ,A.[BranchID]
		        ,A.[WhseLoc]
                ,A.[LastUpdateBy]
                ,A.[LastUpdate]
                ,A.[PriceLine]
                ,A.[WeekNum]
                ,A.[WriteDown]
                ,A.[WriteUp]
                ,A.[WDCOGS]
                ,A.[WUCOGS]
 
        FROM
 
        (
        SELECT   [SVMC]
		        ,V.[AdjDate]
		        ,V.[Writer]
		        ,V.[InternalNotes]
		        ,V.[ValidAdj]
		        ,V.[LedgerID]
		        ,V.[ProductID]
                ,V.[ProductDesc1]
		        ,[BuyLine]
		        ,[ProdStatus]
		        ,[LocationType]
		        ,[Qty]
		        ,[COGS]
		        ,V.[ExtendedCOGS]
		        ,[GlProductType]
		        ,[BranchID]
		        ,[WhseLoc]
                ,[LastUpdateBy]
                ,[LastUpdate]
                ,[PriceLine]
                ,[WeekNum]
                ,[WriteDown]
                ,[WriteUp]
                ,[WDCOGS]
                ,[WUCOGS]
                FROM [NEFCO_ECL].[dbo].[vw_Valid_Adjustments] V
                INNER JOIN 
		        (SELECT [AdjDate]
                    ,[Writer]
                    ,[InternalNotes]
                    ,[ValidAdj]
                    ,[LedgerID]
                    ,[ProductID]
                    ,[ProductDesc1]
                    ,SUM([ExtendedCOGS]) AS 'ExtendedCOGS'     
                FROM [NEFCO_ECL].[dbo].[vw_Valid_Adjustments]
		        WHERE AdjDate = (CAST(GETDATE() AS DATE))
                GROUP BY [AdjDate]
                    ,[Writer]
                    ,[InternalNotes]
                    ,[ValidAdj]
                    ,[LedgerID]
                    ,[ProductID]
                    ,[ProductDesc1]
                HAVING SUM([ExtendedCOGS]) != 0) 
		        N ON V.LedgerID = N.LedgerID AND V.ProductID = N.ProductID
        ) A
        LEFT JOIN 
        (SELECT [SVMC]
              ,[AdjDate]
              ,[Writer]
              ,[InternalNotes]
              ,[ValidAdj]
              ,[LedgerID]
              ,[ProductID]
              ,[ProductDesc1]
              ,[BuyLine]
              ,[ProdStatus]
              ,[LocationType]
              ,[Qty]
              ,[COGS]
              ,[ExtendedCOGS]
              ,[GlProductType]
              ,[BranchID]
              ,[WhseLoc]
              ,[LastUpdateBy]
              ,[LastUpdate]
              ,[PriceLine]
              ,[WeekNum]
              ,[WriteDown]
              ,[WriteUp]
              ,[WDCOGS]
              ,[WUCOGS]
              ,[EntryCategoryID]
              ,[EntryPrimaryCode]
              ,[EntryNotes]
              ,[EntryUpdatedBy]
              ,[EntryUpdateDate]
              ,[EntryID]
              ,[IsDelete]
              ,[EntryDateSubmitted]
              ,[EntrySubmittedBy]
              ,[ManagerReviewed]
          FROM [NEFCO_DW].[dbo].[InventoryAdjustmentDEV]
        ) R ON A.SVMC = R.SVMC AND A.LedgerID = R.LedgerID
        WHERE R.LedgerID IS NULL AND R.SVMC IS NULL`

        const oldSQL3 = `SELECT TOP(150)  A.[SVMC]
		        ,A.[AdjDate]
		        ,A.[Writer]
		        ,A.[InternalNotes]
		        ,A.[ValidAdj]
		        ,A.[LedgerID]
		        ,A.[ProductID]
                ,A.[ProductDesc1]
		        ,A.[BuyLine]
		        ,A.[ProdStatus]
		        ,A.[LocationType]
		        ,A.[Qty]
		        ,A.[COGS]
		        ,A.[ExtendedCOGS]
		        ,A.[GlProductType]
		        ,A.[BranchID]
		        ,A.[WhseLoc]
                ,A.[LastUpdateBy]
                ,A.[LastUpdate]
                ,A.[PriceLine]
                ,A.[WeekNum]
                ,A.[WriteDown]
                ,A.[WriteUp]
                ,A.[WDCOGS]
                ,A.[WUCOGS]
        FROM
        (
        SELECT   [SVMC]
		        ,V.[AdjDate]
		        ,V.[Writer]
		        ,V.[InternalNotes]
		        ,V.[ValidAdj]
		        ,V.[LedgerID]
		        ,V.[ProductID]
                ,V.[ProductDesc1]
		        ,[BuyLine]
		        ,[ProdStatus]
		        ,[LocationType]
		        ,[Qty]
		        ,[COGS]
		        ,V.[ExtendedCOGS]
		        ,[GlProductType]
		        ,[BranchID]
		        ,[WhseLoc]
                ,[LastUpdateBy]
                ,[LastUpdate]
                ,[PriceLine]
                ,[WeekNum]
                ,[WriteDown]
                ,[WriteUp]
                ,[WDCOGS]
                ,[WUCOGS]
                FROM [NEFCO_ECL].[dbo].[vw_Valid_Adjustments] V
                INNER JOIN 
		        (SELECT [AdjDate]
                    ,[Writer]
                    ,[InternalNotes]
                    ,[ValidAdj]
                    ,[LedgerID]
                    ,[ProductID]
                    ,[ProductDesc1]
                    ,SUM([ExtendedCOGS]) AS 'ExtendedCOGS'     
                FROM [NEFCO_ECL].[dbo].[vw_Valid_Adjustments]
		        WHERE AdjDate = (CAST(GETDATE() AS DATE))
                GROUP BY [AdjDate]
                    ,[Writer]
                    ,[InternalNotes]
                    ,[ValidAdj]
                    ,[LedgerID]
                    ,[ProductID]
                    ,[ProductDesc1]
                HAVING SUM([ExtendedCOGS]) != 0) 
		        N ON V.LedgerID = N.LedgerID AND V.ProductID = N.ProductID
        ) A
        LEFT JOIN 
        (SELECT [SVMC]
              ,[AdjDate]
              ,[Writer]
              ,[InternalNotes]
              ,[ValidAdj]
              ,[LedgerID]
              ,[ProductID]
              ,[ProductDesc1]
              ,[BuyLine]
              ,[ProdStatus]
              ,[LocationType]
              ,[Qty]
              ,[COGS]
              ,[ExtendedCOGS]
              ,[GlProductType]
              ,[BranchID]
              ,[WhseLoc]
              ,[LastUpdateBy]
              ,[LastUpdate]
              ,[PriceLine]
              ,[WeekNum]
              ,[WriteDown]
              ,[WriteUp]
              ,[WDCOGS]
              ,[WUCOGS]
              ,[EntryCategoryID]
              ,[EntryPrimaryCode]
              ,[EntryNotes]
              ,[EntryUpdatedBy]
              ,[EntryUpdateDate]
              ,[EntryID]
              ,[IsDelete]
              ,[EntryDateSubmitted]
              ,[EntrySubmittedBy]
              ,[ManagerReviewed]
          FROM [NEFCO_DW].[dbo].[InventoryAdjustmentDEV]
        ) R ON A.SVMC = R.SVMC AND A.LedgerID = R.LedgerID
        WHERE R.LedgerID IS NULL AND R.SVMC IS NULL AND A.[InternalNotes] != '** Product Merging **'`

        const updatedSQL = `SELECT [SVMC]
      ,[AdjDate]
      ,[Writer]
      ,[InternalNotes]
      ,[ValidAdj]
      ,[LedgerID]
      ,[ProductID]
      ,[ProductDesc1]
      ,[BuyLine]
      ,[ProdStatus]
      ,[LocationType]
      ,[Qty]
      ,[COGS]
      ,[ExtendedCOGS]
      ,[GlProductType]
      ,[BranchID]
      ,[WhseLoc]
      ,[LastUpdateBy]
      ,[LastUpdate]
      ,[PriceLine]
      ,[WeekNum]
      ,[WriteDown]
      ,[WriteUp]
      ,[WDCOGS]
      ,[WUCOGS]
      ,[AdjustmentStatus]
      ,[EntryID]
      ,[EntryCategoryID]
      ,[CategoryDesc]
      ,[EntryPrimaryCode]
      ,[PrimaryDesc]
      ,[EntryNotes]
      ,[EntryUpdatedBy]
      ,[EntryUpdateDate]
      ,[IsDelete]
      ,[EntryDateSubmitted]
      ,[EntrySubmittedBy]
      ,[ManagerReviewed]
  FROM [dbo].[vwValidAdjustmentsComplete]
  WHERE [AdjustmentStatus] = 'Needs Review' AND [AdjDate] = DATEADD(day, -1, CAST(GETDATE() AS date))`
       
        const result = await pool.request().query(updatedSQL);

        console.log(`inventory management - fetching all adjustment tickets`);

        result.recordset.forEach(function (adj) {
            adj.AdjDate = adj.AdjDate.toLocaleDateString();
        })

        response.status(200).send(result.recordset);

    }
    catch (error) {
        console.log(error);
        response.status(500).send(error.message);
    }
})

// reviewed adjustments initial view
router.route('/reviewedadjustments').get(async (request, response, next) => {
    try {
        const pool = await poolPromise;
        const oldSQL = `SELECT * FROM [NEFCO_DW].[dbo].[vwInventoryAdjustmentDEV] WHERE IsDelete = 'N'`

        const updatedSQL = `SELECT [SVMC]
      ,[AdjDate]
      ,[Writer]
      ,[InternalNotes]
      ,[ValidAdj]
      ,[LedgerID]
      ,[ProductID]
      ,[ProductDesc1]
      ,[BuyLine]
      ,[ProdStatus]
      ,[LocationType]
      ,[Qty]
      ,[COGS]
      ,[ExtendedCOGS]
      ,[GlProductType]
      ,[BranchID]
      ,[WhseLoc]
      ,[LastUpdateBy]
      ,[LastUpdate]
      ,[PriceLine]
      ,[WeekNum]
      ,[WriteDown]
      ,[WriteUp]
      ,[WDCOGS]
      ,[WUCOGS]
      ,[AdjustmentStatus]
      ,[EntryID]
      ,[EntryCategoryID]
      ,[CategoryDesc]
      ,[EntryPrimaryCode]
      ,[PrimaryDesc]
      ,[EntryNotes]
      ,[EntryUpdatedBy]
      ,[EntryUpdateDate]
      ,[IsDelete]
      ,[EntryDateSubmitted]
      ,[EntrySubmittedBy]
      ,[ManagerReviewed]
  FROM [dbo].[vwValidAdjustmentsComplete]
  WHERE [AdjustmentStatus] = 'Reviewed' AND [AdjDate] = DATEADD(day, -1, CAST(GETDATE() AS date))`

       
        const result = await pool.request().query(updatedSQL);

        console.log(`inventory management - fetching all reviewed adjustment tickets`);

        result.recordset.forEach(function (adj) {
            adj.AdjDate = adj.AdjDate.toLocaleDateString();
        })

        response.status(200).send(result.recordset);

    }
    catch (error) {
        console.log(error);
        response.status(500).send(error.message);
    }
})

// reviewed adjustments initial view
router.route('/managerreviewed').get(async (request, response, next) => {
    try {
        const pool = await poolPromise;
        const sql = `SELECT * FROM [NEFCO_DW].[dbo].[InventoryAdjustmentDEV] WHERE ManagerReviewed = 'Y' & IsDelete = 'N'`
        const result = await pool.request().query(sql);

        console.log(`inventory management - fetching all reviewed adjustment tickets`);

        result.recordset.forEach(function (adj) {
            adj.AdjDate = adj.AdjDate.toLocaleDateString();
        })

        response.status(200).send(result.recordset);

    }
    catch (error) {
        console.log(error);
        response.status(500).send(error.message);
    }
})

// codes search
router.route('/codes').get(async (request, response, next) => {
    try {
        const pool = await poolPromise;
        const codeSQL = `SELECT ID, Primary_Code + ' - ' + Primary_Desc AS name, Parent_ID FROM dbo.Errors_PrimaryCodes 
            WHERE Parent_ID = 5
            ORDER BY ID ASC`;
        const codeResult = await pool.request().query(codeSQL);

        response.status(200).send(codeResult.recordset);
        //console.log(codeResult.recordset);

    }
    catch (error) {
        console.log(error);
        //next(error);
    }
})

router.route('/employees').get(async (request, response, next) => {
    try {
        const pool = await poolPromise;
        const sql = `SELECT [Name], [Department], [Eclipse_ID], [ShowOnList], [InvAdjList] FROM [dbo].[Employee] WHERE [InvAdjList] = 'Y' ORDER BY [Eclipse_ID] ASC`;
        const result = await pool.request().query(sql);

        response.json(result.recordset);
    }
    catch (error) {
        console.log(error);
    }
})

//get product by part num
router.route('/product/:pID').get(async (request, response) => {
    try {
        const pool = await poolPromise;
        
        const result = await pool.request()
            .input('input_param', sql.VarChar, request.params.pID)
            .query(`SELECT ID, PN, POST_DATE, EXTENDED_COGS, PROD_DESC, UNIT_COST, QTY, ADJ_COMMENT, BR FROM [NEFCO_DW].[dbo].[Inventory_Adjustment]
                WHERE ID = @input_param`)
        const prod = result.recordset;
        
        //console.log(part);
        response.json(prod);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
})



module.exports = router;