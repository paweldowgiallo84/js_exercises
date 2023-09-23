const randomImage = document.querySelector("img");

randomImage.setAttribute("src", "https://picsum.photos/800/600");
randomImage.setAttribute("alt", "randome image");


const consoleLogCokolwiek = () => {
    console.log('cokolwiek')
}

setTimeout(() => {
  consoleLogCokolwiek();
}, 2000);
