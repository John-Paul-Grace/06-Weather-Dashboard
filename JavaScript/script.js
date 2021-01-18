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
            url: "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + apiKey,
            method: "GET"
        };

        // Ajax call to the OpenWeatherMap API to get current weather.
        $.ajax(ajaxInfo).then(function(response) {

            //===========================================================================
            // Converts unix timestamp to useable date

            // Gets unix timestamp from response
            var unixTime = response.dt;

            // Converts unix to milliseconds
            unixTime *= 1000;

            // Uses milliseconds to create a Date object
            var currentDate = new Date(unixTime);

            // Uses Date object methods to create a string in the format "(MM/DD/YYYY)"
            var dateString = "(" + (currentDate.getMonth() + 1) + "/"
                             + currentDate.getDate() + "/"
                             + currentDate.getFullYear() + ")";
            //===========================================================================

            // Gets city name from response
            var cityName = response.name;

            // Concatenates cityName and dateString into one string
            var forecastHeader = cityName + " " + dateString;

            // Uses icon code from response to create a url for an image
            var iconURL = "http://openweathermap.org/img/wn/" + response.weather[0].icon + "@2x.png";

            // Gets temperature from response
            var temperature = response.main.temp + " °F";

            // Gets humidity from response
            var humidity = response.main.humidity + "%";

            // Gets wind speed from response
            var windSpeed = response.wind.speed + " MPH";

            //=============================================================
            // Sets all the appropriate elements using the above data
            $("#forecast-city-header").text(forecastHeader);

            $("#weather-icon").attr("src", iconURL);

            $("#temperature").text(temperature);

            $("#humidity").text(humidity);

            $("#wind-speed").text(windSpeed);
            //=============================================================
        });
    }

    // Function that runs an ajax call to get a 5-day forecast. Takes a string as a parameter.
    function fiveDayForecast(city) {

        // Object to be used in the ajax call. URL is concatenated using the parameter string and api key.
        var ajaxInfo = {
            url: "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + apiKey,
            method: "GET"
        };

        // Ajax call to the OpenWeatherMap API to get a 5-day forecast.
        $.ajax(ajaxInfo).then(function(response) {

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

    // click listener for the #city-list which delegates to the specific buttons
    $("#city-list").on("click", "button", function() {

        // Saves the click button as a jQuery object
        var cityButton = $(this);

        // Runs the currentWeather() method for the clicked city
        currentWeather(cityButton.text());
    });

    // DELETE LATER
    //=================================================================
    addCity("Atlanta");
    addCity("New York");
    addCity("Los Angeles");
    //=================================================================

    fiveDayForecast("atlanta");
});
