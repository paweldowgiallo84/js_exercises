const actualDay = document.querySelector(".actual__day");
const randomFunFact = document.querySelector(".fun__fact");

const FACT_API = "https://api.chucknorris.io/jokes/random";

const date = new Date
const today = date.toLocaleDateString('en-US', {weekday: 'long'})

const whatDayItIs = () => {
actualDay.textContent = today
}

 const genFunFact = () => {
 fetch(FACT_API)
 .then(response => response.json())
 .then(data => randomFunFact.textContent = data.value)
}

whatDayItIs();
genFunFact();
