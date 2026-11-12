

const form = document.getElementById('weather-form');


form.addEventListener("submit", async function (event) {
  event.preventDefault();

  const city = document.getElementById("search").value;

  try {
    // Step 1: city name -> latitude/longitude
    const geoResponse = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}`
    );
    const geoData = await geoResponse.json();

    if (!geoData.results || geoData.results.length === 0) {
      alert("City not found.");
      return;
    }

    const { latitude, longitude, name } = geoData.results[0];

    // Step 2: coordinates -> current weather
    const weatherResponse = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
    );
    const weatherData = await weatherResponse.json();

    console.log(name, weatherData.current_weather);
    // next: fill this into #city-name, #weather-temp, #weather-condition

    var current_weather = weatherData.current_weather;
    var temperature = current_weather.temperature;
    var windspeed = current_weather.windspeed;
    var weathercode = current_weather.weathercode;

    console.log(temperature, windspeed);

    const parentList = document.getElementById("weather-card");
    parentList.innerHTML = "";

    var div1 = document.createElement("div");
    div1.classList.add("weather-info");
    var div1h3 = document.createElement("h3");
    div1h3.innerText =  name;
    var div1p2 = document.createElement("p");
    div1p2.innerText = weatherCodes[weathercode];
    var div1p3 = document.createElement("p");
    div1p3.innerText = windspeed + " kmph";
    var div2 = document.createElement("div");
    div2.classList.add("weather-actions");
    var div2span = document.createElement("span");
    div2span.classList.add("weather-temp");
    div2span.innerText = temperature + "°C";

    parentList.appendChild(div1);
    div1.appendChild(div2);
    div1.appendChild(div1h3);
    div1.appendChild(div1p2);
    div1.appendChild(div1p3);
    parentList.appendChild(div2);
    div2.appendChild(div2span);

    /* document.getElementById("empty-message").style.display = 'none';   */

  document.getElementById("empty-message").hidden = true;
  document.getElementById("weather-card").hidden = false;

  } catch (error) {
    console.error("Fetch failed:", error);
    alert("Something went wrong fetching the weather.");
  }
});

const weatherCodes = {
  0: "Clear sky",
  1: "Mainly clear",
  2: "Partly cloudy",
  3: "Overcast",
  45: "Fog",
  48: "Depositing rime fog",
  51: "Light drizzle",
  53: "Moderate drizzle",
  55: "Dense drizzle",
  61: "Slight rain",
  63: "Moderate rain",
  65: "Heavy rain",
  71: "Slight snow",
  73: "Moderate snow",
  75: "Heavy snow",
  80: "Slight rain showers",
  81: "Moderate rain showers",
  82: "Violent rain showers",
  95: "Thunderstorm",
  96: "Thunderstorm with slight hail",
  99: "Thunderstorm with heavy hail"
};