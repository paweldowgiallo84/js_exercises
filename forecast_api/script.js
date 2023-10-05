const locationCity = document.getElementById("location");
const locationInput = document.getElementById("location--input");
const searchBtn = document.getElementById("location--button");
const weatherGraphic = document.getElementById(
  "weather__actual--graphic__representation"
);
const resultWeather = document.querySelector(".weather--result");
const resultTemperature = document.querySelector(".temperature--result");
const resultHumidity = document.querySelector(".humidity--result");

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

      weatherGraphic.innerHTML = ''
        const icon = document.createElement("img");
        icon.setAttribute("src", `./images/${weatherIcon}.png`);
        icon.setAttribute("alt", "weather icon");
        // icon.classList.add("weather__icon");
        weatherGraphic.append(icon);

      locationInput.value = "";

      //   console.log(weatherIcon)
    })
    .catch((err) => console.error("Faild to tefch data"));
};

searchBtn.addEventListener("click", getWeather);
