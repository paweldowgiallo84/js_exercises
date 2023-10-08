const locationCity = document.getElementById("location");
const errorMsg = document.getElementById("error");
const locationInput = document.getElementById("locationInput");
const searchBtn = document.getElementById("locationBtn");
const weatherGraphic = document.getElementById("weather__actual--icon");
const resultWeather = document.getElementById("weatherResult");
const resultTemperature = document.getElementById("tempResult");
const resultHumidity = document.getElementById("humResult");

const BASE_API_URL = "https://api.openweathermap.org/data/2.5/weather?q=";
const API_KEY = "&appid=7adf805dcbd828a359766ca039517208";
const API_UNITS = "&units=metric";

const getWeather = () => {
  const city = locationInput.value;
  const URL = BASE_API_URL + city + API_KEY + API_UNITS;

  axios
    .get(URL)
    .then((res) => {
      const respons = res.data;

      console.log(respons);
      const cityName = respons.name;
      const temp = respons.main.temp;
      const hum = respons.main.humidity;
      const weather = respons.weather[0].main;
      const weatherIcon = respons.weather[0].icon;

      locationCity.innerHTML = cityName;
      resultWeather.innerHTML = weather;
      resultTemperature.innerHTML = temp;
      resultHumidity.innerHTML = hum;

      weatherGraphic.innerHTML = "";
      errorMsg.innerHTML = "";
      const icon = document.createElement("img");
      icon.setAttribute("src", `./images/${weatherIcon}.png`);
      icon.setAttribute("alt", "weather icon");
      weatherGraphic.append(icon);

      locationInput.value = "";
    })
    .catch((err) => (errorMsg.innerHTML = `Podaj prawidłową nazwę miasta`));
};

searchBtn.addEventListener("click", getWeather);
