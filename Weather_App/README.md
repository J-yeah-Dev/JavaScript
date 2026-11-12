# Weather App

A simple weather application built with HTML, CSS, and JavaScript. It lets users search for a city and view the current weather conditions using Open-Meteo APIs.

## Features

- Search weather by city name
- Fetches location data and live weather data from Open-Meteo
- Displays city name, temperature, condition, and wind speed
- Handles invalid city names and API errors gracefully
- Clean and responsive single-page UI

## How to Use

1. Open `index.html` in your browser.
2. Type a city name such as `Bengaluru`, `London`, or `Tokyo`.
3. Click the `Search` button.
4. View the current weather details for that location.

## Run the App

You can open the project directly in a browser:

```bash
index.html
```

Or run a small local server:

```bash
python -m http.server
```

Then open `http://localhost:8000` in your browser.

## Project Files

- `index.html` — app structure and search form
- `style.css` — page styling and layout
- `app.js` — city lookup, API requests, and weather rendering

## API Information

This app uses:

- Open-Meteo Geocoding API to find a city by name
- Open-Meteo Forecast API to get the current weather for the selected coordinates

No API key is required.

## Author

Jayadev Rajendran