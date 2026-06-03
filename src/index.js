function weatherForecast(response) {
  let forecastTemplate = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastTemplate =
        forecastTemplate +
        `<div class ="weather-forecast-date">
      <div class="weather-forecast-day">${displayDay(day.time)}</div> 
      <div ><img src="${day.condition.icon_url}"/ class="weather-forecast-icon"> </div> 
      <div class="weather-forecast-temperature">
      <div class="weather-forecast-max-temp" id="forecast-max-temp"><strong>${Math.round(day.temperature.maximum)}°</strong></div>
      <div class="weather-forecast-min-temp">${Math.round(day.temperature.minimum)}°</div>
      </div>
      </div>`;
    }
  });

  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastTemplate;
}

function displayDay(timestamp) {
  let forecastDay = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  return forecastDay[day];
}

function fetchForecastData(city) {
  let apiKey = "5d1t76143df0603191aa4604b0b5b1oe";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(weatherForecast);
}

function updateWheatherInfo(response) {
  let temperature = document.querySelector("#temperature");
  let newTemperature = Math.round(response.data.temperature.current);
  let updatedCity = document.querySelector("h2");
  let apiCity = response.data.city;
  let description = document.querySelector("#weather-description");
  let newDescription = response.data.condition.description;
  let humidity = document.querySelector("#humidity-value");
  let newHumidity = response.data.temperature.humidity;
  let windSpeed = document.querySelector("#windspeed-value");
  let newWindSpeed = response.data.wind.speed;
  let icon = document.querySelector("#temperature-icon");
  let newIcon = response.data.condition.icon_url;
  updatedCity.innerHTML = apiCity;
  temperature.innerHTML = newTemperature;
  description.innerHTML = newDescription;
  humidity.innerHTML = `${newHumidity} %`;
  windSpeed.innerHTML = `${newWindSpeed} km/h`;
  icon.innerHTML = `<img src=${newIcon} width= 150 height= 150>`;

  fetchForecastData(apiCity);
}

function validateCity(response) {
  let existingCity = response.data.city;
  if (existingCity) {
    updateWheatherInfo(response);
  } else {
    alert(
      "                                            Ooops!\n                              That was not a valid city\n                                         Try again 😉",
    );
  }
}

function apiCitySearch(city) {
  let apiKey = "5d1t76143df0603191aa4604b0b5b1oe";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(validateCity);
}

function cityInputValue(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#cityInput");
  let city = cityInput.value.trim();

  apiCitySearch(city);
}
let citySearchInput = document.querySelector("form");
citySearchInput.addEventListener("submit", cityInputValue);

apiCitySearch("almuñécar");

let now = new Date();
let currentWeekday = now.getDay();
let day = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let weekday = day[currentWeekday];
let dayElement = document.querySelector("#current-day");
let hours = String(now.getHours()).padStart(2, "0");
let hourElement = document.querySelector("#current-hour");
let minutes = String(now.getMinutes()).padStart(2, "0");
let minutesElement = document.querySelector("#current-minutes");
dayElement.innerHTML = weekday;
hourElement.innerHTML = hours;
minutesElement.innerHTML = minutes;
