// getting real time when the page loads...
function showTime() {
  let now = new Date();
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
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
  let day = days[now.getDay()];
  let time = document.querySelector(".current-time");
  time.innerHTML = `${day} ${hours}:${minutes}`;
}
showTime();
//display data on screen after search:
function showData(response) {
  let city = document.querySelector(".city");
  city.innerHTML = response.data.name;
  let country = document.querySelector("#country"); //can't get state info from API??? Bummer!
  country.innerHTML = response.data.sys.country;
  let temperature = document.querySelector("#temp-digits");
  temperature.innerHTML = Math.round(response.data.main.temp);
  let humidity = document.querySelector(".humidity");
  humidity.innerHTML = `Humidity: ${response.data.main.humidity}%`;
  let wind = document.querySelector(".wind-speed");
  wind.innerHTML = `Wind Speed: ${Math.round(response.data.wind.speed)} mph`;
  let description = document.querySelector("#weather-conditions");
  description.innerHTML = response.data.weather[0].main;
}

//separate function that only searches for city (makes API call and finds info for a city):
function searchCity(city) {
  /*will pull city out of searchHandle f because this f is inside it*/
  let apiKey = "9b6ca84186ab2a21277c82510180b38a";
  let units = "imperial";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`;
  axios.get(url).then(showData);
}
//fetch weather and location info when form is submitted:
function searchHandle(event) {
  event.preventDefault();
  let city = document.querySelector("#input-bar").value;

  if (city) {
    searchCity(city);
  } else {
    alert("Please enter a city");
  }
}

//program search button:
let searchButton = document.querySelector("#search-button");
searchButton.addEventListener("click", searchHandle);

//get current location:
function retrieveLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "9b6ca84186ab2a21277c82510180b38a";
  let units = "imperial";
  let urlGeolocation = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=${units}&appid=${apiKey}`;
  axios.get(urlGeolocation).then(showData);
}
//program current location button:
let locationButton = document.querySelector("#location-button");
locationButton.addEventListener("click", function () {
  navigator.geolocation.getCurrentPosition(retrieveLocation); //this accesses to current location, then runs retrieveLocation
});

// display weather for Boston on load:
searchCity("Boston");
