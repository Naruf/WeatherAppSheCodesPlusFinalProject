function cityInputValue(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#cityInput");
  let cityValueTrimmed = cityInput.value.trim();
  let city = cityValueTrimmed
    .toLowerCase()
    .split(" ")
    .filter((word) => word !== "")
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ");
  let updatedCity = document.querySelector("h2");
  updatedCity.innerHTML = city;
}
let citySearchInput = document.querySelector("form");
citySearchInput.addEventListener("submit", cityInputValue);
