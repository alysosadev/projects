var $table = $('#inventory_table');
var currentFilterURL = '';

document.querySelectorAll(".pill").forEach(pill => {
    pill.addEventListener("click", () => {
        document.querySelectorAll(".pill--selected").forEach(selected => {
            selected.classList.remove("pill--selected");
        });
        pill.classList.add("pill--selected");

        if (pill.value === '2') {
            initTable();
        }
        else if (pill.value === '3') {
            // edit + delete button formatter
            function crudFormatter(value, row, index) {
                //console.log(row)
                return [
                    `<button type='submit' id='editTicket' class='button--edit' data-bs-ticket='${row.PN}'>Edit</button>`
                ].join('')
            }

            function priceFormatter(value) {
                let USDollar = new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'USD',
                });

                return USDollar.format(value);
            }


            //edit listener    
            var crudEvents = {
                'click #editTicket': function (e, value, row, index) {
                    //console.log(row);

                    editReviewedAdjustment(row);
                }
            }
            $table.on('check.bs.table uncheck.bs.table' +
                'check-all.bs.table uncheck-all.bs.table',
                function () {
                    $remove.prop('disabled', !$table.bootstrapTable('getSelections').length)
                    selections = getIdSelections()
                }
            )
            $table.on('all.bs.table', function (e, name, args) {
                console.log(name, args);
            })

            $table.bootstrapTable('destroy').bootstrapTable({
                columns: [
                    [
                        {
                            title: 'Product ID',
                            field: 'ProductID',
                            align: 'center',
                            valign: 'middle',
                            rowspan: 2,
                            sortable: true
                        },
                        {
                            title: 'Adjustment Details',
                            colspan: 10,
                            align: 'center'
                        }
                    ],
                    [
                        {
                            title: 'Post Date',
                            field: 'AdjDate',
                            align: 'center',
                            sortable: true
                        },
                        {
                            title: 'ADJ Comments',
                            field: 'InternalNotes',
                            align: 'center',
                            sortable: true
                        },
                        {
                            title: 'Ledger ID',
                            field: 'LedgerID',
                            align: 'center',
                            sortable: true
                        },
                        {
                            title: 'Branch ID',
                            field: 'BranchID',
                            align: 'center',
                            sortable: true
                        },
                        {
                            title: 'Description',
                            field: 'ProductDesc1',
                            align: 'center',
                            sortable: true
                        },
                        {
                            title: 'Quantity',
                            field: 'Qty',
                            align: 'center',
                            sortable: true
                        },
                        {
                            title: 'Extended Cogs',
                            field: 'ExtendedCOGS',
                            align: 'center',
                            sortable: true,
                            formatter: priceFormatter
                        },
                        {
                            title: 'Location',
                            field: 'WhseLoc',
                            align: 'center',
                            sortable: true
                        },
                        {
                            title: 'Primary Code',
                            field: 'PrimaryDesc',
                            align: 'center',
                            sortable: true
                        },
                        {
                            title: 'Action',
                            field: 'tableAction',
                            align: 'center',
                            clickToSelect: false,
                            events: crudEvents,
                            formatter: crudFormatter
                        }
                    ]
                ]
            }).bootstrapTable('refreshOptions', {
                url: `http://192.1.0.105:6969/api/inventory/reviewedadjustments`
            });
        }

        else if (pill.value === '4') {
            // edit + delete button formatter
            function crudFormatter(value, row, index) {
                //console.log(row)
                return [
                    `<button type='submit' id='editTicket' class='button--edit' data-bs-ticket='${row.PN}'>Edit</button>`
                ].join('')
            }

            function priceFormatter(value) {
                let USDollar = new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'USD',
                });

                return USDollar.format(value);
            }


            //edit listener    
            var crudEvents = {
                'click #editTicket': function (e, value, row, index) {
                    //console.log(row);

                    editReviewedAdjustment(row);
                }
            }
            $table.on('check.bs.table uncheck.bs.table' +
                'check-all.bs.table uncheck-all.bs.table',
                function () {
                    $remove.prop('disabled', !$table.bootstrapTable('getSelections').length)
                    selections = getIdSelections()
                }
            )
            $table.on('all.bs.table', function (e, name, args) {
                console.log(name, args);
            })

            $table.bootstrapTable('destroy').bootstrapTable({
                columns: [
                    [
                        {
                            title: 'Product ID',
                            field: 'ProductID',
                            align: 'center',
                            valign: 'middle',
                            rowspan: 2,
                            sortable: true
                        },
                        {
                            title: 'Adjustment Details',
                            colspan: 10,
                            align: 'center'
                        }
                    ],
                    [
                        {
                            title: 'Post Date',
                            field: 'AdjDate',
                            align: 'center',
                            sortable: true
                        },
                        {
                            title: 'ADJ Comments',
                            field: 'InternalNotes',
                            align: 'center',
                            sortable: true
                        },
                        {
                            title: 'Ledger ID',
                            field: 'LedgerID',
                            align: 'center',
                            sortable: true
                        },
                        {
                            title: 'Branch ID',
                            field: 'BranchID',
                            align: 'center',
                            sortable: true
                        },
                        {
                            title: 'Description',
                            field: 'ProductDesc1',
                            align: 'center',
                            sortable: true
                        },
                        {
                            title: 'Quantity',
                            field: 'Qty',
                            align: 'center',
                            sortable: true
                        },
                        {
                            title: 'Extended Cogs',
                            field: 'ExtendedCOGS',
                            align: 'center',
                            sortable: true,
                            formatter: priceFormatter
                        },
                        {
                            title: 'Location',
                            field: 'WhseLoc',
                            align: 'center',
                            sortable: true
                        },
                        {
                            title: 'Primary Code',
                            field: 'PrimaryDesc',
                            align: 'center',
                            sortable: true
                        },
                        {
                            title: 'Action',
                            field: 'tableAction',
                            align: 'center',
                            clickToSelect: false,
                            events: crudEvents,
                            formatter: crudFormatter
                        }
                    ]
                ]
            }).bootstrapTable('refreshOptions', {
                url: `http://192.1.0.105:6969/api/inventory/managerreviewed`
            });
        }

    });
});

