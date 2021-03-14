function formatDate(timestamp) {
  let now = new Date(timestamp);
  let date = now.getDate();
  let hours = now.getHours();
  let minutes = now.getMinutes();

  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let day = days[now.getDay()];

  let months = [
    "Jan",
    "Feb",
    "March",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ];
  let month = months[now.getMonth()];

  return `${day} ${month} ${date}, ${hours}:${minutes}`;
}

//
function displayWeatherCondition(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = `${Math.round(
    response.data.main.temp
  )}°C`;

  document.querySelector(
    "#humidity"
  ).innerHTML = `Humidity: ${response.data.main.humidity}%`;
  document.querySelector("#wind").innerHTML = `Wind Speed: ${Math.round(
    response.data.wind.speed
  )}kmh`;
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
}

////

function searchCity(city) {
  let apiKey = "b3f2f79cdfd03464358c41d6ea4beff5";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-bar").value;
  searchCity(city);
}

let form = document.querySelector("form");
form.addEventListener("submit", handleSubmit);

function searchLocation(position) {
  let apiKey = "b3f2f79cdfd03464358c41d6ea4beff5";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeatherCondition);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function convertTemp(event) {
  event.preventDefault();
  let celsiusTemp = Math.round(response.data.main.temp);
  let fahrenheitTemp = Math.round((celsiusTemp * 9) / 5 + 32);
  let h2 = document.querySelector("h2");
  let button = document.querySelector(".convert-button");
  if (button.innerHTML === `°F`) {
    button.innerHTML = `°C`;
    h2.innerHTML = `${fahrenheitTemp}°F`;
  } else if (button.innerHTML === `°C`) {
    button.innerHTML = `°F`;
    h2.innerHTML = `${celsiusTemp}°C`;
  }
}
let button = document.querySelector(".convert-button");
button.addEventListener("click", convertTemp);

let dateElement = document.querySelector("#date");
let currentTime = new Date();
dateElement.innerHTML = formatDate(currentTime);

let currentLocationButton = document.querySelector(".current-location-btn");
currentLocationButton.addEventListener("click", getCurrentLocation);

searchCity();
