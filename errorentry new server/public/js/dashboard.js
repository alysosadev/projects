var testBlock = document.getElementById('testInfo');


async function getTickets() {
    let errorCatURL = "http://localhost:3000/api/test/tickets"

    try {
        const mainCategories = await fetch(errorCatURL);
        return mainCategories.json();
    }
    catch (err) {
        console.log(err);
    }
}




$(async function () {
    var testBlock = document.getElementById('testInfo');
    var testTickets = await getTickets();

    testBlock.innerHTML = `On doc load api call returned ${testTickets.length} tickets`;

    console.log(testTickets)
})