let form = document.querySelector("#search-form");
form.addEventListener("submit", searchCity);

function searchCity(event) {
  event.preventDefault();
  //let cityElement = document.querySelector("#city");
  let cityInput = document.querySelector("#city-input");
  //cityElement.innerHTML = cityInput.value;

  search(cityInput.value);
}
//Date
function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if ((hours, 10)) {
    hours = `${hours}`;
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
//Show Temperature
function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#temperature");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let dateElement = document.querySelector("#date");
  let currentIconElement = document.querySelector("#current-icon");

  temperatureElement.innerHTML = `${temperature}`;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = response.data.wind.speed;
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  currentIconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  currentIconElement.setAtrribute("alt", response.data.weather[0].description);
  let h1 = document.querySelector("h1");
  h1.innerHTML = response.data.name;
}

//search function
function search(city) {
  let apiKey = "fb3f02066dc4554787dc8a98a58a3e46";
  let units = "imperial";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

  axios.get(`${apiUrl}`).then(showTemperature);
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

function changeToFarenheit(event) {
  event.preventDefault();
  let currentFarenheitTime = document.querySelector("#temperature");
  currentFarenheitTime.innerHTML = "32";
}

//function changeToCelcius(event) {
//event.preventDefault();
//let currentCelciusTime = document.querySelector("#temperature");
//currentCelciusTime.innerHTML = "89";
//}
//let farenheit = document.querySelector("#celsius-link");
//farenheit.addEventListener("click", changeToFarenheit);
//let celcius = document.querySelector("#fahrenheit-link");
//celcius.addEventListener("click", changeToCelcius);
