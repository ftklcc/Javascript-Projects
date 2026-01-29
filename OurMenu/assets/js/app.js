import { allMenu } from "./data.js";
//Cache DOM elements for performance.
const DOM = {
    menuCardTemplate: document.getElementById('menuCardTemplate'),
    menuList: document.querySelector('.section-center'),
    buttonContainer: document.querySelector('.button-container'),
    themeButton: document.querySelector('.themeButton'),
    body: document.body
}
//Initialize the application
const initApp = () => {
    renderButton()
    renderMenu(allMenu)
    runEvents()
    loadTheme()

}
//Attach event listeners to DOM elements
const runEvents = () => {
    DOM.buttonContainer.addEventListener('click', filterMenu)
    DOM.themeButton.addEventListener('click', toggleTheme)
}




//Renders the menu list by cloning the template.
const renderMenu = (menuItem) => {
    // Reset container to avoid stale data
    DOM.menuList.innerHTML = "";
    //Create an in-memory container to batch DOM updates efficiently.
    const fragment = document.createDocumentFragment();

    menuItem.forEach(menu => {
        //Destructure menu object for direct property access.
        const { id, img, info, name, price } = menu;

        //Clone the template structure for a new instance
        const clone = DOM.menuCardTemplate.content.cloneNode(true)

        //Select elements inside the card
        const card = {
            img: clone.querySelector('.menu-img'),
            name: clone.querySelector('.menu-info h4'),
            price: clone.querySelector('.price'),
            menuDesc: clone.querySelector('.menu-text')
        };

        // Inject data into cloned elements
        card.img.src = img;
        card.name.textContent = name;
        card.price.textContent = `${Number(price).toFixed(2)}₺`;
        card.menuDesc.textContent = info

        fragment.appendChild(clone);

    })
    // Commit all updates to DOM in a single operation
    DOM.menuList.appendChild(fragment);
}
//Renders the button list 
const renderButton = () => {
    DOM.buttonContainer.innerHTML = "";

    //Remove duplicates with Set
    const categories = ['tümü', ...new Set(allMenu.map(item => item.category))]

    categories.forEach(category => {
        const button = document.createElement('button')
        button.className = "filter-btn"
        button.type = 'button'
        button.dataset.id = category
        button.textContent = category
        DOM.buttonContainer.appendChild(button)
    })



}
//Filter menu items when a category button is clicked
const filterMenu = (e) => {
    const btn = e.target.closest('.filter-btn')
    //Ignore clicks outside buttons
    if (!btn) return;

    const btnCategory = btn.dataset.id
    // filtre sonucu buraya gelecek
    let menuCategory;


    if (btnCategory === 'tümü') {
        //Show all items
        menuCategory = allMenu
    } else {
        //filter only matching category
        menuCategory = allMenu.filter(item => item.category === btnCategory)
    }
    //render filtered list
    renderMenu(menuCategory)
}

//Toggle between light and dark theme
const toggleTheme = () => {
    DOM.body.classList.toggle('light')
    DOM.themeButton.classList.toggle('active')

    //Save current theme to localStorage
    const isLight = DOM.body.classList.contains('light')
    localStorage.setItem('theme', isLight ? 'light' : 'dark')
}

//Load saved theme preference from localstorage
const loadTheme = () => {
    const getTheme = localStorage.getItem('theme')
    if (getTheme === 'light') {
        DOM.body.classList.add('light')
        DOM.themeButton.classList.add('active')
    }
}

document.addEventListener('DOMContentLoaded', initApp)