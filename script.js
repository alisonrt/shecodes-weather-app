const apiKey = "20f80f60d74acf5419e80528f290a5b9";
        // In order for "clickAlert" to be called, we need to listen for a click event on the "Search" button. To do that, we add an "event listener" to the search button, like so:
        // let element = document.querySelector("button"); // select all buttons and add a click event (note: we could make this more specific by using an id rather than attaching the event listener to all buttons)
        // element.addEventListener("click", clickAlert); // then specify the event we want to "listen" for (ie. "click"), and what function to call when that event "fires" (ie. clickAlert)
        let now = new Date();
        let date = now.getDate();
        let hour = now.getHours();
        let minute = now.getMinutes();
        // What we get: 0, 1, 2, 3 ... 10, ... 59
        // What we want: 00, 01, 02, 03... 10 ... 59

        let year = now.getFullYear();
        let days = [
            "Sunday",
            "Monday",
            "Tueday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Sunday"
        ];
        let day = days[now.getDay()];
        let h4 = document.querySelector("#current-date-time");
        if (minute <= 9) {
            h4.innerHTML = `${day} ${hour}:0${minute}`;
        } else {
            h4.innerHTML = `${day} ${hour}:${minute}`;
        }

        function showTemperature(response) {
            let temperature = Math.round(response.data.main.temp);
            let currentTemp = document.querySelector(".current-temperature");
            currentTemp.innerHTML = `${temperature}˚C`;
            let cityName = document.querySelector("#city-name"); // Selecting the HTML element with the ID of "city-name" (our H2 element that says "Seattle" initially)
            cityName.innerHTML = response.data.name;
            let weatherStatus = document.querySelector(".current-weather");
            weatherStatus.innerHTML = response.data.weather[0].main;
        }
        function showPosition(position) {
            let lat = position.coords.latitude;
            let long = position.coords.longitude;
            let units = "metric";
            let apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=metric`
            axios.get(`${apiURL}&appid=${apiKey}`).then(showTemperature);
        }
        function getCurrentLocandTemp(event) {
            navigator.geolocation.getCurrentPosition(showPosition);
        }
        let currentLocation = document.querySelector("#current-location-button");
        currentLocation.addEventListener("click", getCurrentLocandTemp);

        let searchForm = document.querySelector("#search-form");
        searchForm.addEventListener("submit", searchCity);

        function searchCity(event) {
            console.log("search-form submitted");
            event.preventDefault();
            let cityInput = document.querySelector("#city");
            let city = cityInput.value;
            let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
            axios.get(apiURL).then(showTemperature);
        }

        getCurrentLocandTemp();