function initTable() {
    // edit + delete button formatter
    function crudFormatter(value, row, index) {
        //console.log(row)
        //let uID = `${row.SVMC}` + '-' + `${row.LedgerID}`
        return [
            `<button type='submit' id='editTicket' class='button--edit' data-bs-ticket='${row.PN}'>Edit</button>`
        ].join('')
    }

    function priceFormatter(value) {
        let USDollar = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        });

        return USDollar.format(value);
    }

    //edit listener    

    var crudEvents = {
        'click #editTicket': function (e, value, row, index) {
            console.log(row);

            editAdjustment(row);
        }
    }

    $table.bootstrapTable('destroy').bootstrapTable({
        url: `http://192.1.0.105:6969/api/inventory/adjustments`,
        columns: [
            [
                {
                    title: 'Product ID',
                    field: 'ProductID',
                    align: 'center',
                    valign: 'middle',
                    rowspan: 2,
                    sortable: true
                },
                {
                    title: 'Adjustment Details',
                    colspan: 10,
                    align: 'center'
                }
            ],
            [
                {
                    title: 'Post Date',
                    field: 'AdjDate',
                    align: 'center',
                    sortable: true
                },
                {
                    title: 'Buy Line',
                    field: 'BuyLine',
                    align: 'center',
                    sortable: true
                },
                {
                    title: 'GL Prod Type',
                    field: 'GlProductType',
                    align: 'center',
                    sortable: true
                },
                {
                    title: 'ADJ Comments',
                    field: 'InternalNotes',
                    align: 'center',
                    sortable: true
                },
                {
                    title: 'Ledger ID',
                    field: 'LedgerID',
                    align: 'center',
                    sortable: true
                },
                {
                    title: 'Branch ID',
                    field: 'BranchID',
                    align: 'center',
                    sortable: true
                },
                {
                    title: 'Extended Cogs',
                    field: 'ExtendedCOGS',
                    align: 'center',
                    sortable: true,
                    formatter: priceFormatter
                },
                {
                    title: 'Location Type',
                    field: 'LocationType',
                    align: 'center',
                    sortable: true
                },
                {
                    title: 'Product Status',
                    field: 'ProdStatus',
                    align: 'center',
                    sortable: true
                },
                {
                    title: 'Action',
                    field: 'tableAction',
                    align: 'center',
                    clickToSelect: false,
                    events: crudEvents,
                    formatter: crudFormatter
                }
            ]
        ]
    })

    $table.on('check.bs.table uncheck.bs.table' +
        'check-all.bs.table uncheck-all.bs.table',
        function () {
            $remove.prop('disabled', !$table.bootstrapTable('getSelections').length)
            selections = getIdSelections()
        }
    )
    $table.on('all.bs.table', function (e, name, args) {
        console.log(name, args);
    })
}

