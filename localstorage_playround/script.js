const body = document.querySelector("body");

let input;
let setBtn;
let remBtn;
let showItems;

let arr = localStorage.getItem("list")
  ? JSON.parse(localStorage.getItem("list"))
  : [];

const main = () => {
  prepareDOMElements();
  prepareDOMEvents();
};

const prepareDOMElements = () => {
  input = document.querySelector(".input");
  setBtn = document.querySelector(".setToLocalStorage");
  remBtn = document.querySelector(".remFromLocalStorage");
  showItems = document.querySelector(".localStorageItems");
};

prepareDOMEvents = () => {
  setBtn.addEventListener("click", setToLocalStorae);
  remBtn.addEventListener("click", removeFromLocalStorage);
  showItems.addEventListener("click", selectToRemove);
};

const setToLocalStorae = () => {
  arr.push(input.value);
  localStorage.setItem("list", JSON.stringify(arr));
  renderList();
  input.value = "";
};

const selectToRemove = (e) => {
  input.value = e.target.textContent;
};

const removeFromLocalStorage = (e) => {
  const findeElement = arr.findIndex((word) => word === input.value);
  const newArr = arr
    .slice(0, findeElement)
    .concat(arr.slice(findeElement + 1, arr.length));
  localStorage.removeItem("list");
  localStorage.setItem("list", JSON.stringify(newArr));
  location.reload()
};

const renderList = () => {
  showItems.replaceChildren("");
  if (arr.length > 0) {
    arr.map((item, index) => {
      const newItem = document.createElement("li");
      newItem.classList.add("item");
      newItem.textContent = item;
      newItem.setAttribute("id", index + 1);
      showItems.append(newItem);
    });
  } else {
    console.log("brak itemow do wyswietlenia");
  }
};

const LoadAtOpen = () => {
  renderList();
};

window.onload = LoadAtOpen;
document.addEventListener("DOMContentLoaded", main);
