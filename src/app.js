function formatDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let dayIndex = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[dayIndex];

  return `${day} ${hours}:${minutes}`;
}
function displayForecast() {
  let forecast = document.querySelector("#forecast");

  let days = ["Thu", "Fri", "Sat", "Sun", "Mon", "Tue", "Wed"];

  let forecastHTML = `<div class="row second">`;
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `<div class="col forecast-border">
          <div class="forecast-days">${day}</div>
          <img src="http://openweathermap.org/img/wn/01d@2x.png" alt="">
          <div class="forecast-temp">
            <span class="forecast-min">10°C </span>
            <span class="forecast-max"> 12°C</span>
          </div>
          </div>`;
  });
  forecastHTML = forecastHTML + `</div>`;
  forecast.innerHTML = forecastHTML;
}

function showTemp(response) {
  let cityName = document.querySelector("#city-name");
  cityName.innerHTML = response.data.name;
  let countryName = document.querySelector("#country-name");
  countryName.innerHTML = response.data.sys.country;
  let tempResult = document.querySelector("#temperature");
  celsiusTemp = response.data.main.temp;
  tempResult.innerHTML = Math.round(celsiusTemp);
  let decrip = document.querySelector("#description");
  decrip.innerHTML = response.data.weather[0].main;
  let pre = document.querySelector("#pressure");
  pre.innerHTML = response.data.main.pressure;
  let hum = document.querySelector("#humidity");
  hum.innerHTML = response.data.main.humidity;
  let win = document.querySelector("#wind");
  win.innerHTML = Math.round(response.data.wind.speed);
  let icon = document.querySelector("#mainIcon");
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  icon.setAttribute("alt", response.data.weather[0].main);
}
function search(city) {
  let apiKey = "586d354ea165edaa5f1828ab80491fad";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showTemp);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-input").value;
  search(city);
}

function searchLocation(position) {
  let apiKey = "586d354ea165edaa5f1828ab80491fad";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showTemp);
}

function currentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let date = document.querySelector("#week-day");
let newDate = new Date();
date.innerHTML = formatDate(newDate);

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

let currentButton = document.querySelector("#current-btn");
currentButton.addEventListener("click", currentLocation);

function showCelsius(event) {
  event.preventDefault();
  //farenheitDegree.classList.remove("active");
  // celsiusDegree.classList.add("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemp);
}
let celsiusDegree = document.querySelector("#celsius");
celsiusDegree.addEventListener("click", showCelsius);

function showFarenheit(event) {
  event.preventDefault();
  //celsiusDegree.classList.remove("active");
  //farenheitDegree.classList.add("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round((celsiusTemp * 9) / 5 + 32);
}

let celsiusTemp = null;

let farenheitDegree = document.querySelector("#farenheit");
farenheitDegree.addEventListener("click", showFarenheit);

search("Paris");
displayForecast();
