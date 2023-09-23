const sizeUpbtn = document.querySelector(".sizeUp");
const sizeDownBtn = document.querySelector(".sizeDown");
const colorBtn = document.querySelector(".color");
const text = document.querySelector(".text").firstElementChild;

function randomNumber() {
  min = 0;
  max = 255;
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomColor() {
  return `rgb(${randomNumber()}, ${randomNumber()}, ${randomNumber()})`;
}

const changeColor = () => {
  text.style.color = randomColor();
};

const currentFonSize = window.getComputedStyle(text).fontSize;
let initValue = parseInt(currentFonSize);

const fontSizeUp = () => {
  if (initValue >= 120) return;

  initValue++;
  text.style.fontSize = `${initValue}px`;
};

const fontSizeDown = () => {
  if (initValue <= 12) return;

  initValue--;
  text.style.fontSize = `${initValue}px`;
};

colorBtn.addEventListener("click", changeColor);
sizeUpbtn.addEventListener("click", fontSizeUp);
sizeDownBtn.addEventListener("click", fontSizeDown);
