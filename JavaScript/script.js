// jQuery ready method
$(document).ready(function() {

    // addCity() accepts a string as a parameter. It makes a new entry in #city-list for the parameter.
    function addCity(newCity) {

        // creates a new element that has the Bootstrap "list-group-item" class
        var newCityEl = $("<button>").addClass("list-group-item");

        // makes the parameter string the text of the new element
        newCityEl.text(newCity);

        // appends the new element to the city list
        $("#city-list").append(newCityEl);
    }

    // click listener for the #city-submit button
    $("#city-submit").on("click", function(event) {

        // prevents refreshing on click
        event.preventDefault();

        // sets the value of #city-search to a variable
        var userInput = $("#city-search").val();

        // runs the addCity() method with the above variable as input
        addCity(userInput);
    });

    // DELETE LATER
    //=================================================================
    addCity("Atlanta");
    addCity("New York");
    addCity("Los Angeles");
    //=================================================================
});