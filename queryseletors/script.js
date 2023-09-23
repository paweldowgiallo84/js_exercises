const btn1 = document.querySelector(".btn1");
const btn2 = document.querySelector(".btn2");
const p1 = document.querySelector(".p1");
const p2 = document.querySelector(".p2");
const square = document.querySelector(".square");

const fun1 = () => {
  console.log("hello");
};

const fun2 = () => {
  square.style.background = "tomato";
};

const fun3 = () => {
  square.style.background = "royalblue";
};

const fun4 = () => {
  p1.classList.toggle("show");
  p2.classList.toggle("show");
};

btn1.addEventListener("click", fun1);
square.addEventListener("mouseover", fun2);
square.addEventListener("mouseout", fun3);
btn2.addEventListener("click", fun4);
