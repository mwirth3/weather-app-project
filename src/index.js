function search(city) {
  let apiKey = "fb3f02066dc4554787dc8a98a58a3e46";
  let units = "imperial";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(`${apiUrl}`).then(showTemperature);
}
function searchCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  search(cityInput.value);
}
//Date
function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}
//Weather-forecast
function displayForecast(response) {
  console.log(response.data);
  let forecastElement = document.querySelector("#forecast");

  let days = ["Sat", "Sun", "Mon", "Tues", "Wed"];

  let forecastHTML = `<div class="row row-cols-1 row-cols-md-5 g-5">`;
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
         <div class="col" style="border-radius: 30px">
                <div class="card">
                  <div class="card-body">
                  <div class="weather-forecast-date">${day}</div>
                    <img src="" />
                    <div class="weather-forecast-temps">
                      <span class="weather-forecast-temps-max">82°</span>
                      <span class="weather-forecast-temps-min">72°</span>
                    </div>
                  </div>
                </div>
          </div>
  `;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
//Get Forecast
function getForecast(coordinates) {
  let apiKey = "fb3f02066dc4554787dc8a98a58a3e46";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}

//Show Temperature
function showTemperature(response) {
  let h1 = document.querySelector("h1");
  let temperatureElement = document.querySelector("#temperature");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let dateElement = document.querySelector("#date");
  let currentIconElement = document.querySelector("#current-icon");

  farenheitTemperature = response.data.main.temp;

  temperatureElement.innerHTML = Math.round(farenheitTemperature);
  h1.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = response.data.wind.speed;
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  currentIconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  currentIconElement.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}

//current location

function getCurrentLocation(position) {
  let apiKey = "fb3f02066dc4554787dc8a98a58a3e46";

  let units = "imperial";
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}

function currentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getCurrentLocation);
}

let currentWeather = document.querySelector("#current-location-button");
currentWeather.addEventListener("click", currentLocation);

function showCelciusTemp(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  celciusLink.classList.add("active");
  farenheitLink.classList.remove("active");
  let celciusTemperature = ((farenheitTemperature - 32) * 5) / 9;

  temperatureElement.innerHTML = Math.round(celciusTemperature);
}

function showFarenheitTemp(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  farenheitLink.classList.add("active");
  celciusLink.classList.remove("active");
  temperatureElement.innerHTML = Math.round(farenheitTemperature);
}
let farenheitTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", searchCity);

let celciusLink = document.querySelector("#celsius-link");
celciusLink.addEventListener("click", showCelciusTemp);

let farenheitLink = document.querySelector("#fahrenheit-link");
farenheitLink.addEventListener("click", showFarenheitTemp);

search("Phoenix");

//function changeToFarenheit(event) {
//event.preventDefault();
// let currentFarenheitTime = document.querySelector("#temperature");
//currentFarenheitTime.innerHTML = "32";
//}

//function changeToCelcius(event) {
//event.preventDefault();
//let currentCelciusTime = document.querySelector("#temperature");
//currentCelciusTime.innerHTML = "89";
//}
//let farenheit = document.querySelector("#celsius-link");
//farenheit.addEventListener("click", changeToFarenheit);
//let celcius = document.querySelector("#fahrenheit-link");
//celcius.addEventListener("click", changeToCelcius);
