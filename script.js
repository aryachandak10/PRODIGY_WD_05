const apiKey = "3dca8f4f9aa10f030bde1cae241b607f";

// Get elements
const searchBtn = document.getElementById("searchBtn");
const locationBtn = document.getElementById("locationBtn");
const weatherResult = document.getElementById("weatherResult");

// 🔹 Fetch weather by city name
searchBtn.addEventListener("click", () => {
    const city = document.getElementById("cityInput").value.trim();

    if (city === "") {
        weatherResult.innerHTML = "❗ Please enter a city name";
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetchWeather(url);
});

// 🔹 Fetch weather using user's location
locationBtn.addEventListener("click", () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        weatherResult.innerHTML = "Geolocation not supported";
    }
});

// 🔹 Show position
function showPosition(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

    fetchWeather(url);
}

// 🔹 Fetch weather data
function fetchWeather(url) {
    weatherResult.innerHTML = "⏳ Fetching weather...";

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error("City not found");
            }
            return response.json();
        })
        .then(data => {
            displayWeather(data);
        })
        .catch(error => {
            weatherResult.innerHTML = "❌ Error: " + error.message;
        });
}

// 🔹 Display weather on page
function displayWeather(data) {
    const temp = data.main.temp;
    const humidity = data.main.humidity;
    const weather = data.weather[0].description;
    const cityName = data.name;
    const wind = data.wind.speed;

    weatherResult.innerHTML = `
        <h3>${cityName}</h3>
        <p>🌡 Temperature: ${temp} °C</p>
        <p>☁ Weather: ${weather}</p>
        <p>💧 Humidity: ${humidity}%</p>
        <p>🌬 Wind Speed: ${wind} m/s</p>
    `;
}

// 🔹 Error handling for location
function showError(error) {
    weatherResult.innerHTML = "❌ Location permission denied";
}
