var mainBoard = document.getElementById('customer-strat-diagram');
let regionSelect = document.getElementById('regionDropdown');



$('.subquery').on('click', function (e) {


    var filter = $(this).data('id')
    var region = regionSelect.value
    
    if (region != 0) {
        var link = 'file:///C:/Users/aly.sosa/Desktop/customer%20strat/customers.html?region=' + region + '&filter=' + filter;
        var prod_link = 'http://192.1.0.105/v2/customerstrat/customers.html?region=' + region + '&filter=' + filter;

        window.location = link
    } else {
        alert("Please select a region");
    }
    

    console.log(regionSelect.value);
})


var regionList = [{ Name: 'Distribution', Region: 'Distribution' }, { Name: 'Northeast', Region: 'Northeast' }, { Name: 'South', Region: 'South' }, { Name: 'Midwest', Region: 'Midwest' }]



$.each(regionList, function (key, val) {
    let regionOpt = new Option(val.Region, val.Region);

    regionOpt.setAttribute('name', val.Name);
    regionSelect.appendChild(regionOpt);
    //console.log(empOpt);
});



var core_list = [{ CustomerClass: 'AA', CustomerCount: 300 }, { CustomerClass: 'AB', CustomerCount: 2345 }, { CustomerClass: 'BA', CustomerCount: 323 }, { CustomerClass: 'BB', CustomerCount: 34 }];
var opportunistic_list = [{ CustomerClass: 'DA', CustomerCount: 234 }, { CustomerClass: 'CA', CustomerCount: 566 }, { CustomerClass: 'DB', CustomerCount: 24 }, { CustomerClass: 'CB', CustomerCount: 144 }];
var marginal_list = [{ CustomerClass: 'DC', CustomerCount: 32 }, { CustomerClass: 'CC', CustomerCount: 47 }, { CustomerClass: 'DD', CustomerCount: 874 }, { CustomerClass: 'CD', CustomerCount: 439 }];
var service_list = [{ CustomerClass: 'AC', CustomerCount: 632 }, { CustomerClass: 'BC', CustomerCount: 500 }, { CustomerClass: 'BD', CustomerCount: 349 }, { CustomerClass: 'AD', CustomerCount: 94 }];

var dist_cust = [{ CustomerClass: 'AA', CustomerCount: 300 }, { CustomerClass: 'AB', CustomerCount: 2345 }, { CustomerClass: 'BA', CustomerCount: 323 }, { CustomerClass: 'BB', CustomerCount: 34 }, { CustomerClass: 'DA', CustomerCount: 234 }, { CustomerClass: 'CA', CustomerCount: 566 }, { CustomerClass: 'DB', CustomerCount: 24 }, { CustomerClass: 'CB', CustomerCount: 144 },
{ CustomerClass: 'DC', CustomerCount: 32 }, { CustomerClass: 'CC', CustomerCount: 47 }, { CustomerClass: 'DD', CustomerCount: 874 }, { CustomerClass: 'CD', CustomerCount: 439 }, { CustomerClass: 'AC', CustomerCount: 632 }, { CustomerClass: 'BC', CustomerCount: 500 }, { CustomerClass: 'BD', CustomerCount: 349 }, { CustomerClass: 'AD', CustomerCount: 94 }]

var northeast_cust = [{ CustomerClass: 'AA', CustomerCount: 346 }, { CustomerClass: 'AB', CustomerCount: 235 }, { CustomerClass: 'BA', CustomerCount: 23 }, { CustomerClass: 'BB', CustomerCount: 15 }, { CustomerClass: 'DA', CustomerCount: 583 }, { CustomerClass: 'CA', CustomerCount: 321 }, { CustomerClass: 'DB', CustomerCount: 547 }, { CustomerClass: 'CB', CustomerCount: 44 },
{ CustomerClass: 'DC', CustomerCount: 324 }, { CustomerClass: 'CC', CustomerCount: 87 }, { CustomerClass: 'DD', CustomerCount: 84 }, { CustomerClass: 'CD', CustomerCount: 300 }, { CustomerClass: 'AC', CustomerCount: 262 }, { CustomerClass: 'BC', CustomerCount: 200 }, { CustomerClass: 'BD', CustomerCount: 45 }, { CustomerClass: 'AD', CustomerCount: 34 }]