// all adjustments search
$('#adjustmentForm').on('submit', async function (e) {
    e.preventDefault();

    let data = buildTicketData(this);
    let data_url = `startDate=${data.startDate}&endDate=${data.endDate}&writer=${data.writer}&buyline=${data.buyline}&priceline=${data.priceline}&productid=${data.productid}&ledgerid=${data.ledgerid}&glproducttype=${data.glproducttype}&branchid=${data.branchid}&locationtype=${data.locationtype}&prodstatus=${data.prodstatus}&cogsgreater=${data.cogsgreater}&cogslesser=${data.cogslesser}`
    let adjURL = 'http://192.1.0.105:6969/api/inventory/allAdjustments?' + data_url;
    currentFilterURL = adjURL;
    //console.log(data);
    try {
        console.log('loading adjustments...')

        $('#adjustmentSearchModal').modal('hide');
   
        $table.bootstrapTable('refreshOptions', {
            url: adjURL
        })

        //console.log(adjResult);
    }
    catch (err) {
        console.log(err)
    }
})

// reviewed adjustments search
$('#reviewedAdjustmentForm').on('submit', async function (e) {
    e.preventDefault();

    let data = buildTicketData(this);
    let data_url = `startDate=${data.startDate}&endDate=${data.endDate}&writer=${data.writer}&buyline=${data.buyline}&priceline=${data.priceline}&productid=${data.productid}&ledgerid=${data.ledgerid}&glproducttype=${data.glproducttype}&branchid=${data.branchid}&locationtype=${data.locationtype}&prodstatus=${data.prodstatus}&cogsgreater=${data.cogsgreater}&cogslesser=${data.cogslesser}&isDelete=${data.isDelete}&managerreview=${data.managerreview}`
    let adjURL = 'http://192.1.0.105:6969/api/inventory/reviewAllAdjustments?' + data_url;

    currentFilterURL = adjURL;
    //console.log(data);
    try {
        console.log('loading reviewed adjustments')

        $('#reviewedAdjustmentSearchModal').modal('hide');

        $table.bootstrapTable('refreshOptions', {
            url: adjURL
        })

        //console.log(adjResult);
    }
    catch (err) {
        console.log(err)
    }
})



// edit ticket event listener for when edit ticket button is pressed
var ticketModal = document.getElementById('editInventoryProductModal');
var modal = new bootstrap.Modal(ticketModal);
var adjForm = document.getElementById('inventoryProductForm');
var reviewedForm = document.getElementById('reviewedProductForm')

function buildTicketData(form) {
    const ticketData = {};

    for (const pair of new FormData(form)) {
        ticketData[pair[0]] = pair[1];

    }
    return ticketData;
}

async function postAdjustment(url, body) {
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify(body)
    };

    // ADD CUSTOM ERROR CLASSES HERE
    const response = await fetch(url, options);
    if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
    }
    return response;

}

async function updateAdjustment(url, body) {
    const options = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify(body)
    };

    // ADD CUSTOM ERROR CLASSES HERE
    const response = await fetch(url, options);
    if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
    }
    return response;

}

async function editAdjustment(adj) {
    let uID = `${adj.SVMC}` + '-' + `${adj.LedgerID}`
    console.log(`editing adjustment ${uID}`);

    //const product = await searchAdjustment(part.SVMC);

    setTimeout(() => {
        buildEditErrorModal(adj, adjForm);
    }, 500);
    
    $('#editInventoryProductModal').modal('toggle');

    // edit ticket submission event listener
    $('#inventoryProductForm').on('submit', async function (e) {
        this.submitAdjustment.disabled = true;
        e.preventDefault();
        //console.log(this.submitAdjustment);
        
        let data = buildTicketData(this);

        let productURL = 'http://192.1.0.105:6969/api/inventory/validadjustments';

        const fullAdj = { ...adj, ...data };

        //console.log(currentFilterURL);

        // check if primary code has been selected
        try {
            if (fullAdj.primarycode == 0 || fullAdj.submittedBy == 0) {
                alert("Please enter a primary code!")
            }
            else {
                let prodResponse = await postAdjustment(productURL, fullAdj);

                if (prodResponse.ok) {
                    this.submitAdjustment.disabled = false;
                    this.reset();
                    $('#editInventoryProductModal').modal('hide');
                    alert(`Adjustment ${uID} has been edited`)
                }
                /*
                setTimeout(() => {
                    window.location.assign(document.URL);
                }, 500);*/
            //console.log(prodResponse);
            }
        }
        catch (err) {
            console.log(err)
        }
        //console.log(fullAdj);
        //console.log(selectedProducts);

        

    })
}

