function updateWheatherInfo(response) {
  let temperature = document.querySelector("#temperature");
  let newTemperature = Math.round(response.data.temperature.current);
  let updatedCity = document.querySelector("h2");
  let apiCity = response.data.city;
  updatedCity.innerHTML = apiCity;
  temperature.innerHTML = newTemperature;
  let description = document.querySelector("#weather-description");
  let newDescription = response.data.condition.description;
  description.innerHTML = newDescription;
  let humidity = document.querySelector("#humidity-value");
  let newHumidity = response.data.temperature.humidity;
  humidity.innerHTML = `${newHumidity} %`;
  let windSpeed = document.querySelector("#windspeed-value");
  let newWindSpeed = response.data.wind.speed;
  windSpeed.innerHTML = `${newWindSpeed} km/h`;
  let icon = document.querySelector("#temperature-icon");
  let newIcon = response.data.condition.icon_url;
  icon.innerHTML = `<img src=${newIcon} width= 150 height= 150>`;
}

function validateCity(response) {
  let existingCity = response.data.city;
  if (existingCity) {
    updateWheatherInfo(response);
  } else {
    alert(
      "                                            Ooops!\n                              That was no a valid city\n                                         Try again 😉",
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