var south_cust = [{ CustomerClass: 'AA', CustomerCount: 45 }, { CustomerClass: 'AB', CustomerCount: 2345 }, { CustomerClass: 'BA', CustomerCount: 323 }, { CustomerClass: 'BB', CustomerCount: 34 }, { CustomerClass: 'DA', CustomerCount: 458 }, { CustomerClass: 'CA', CustomerCount: 546 }, { CustomerClass: 'DB', CustomerCount: 567 }, { CustomerClass: 'CB', CustomerCount: 14 },
{ CustomerClass: 'DC', CustomerCount: 578 }, { CustomerClass: 'CC', CustomerCount: 679 }, { CustomerClass: 'DD', CustomerCount: 874 }, { CustomerClass: 'CD', CustomerCount: 439 }, { CustomerClass: 'AC', CustomerCount: 632 }, { CustomerClass: 'BC', CustomerCount: 345 }, { CustomerClass: 'BD', CustomerCount: 95 }, { CustomerClass: 'AD', CustomerCount: 94 }]

var midwest_cust = [{ CustomerClass: 'AA', CustomerCount: 6542 }, { CustomerClass: 'AB', CustomerCount: 456 }, { CustomerClass: 'BA', CustomerCount: 323 }, { CustomerClass: 'BB', CustomerCount: 34 }, { CustomerClass: 'DA', CustomerCount: 123 }, { CustomerClass: 'CA', CustomerCount: 585 }, { CustomerClass: 'DB', CustomerCount: 76 }, { CustomerClass: 'CB', CustomerCount: 234 },
{ CustomerClass: 'DC', CustomerCount: 455 }, { CustomerClass: 'CC', CustomerCount: 47 }, { CustomerClass: 'DD', CustomerCount: 874 }, { CustomerClass: 'CD', CustomerCount: 439 }, { CustomerClass: 'AC', CustomerCount: 45 }, { CustomerClass: 'BC', CustomerCount: 57 }, { CustomerClass: 'BD', CustomerCount: 234 }, { CustomerClass: 'AD', CustomerCount: 324 }]

const customer_strat = {
    marginalCustomers: ['DC', 'CC', 'DD', 'CD'],
    coreCustomers: ['BA', 'BB', 'AA', 'AB'],
    opportunisticCustomers: ['DA', 'CA', 'DB', 'CB'],
    serviceCustomers: ['BC', 'AC', 'BD', 'AD']
};




function loadDashboard(customerlist) {
    const result = {};
    for (const field in customer_strat) {
        result[field] = 0;
    }

    customerlist.forEach((val, index) => {
        var elem = document.getElementById(val.CustomerClass + '-count');
        elem.innerHTML = val.CustomerCount;

        for (const field in customer_strat) {
            if (customer_strat[field].includes(val.CustomerClass)) {
                result[field] += val.CustomerCount
            }
        }
    });

    var sum = customerlist.map(element => element.CustomerCount).reduce((a, b) => a + b, 0);
    var totalcust = document.getElementById('total-count');
    totalcust.innerHTML = sum;

    
    /*
    const marginal_total = customerlist.reduce((total, customer) => {
        if (marginalCustomers.includes(customer.CustomerClass)) {
            //console.log(total + customer.CustomerCount)
            return total + customer.CustomerCount;
        }
        return total;
    }, 0);

    
    
    */
    var margtotal = document.getElementById('marginal-count');
    var servicetotal = document.getElementById('service-count');
    var opportunistictotal = document.getElementById('opportunistic-count');
    var coretotal = document.getElementById('core-count');

    margtotal.innerHTML = result['marginalCustomers'];
    servicetotal.innerHTML = result['serviceCustomers'];
    opportunistictotal.innerHTML = result['opportunisticCustomers'];
    coretotal.innerHTML = result['coreCustomers'];
    console.log(result);
}

$('#regionDropdown').on('change', function (e) {


    //get customer list from api to load main dash

    if (e.currentTarget.value == 'Distribution') {
        loadDashboard(dist_cust);
    }
    else if (e.currentTarget.value == 'Northeast') {
        loadDashboard(northeast_cust);
    }
    else if (e.currentTarget.value == 'South') {
        loadDashboard(south_cust);
    }
    else if (e.currentTarget.value == 'Midwest') {
        loadDashboard(midwest_cust);
    }
    

    

    console.log(e.currentTarget.value)
})