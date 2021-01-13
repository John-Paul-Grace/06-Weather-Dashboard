// jQuery ready method
$(document).ready(function() {

    // addCity() accepts a string as a parameter. It makes a new entry in #city-list for the parameter.
    function addCity(newCity) {

        var newCityEl = $("<li>").addClass("list-group-item");

        newCityEl.text(newCity);

        $("#city-list").append(newCityEl);
    }

    addCity("Atlanta");
});