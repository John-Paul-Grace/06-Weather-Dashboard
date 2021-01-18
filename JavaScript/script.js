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

            // Creates a Date object
            var currentDate = new Date();

            // Uses Date object methods to create a string in the format "(MM/DD/YYYY)"
            var dateString = "(" + (currentDate.getMonth() + 1) + "/"
                             + currentDate.getDate() + "/"
                             + currentDate.getFullYear() + ")";
            //===========================================================================

            // Concatenates city name and dateString into one string
            var forecastHeader = response.name + " " + dateString;

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

            $("#current-icon").attr("src", iconURL);

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
            url: "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&appid=" + apiKey,
            method: "GET"
        };

        // Ajax call to the OpenWeatherMap API to get a 5-day forecast.
        $.ajax(ajaxInfo).then(function(response) {

            // Creates a Date object
            var currentDate = new Date();

            for (var day= 1; day < 6; day++) {

                // Uses Date object methods to create a string in the format "MM/DD/YYYY"
                var dateString = (currentDate.getMonth() + 1) + "/"
                                 + (currentDate.getDate() + day) + "/"
                                 + currentDate.getFullYear();

                // Sets the date element to the dateString
                $("#" + day + "-day-date").text(dateString);

                // Creates an index to use to get info from response
                var index = 2 + ((day - 1) * 8);

                // Gets the needed info using index
                var dayForecast = response.list[index];

                // Concatenates a url to get the weather icon from
                var iconURL = "http://openweathermap.org/img/wn/" + dayForecast.weather[0].icon + "@2x.png";

                // Sets the weather icon in the appropriate element
                $("#" + day + "-day-icon").attr("src", iconURL);

                // Gets temperature as a string
                var temp = dayForecast.main.temp + " °F";

                // Sets appropriate temperature element
                $("#" + day + "-day-temp").text(temp);

                // Gets humidity as a string
                var humidity = dayForecast.main.humidity + "%";

                // Sets appropriate humidity element
                $("#" + day + "-day-humidity").text(humidity);
            }
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

        // Gets city name from button
        var city = cityButton.text();

        // Runs the currentWeather() method for the clicked city
        currentWeather(city);

        // Runs the fiveDayForecast() method for the clicked city
        fiveDayForecast(city);
    });
});
