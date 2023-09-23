const pass = document.querySelector("#password");
const p = document.querySelector(".passinfo");
const letters = /[a-z]/gi;
const numbers = /[0-9]/;
const special = /[!@#$%^&*()]/;
const minValue = 10;

const validateLength = (e) => {
  const userPass = e.target.value;
  const foundLetters = userPass.match(letters);
  const foundNumbers = userPass.match(numbers);
  const foundSpecial = userPass.match(special);

  const notValid = userPass.length < minValue;
  const valid = userPass.length > minValue && foundLetters && foundNumbers;
  const superValid =
    userPass.length > minValue && foundLetters && foundNumbers && foundSpecial;

  if (notValid) {
    p.innerText = "Masz złe hasło";
    p.style.color = "red";
  }
  if (valid) {
    p.innerText = "Masz dobre hasło";
    p.style.color = "gold";
  }
  if (superValid) {
    p.innerText = "Masz super hasło";
    p.style.color = "green";
  } else if (userPass === "") {
    p.textContent = "Nie podałeś hasła...";
    p.style.color = "";
  }
};

pass.addEventListener("input", validateLength);
