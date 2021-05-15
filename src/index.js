let form = document.querySelector("#search-form");
form.addEventListener("submit", searchCity);

function searchCity(event) {
  console.log("hello3");
  event.preventDefault();
  //let cityElement = document.querySelector("#city");
  let cityInput = document.querySelector("#city-input");
  //cityElement.innerHTML = cityInput.value;
  console.log(cityInput.value);
  search(cityInput.value);
}
//current date and time
let currentTime = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[currentTime.getDay()];
let hours = currentTime.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = currentTime.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let dateParagraph = document.querySelector("#date");
dateParagraph.innerHTML = `${day} ${hours}:${minutes}`;

//Show Temperature
function showTemperature(response) {
  console.log("hello5");
  console.log(response.data);
  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = `${temperature}°`;
  let h1 = document.querySelector("h1");
  h1.innerHTML = response.data.name;
}

//search function
function search(city) {
  let apiKey = "fb3f02066dc4554787dc8a98a58a3e46";
  let units = "imperial";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  console.log("hello2");
  axios.get(`${apiUrl}`).then(showTemperature);
}
//current location

function getCurrentLocation(position) {
  console.log(position.coords.latitude);
  let apiKey = "fb3f02066dc4554787dc8a98a58a3e46";

  let units = "imperial";
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}

function currentLocation(event) {
  console.log("Hello7");
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
