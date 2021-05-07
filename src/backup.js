let form = document.querySelector("#search-form");
form.addEventListener("submit", search);
function search(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");

  let h1 = document.querySelector("h1");
  h1.innerHTML = `${cityInput.value}`;
}

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

let apiKey = "fb3f02066dc4554787dc8a98a58a3e46";
let cityInput = document.querySelector("#city-input");
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=#{apiKey}`;

function showTemperature(response) {
  let temperatureRetrieve = Math.round(response.data.main.temp);
  let temperatureDisplay = document.querySelector("#temperature");
  temperatureDisplay.innerHTML = `{temperatureRetrieve}°`;
}

axios.get(apiUrl).then(showTemperature);
