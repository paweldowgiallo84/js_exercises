const inputTemp = document.querySelector("#converter");
const tempFrom = document.querySelector(".one");
const tempTo = document.querySelector(".two");
const result = document.querySelector(".result");
const convertBtn = document.querySelector(".convert");
const resetBtn = document.querySelector(".reset");
const switchBtn = document.querySelector(".switch");

const convertTemp = () => {
  const temp = inputTemp.value;
  let farenheit = temp * 1.8 + 32;
  let celsius = (temp - 32) / 1.8;

  if (temp === '') result.textContent = "Podaj jakąś wartość";
  else if (tempFrom.textContent === "°C")
    result.textContent = `${temp} °C to ${farenheit.toFixed(1)} °F`;
  else result.textContent = `${temp} °F to ${celsius.toFixed(1)} °C`;
};

const switchTemp = () => {
  if (tempFrom.textContent === "°C") {
    result.textContent = "";
    inputTemp.value = "";
    tempFrom.textContent = "°F";
    tempTo.textContent = "°C";
  } else {
    result.textContent = "";
    inputTemp.value = "";
    tempFrom.textContent = "°C";
    tempTo.textContent = "°F";
  }
};

const resetCalc = () => {
  inputTemp.value = "";
  result.textContent = "";
};

convertBtn.addEventListener("click", convertTemp);
switchBtn.addEventListener("click", switchTemp);
resetBtn.addEventListener("click", resetCalc);
