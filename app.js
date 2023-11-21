let todayTemp = document.querySelector(".weather-temp");
let aboutToday = document.querySelector(".day-updates");
let aboutWeather = document.querySelector(".weather-disc");
let feelsLike = document.querySelector(".feels-like");
let pressure = document.querySelector(".pressure");
let Visibility = document.querySelector(".Visibility");
let humidity = document.querySelector(".humidity");
let dew_point = document.querySelector(".dew-point");

const apiKey = "6c9322eda11f7b94896d6c4a9ffb3eea";
const API_URL = `https://api.openweathermap.org/data/2.5/weather?units=metric`;
let data;
let cityName = prompt("enter the city name");

async function checkWeather() {
  const response = await fetch(API_URL + `&q=${cityName}` + `&appid=${apiKey}`);
  data = await response.json();
  if (!data) {
    console.log("Data no fecthed");
  }
  console.log(data);
  todayTemp.innerText = data.main.temp.toFixed(1) + "°C";
  aboutToday.innerText = data.weather[0].description;
  feelsLike.innerText = data.main.feels_like.toFixed(1) + "°C";
  pressure.innerText = data.main.pressure + " mb";
  Visibility.innerText = data.visibility / 1000 + " km";
  humidity.innerText = data.main.humidity + "%";

  const a = 17.27;
  const b = 237.7;

  const alpha =
    (a * data.main.temp) / (b + data.main.temp) +
    Math.log(data.main.humidity / 100.0);
  const dewPoint = (b * alpha) / (a - alpha);
  dew_point.innerText = dewPoint.toFixed(1);
}
checkWeather();

const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}&units=metric`;

fetch(apiUrl)
  .then((response) => response.json())
  .then((data) => {
    const hourlyForecast = data.list; // Array of hourly forecasts
    // console.log(hourlyForecast)
    hourlyForecast.forEach((forecast) => {
      const date = new Date(forecast.dt * 1000); // Convert timestamp to date
      const hour = date.getHours();
      const temperature = forecast.main.temp;
      const description = forecast.weather[0].description;

      console.log(
        `Hour: ${hour}:00 - Temperature: ${temperature}°C - Weather: ${description}`
      );
    });
  })
  .catch((error) => console.error(error));
