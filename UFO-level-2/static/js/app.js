// from data.js
var tableData = data;
var tableMatch = null;

// set the reference to the table body and initialize filter flag
var $tbody = d3.select("tbody");
var filtered = 0;
var columns = ["datetime", "city", "state", "country", "shape", "durationMinutes", "comments"]

// fill in full table by default
var addData = (dataInput) => {
    dataInput.forEach(ufoSightings => {
        var row = $tbody.append("tr");
        columns.forEach(column => row.append("td").text(ufoSightings[column])
        )
    });
}

addData(tableData);

// define references to fields and buttons
var dateField = d3.select("#datetime");
var cityField = d3.select("#city");
var stateField = d3.select("#state");
var countryField = d3.select("#country");
var shapeField = d3.select("#shape");
var button = d3.select("#filter-btn");

// filter the table by properties
function filterObs(){
   
    d3.event.preventDefault();
    // flag that table is filtered
    filtered = 1;

    //set values
    var userDate = dateField.property("value");
    var userCity = cityField.property("value").toLowerCase();
    var userState = stateField.property("value").toLowerCase();
    var userCountry = countryField.property("value").toLowerCase();
    var userShape = shapeField.property("value").toLowerCase();

    //only filter if user entered a value
    if(userDate || userCity || userState || userCountry || userShape){
        filtered = 1;

        //use only conditions where values are entered
        var userArray = [["datetime", userDate], ["city", userCity], ["state", userState], ["country", userCountry], ["shape", userShape]];
        var existingArray = userArray.filter(user => user[1] !== "");
        var condition = existingArray.map(arr => "obs." + arr[0] + " == " + "'" + arr[1] + "'").join(" && ");

        tableMatch = tableData.filter(obs => eval(condition));

        $tbody.html("");

        //fill in obs
        tableMatch.forEach(row => {
            $tbody.append("tr");
                    
            for (key in row){
                const cell = $tbody.append("td");
                cell.text(row[key]);
            }
        });
    }
        else {
            $tbody.append("tr").append("td").text("None Found.. Try Again");
}}

// return full table or filtered table
function tableReturned(filtered_val){
    if (filtered_val){
        return tableMatch;
    } else {
        return tableData;
    }
}

// run filterObs function if Enter key is pressed
function enterFilterObs(){
    if (d3.event.keyCode == 13){
        filterObs();
    }
}

// define what happens when user clicks the button
button.on("click", filterObs);

//allow user to hit enter instead of clicking "filter table"
d3.selectAll(".form-control").on("keyup",enterFilterObs);


