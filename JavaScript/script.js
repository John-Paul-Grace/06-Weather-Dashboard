// jQuery ready method
$(document).ready(function() {

    // My api key. Listed here for easy changing.
    var apiKey = "42f36263a8976dc91dd8670541979682";

    // addCity() accepts a string as a parameter. It makes a new entry in #city-list for the parameter.
    function addCity(newCity) {

        // creates a new element that has the Bootstrap "list-group-item" class
        var newCityEl = $("<button>").addClass("list-group-item");

        // makes the parameter string the text of the new element
        newCityEl.text(newCity);

        // appends the new element to the city list
        $("#city-list").append(newCityEl);
    }

    // Function that runs an ajax call to get the current weather. Takes a string as a parameter.
    function currentWeather(city) {

        // Object to be used in the ajax call. URL is concatenated using the parameter string and api key.
        var ajaxInfo = {
            url: "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey,
            method: "GET"
        };

        // Ajax call to the OpenWeatherMap API to get current weather.
        $.ajax(ajaxInfo).then(function(response) {

            var unixTime = response.dt;

            unixTime *= 1000;

            var currentDate = new Date(unixTime);

            var dateString = "(" + (currentDate.getMonth() + 1) + "/"
                             + currentDate.getDate() + "/"
                             + currentDate.getFullYear() + ")";

            var cityName = response.name;
            var iconURL = "http://openweathermap.org/img/wn/" + response.weather[0].icon + "@2x.png";
            var temperature = response.main.temp;
            var humidity = response.main.humidity;
            var windSpeed = response.wind.speed;

            console.log(cityName);
            console.log(dateString);
            console.log(iconURL);
            console.log(temperature);
            console.log(humidity);
            console.log(windSpeed);

            console.log(response);
        });
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

    // Test call for currentWeather().
    currentWeather("atlanta");
});