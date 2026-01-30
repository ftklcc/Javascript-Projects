import { movies } from "./data.js";
//DOM element references.
const DOM = {
    card: document.querySelector('.card'),
    prevButton: document.querySelector('.prev'),
    nextButton: document.querySelector('.next'),
    image: document.querySelector('.movImage'),
    name: document.querySelector('.name'),
    category: document.querySelector('.category'),
    info: document.querySelector('.info'),
    year: document.querySelector('.year')
}
// Active movie index
let currentIndex = 0

//Initialize application events
const initApp = () => {
    showMovies(currentIndex)
    DOM.prevButton.addEventListener('click', prevSlider)
    DOM.nextButton.addEventListener('click', nextSlider)
}
//Handles displaying the movie with fade & slide animation
const showMovies = current => {
    //Get movie data from array
    const item = movies[current]
    //Destructure movie properties
    const { img, name, category, info, year } = item

    //starting value for card animation
    DOM.card.style.transition = 'all 0.3s ease'
    DOM.card.style.opacity = 0
    DOM.card.style.transform = 'translateY(-20px)'

    //We set the values from data.js to the HTML elements.
    DOM.image.src = img;
    DOM.image.alt = name;
    DOM.name.textContent = name;
    DOM.category.textContent = category;
    DOM.info.textContent = info;
    DOM.year.textContent = year;

    //animation triggered with delay
    setTimeout(() => {
        DOM.card.style.transform = 'translateY(0)'; // fade in
        DOM.card.style.opacity = 1
    }, 400)
}
//Decrease index for previous slider
const prevSlider = () => {
    currentIndex--
    if (currentIndex < 0) currentIndex = movies.length - 1
    showMovies(currentIndex)
}
//Increase index for next slider
const nextSlider = () => {
    currentIndex++
    if (currentIndex >= movies.length) currentIndex = 0
    showMovies(currentIndex)
}

document.addEventListener('DOMContentLoaded', initApp)