
const API_KEY = "YOUR_API_KEY";

async function getWeather() {

    const city = document.getElementById("cityInput")
        .value.trim();

    const message = document.getElementById("message");

    if (!city) {
        message.textContent = "Please enter a city name.";
        return;
    }

    message.textContent = "Loading weather data...";

    try {

        // Fetch current weather

        const currentURL =
            `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;

        const currentResponse = await fetch(currentURL);

        const currentData = await currentResponse.json();

        if (!currentResponse.ok) {
            throw new Error(currentData.message || "City not found");
        }

        // Display current weather

        document.getElementById("cityName").textContent =
            currentData.name + ", " + currentData.sys.country;

        document.getElementById("temperature").textContent =
            Math.round(currentData.main.temp) + "°C";

        document.getElementById("weatherDescription").textContent =
            currentData.weather[0].description;

        document.getElementById("feelsLike").textContent =
            "Feels Like: " +
            Math.round(currentData.main.feels_like) + "°C";

        document.getElementById("weatherIcon").src =
            `https://openweathermap.org/img/wn/${currentData.weather[0].icon}@2x.png`;

        document.getElementById("humidity").textContent =
            currentData.main.humidity + "%";

        document.getElementById("wind").textContent =
            currentData.wind.speed + " m/s";

        document.getElementById("pressure").textContent =
            currentData.main.pressure + " hPa";

        document.getElementById("visibility").textContent =
            (currentData.visibility / 1000).toFixed(1) + " km";

        // Sunrise and sunset

        const sunrise = new Date(
            currentData.sys.sunrise * 1000
        ).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            timeZone: "UTC"
        });

        const sunset = new Date(
            currentData.sys.sunset * 1000
        ).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            timeZone: "UTC"
        });

        // Convert UTC into the city's local time

        const timezoneOffset = currentData.timezone;

        function cityTime(timestamp) {
            return new Date(
                (timestamp + timezoneOffset) * 1000
            ).toISOString().slice(11, 16);
        }

        document.getElementById("sunrise").textContent =
            cityTime(currentData.sys.sunrise);

        document.getElementById("sunset").textContent =
            cityTime(currentData.sys.sunset);

        // Fetch forecast

        await getForecast(
            currentData.coord.lat,
            currentData.coord.lon
        );

        message.textContent = "";

    } catch (error) {

        message.textContent = error.message;

    }
}


// Five-day forecast

async function getForecast(lat, lon) {

    const forecastURL =
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;

    const response = await fetch(forecastURL);

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Forecast unavailable");
    }

    const forecastContainer =
        document.getElementById("forecast");

    forecastContainer.innerHTML = "";

    const dailyForecast = {};

    data.list.forEach(item => {

        const date = item.dt_txt.split(" ")[0];

        if (!dailyForecast[date]) {
            dailyForecast[date] = item;
        }

    });

    Object.values(dailyForecast).slice(0, 5)
        .forEach(day => {

        const date = new Date(day.dt * 1000);

        const card = document.createElement("div");
        card.className = "forecast-card";

        const dayName = document.createElement("p");
        dayName.textContent = date.toLocaleDateString(
            "en-US", { weekday: "short" }
        );

        const icon = document.createElement("img");
        icon.src =
            `https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`;
        icon.alt = day.weather[0].description;

        const temperature = document.createElement("h3");
        temperature.textContent =
            Math.round(day.main.temp) + "°C";

        const description = document.createElement("p");
        description.textContent = day.weather[0].description;

        card.append(dayName, icon, temperature, description);

        forecastContainer.appendChild(card);

    });
}


// Search on pressing Enter

document.getElementById("cityInput")
    .addEventListener("keydown", event => {

        if (event.key === "Enter") {
            getWeather();
        }

    });
