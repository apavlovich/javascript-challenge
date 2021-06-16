// from data.js
var tableData = data;

// YOUR CODE HERE!

//test that data.js is working in the console in the HTML page

console.log(tableData);

//create references

var $tbody = d3.select("tbody");
var button = d3.select("#filter-btn");
var inputFieldDate = d3.select("#datetime");
var inputFieldCity = d3.select("#city");
var inputFieldState = d3.select("#state");
var inputFieldCountry = d3.select("#country");
var inputFieldShape = d3.select("#shape");
var columns = ["datetime", "city", "state", "country", "shape", "durationMinutes", "comments"]

//input data into the html
var addData = (dataInput) => {
    dataInput.forEach(ufoSightings => {
        var row = $tbody.append("tr");
        columns.forEach(column => row.append("td").text(ufoSightings[column])
        )
    });
}

addData(tableData);

button.on("click", () => {
    d3.event.preventDefault();

    var inputDate = inputFieldDate.property("value").trim();
    var inputCity = inputFieldCity.property("value").toLowerCase().trim();
    var inputState = inputFieldState.property("value").toLowerCase().trim();
    var inputCountry = inputFieldCountry.property("value").toLowerCase().trim();
    var inputShape = inputFieldShape.property("value").toLowerCase().trim();

    var filterDate = tableData.filter(tableData => tableData.datetime === inputDate);
    var filterCity = tableData.fitler(tableData => tableData.city === inputCity);
    var filterState = tableData.filter(tableData => tableData.state === inputState);
    var filterCountry = tableData.filter(tableData => tableData.country === inputCountry);
    var filterShape = tableData.filter(tableData => tableData.shape === inputShape);

    var filterCombinedData = tableData.filter(tableData => tableData.datetime === inputDate && tableData.city === inputCity && tableData.state === inputState && tableData.country === inputCountry && tableData.shape === inputShape);

    $tbody.html("");
    let response = {
        filterDate, filterCity, filterState, filterCountry, filterShape, filterCombinedData
    }
    if(response.filterCombinedData.length !== 0) {
        addData(filterCombinedData);
    }
        else if(response.filterCombinedData.length == 0 && ((response.filterDate.length !== 0 || response.filterCity.length !== 0 || response.filterState.length !== 0 || response.filterCountry.length !== 0 || response.filterShape.length !== 0))) {
            addData(filterDate) || addData(filterCity) || addData(filterState) || addData(filterCountry) || addData(filterShape);
        }
        else {
            $tbody.append("tr").append("td").text("None Found.. Try Again");
        }
})