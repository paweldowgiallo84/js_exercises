const liitems = document.querySelectorAll("li");

let number = 1
for (let i = 0; i < liitems.length; i++) {
  liitems[i].textContent = number;
  liitems[i].dataset.id = number;
  number++
}

const thirdLi = document.querySelector('[data-id="3"]')

console.log(thirdLi.closest('.wraper'))