//edit reviewed adjustments
async function editReviewedAdjustment(adj) {
    let uID = `${adj.SVMC}` + '-' + `${adj.LedgerID}`
    console.log(`editing adjustment ${uID}`);

    //const product = await searchAdjustment(part.SVMC);

    setTimeout(() => {
        buildEditErrorModal(adj, reviewedForm);
    }, 500);

    $('#reviewedProductModal').modal('toggle');

    // edit ticket submission event listener
    $('#reviewedProductForm').on('submit', async function (e) {
        this.submitAdjustment.disabled = true;
        e.preventDefault();
        let data = buildTicketData(this);

        let productURL = 'http://192.1.0.105:6969/api/inventory/validadjustments';

        const fullAdj = { ...adj, ...data };

        //console.log(currentFilterURL);

        try {
            if (fullAdj.EntryPrimaryCode == 0) {
                alert('Please enter a primary code!')
            } else {
                let prodResponse = await updateAdjustment(productURL, fullAdj);

                if (prodResponse.ok) {
                    this.submitAdjustment.disabled = false;
                    this.reset();
                    $('#reviewedProductModal').modal('hide');
                    alert(`Adjustment ${uID} has been edited`)
                }

                /*
                setTimeout(() => {
                    window.location.assign(document.URL);
                }, 500);
                setTimeout(() => {
                    $table.bootstrapTable('refreshOptions', {
                        url: currentFilterURL
                    })
                }, 550);*/
                
            }
            
            //console.log(prodResponse);
        }
        catch (err) {
            console.log(err)
        }
        //console.log(fullAdj);
        //console.log(selectedProducts);
        
    })
}


// edit error ticket modal
async function buildEditErrorModal(adjTicket, form) {

    let uID = `${adjTicket.SVMC}` + '-' + `${adjTicket.LedgerID}`
    console.log(`loading adj ${uID}`);
    //console.log(errorticket[0].PrimaryCode);

    let primarycode = form.querySelector('.primarycode-edit');
    let employeeSelect = form.querySelector('.employee-select');
    let previousnotes = form.querySelector('#previousReviewed-notes-edit');
    let updatedBy = form.querySelector('#updatedBy-edit');

    if (previousnotes) {
        previousnotes.value = adjTicket.EntryNotes;
        updatedBy.value = adjTicket.EntryUpdatedBy;
    }


    //clear selects
    $('.primarycode-edit').find('option').not(':first').remove();
    $('.employee-select').find('option').not(':first').remove();

    //error cat stuff
    try {
        const codes = await getInventoryCodes();
        const emps = await getEmployees();

        $.each(codes, function (key, val) {
            let codesOpt = new Option(val.name, val.ID);
            if(val.ID == adjTicket.EntryPrimaryCode){
                codesOpt.setAttribute('selected', true);
            }
            codesOpt.setAttribute('name', val.name);
            primarycode.appendChild(codesOpt);
            //console.log(categoryOpt);
        })
        //console.log(cats);
        $.each(emps, function (key, val) {
            let empOpt = new Option(val.Eclipse_ID, val.Eclipse_ID);

            empOpt.setAttribute('name', val.Eclipse_ID);
            employeeSelect.appendChild(empOpt);
            //console.log(empOpt);
        });
    }
    catch (err) {
        console.log(err);
    }
}

// use in case double update continues to happen.
async function searchAdjustment(pID) {
    let prodURL = "http://192.1.0.105:6969/api/inventory/product/" + pID;

    try {
        const prodInfoResponse = await fetch(prodURL);
        if (!prodInfoResponse.ok) {
            const errorMessage = await prodInfoResponse.text();
            throw (errorMessage);
        }
        return prodInfoResponse.json();
    }
    catch (err) {
        throw (err);
    }
}

async function getInventoryCodes() {
    let invCodesURL = "http://192.1.0.105:6969/api/inventory/codes"

    try {
        const maincodes = await fetch(invCodesURL);
        return maincodes.json();
    }
    catch (err) {
        console.log(err);
    }
}
async function getEmployees() {
    let employeeURL = "http://192.1.0.105:6969/api/inventory/employees";

    try {
        const employees = await fetch(employeeURL);
        return employees.json();
    }
    catch (err) {
        console.log(err);
    }
}


$(function () {
    initTable()
})
