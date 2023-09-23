const menuBtns = document.querySelector('.burger')
const openBtn = document.querySelector('.fa-bars')
const closeBtn = document.querySelector('.fa-xmark')
const menu = document.querySelector('ul')

const showMenu = () => {
    menuBtns.classList.toggle('active')
    menu.classList.toggle('active')
    openBtn.classList.toggle('hide')
    closeBtn.classList.toggle('hide')
}

menuBtns.addEventListener('click', showMenu)