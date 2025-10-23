const randomBtn = document.querySelector('.randomButton')
const span = document.querySelector('.span')
const hexs = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "a", "b", "c", "d", "e", "f"]



randomBtn.addEventListener('click', () => {
    randomColor()
})

// RandomColor
const randomColor = () => {
    let hexColor = "#"
    for (let i = 0; i < 6; i++) {
        hexColor += hexs[randomNumber()]
    }
    document.body.style.backgroundColor = hexColor
    span.textContent = hexColor
}
// Random Number
function randomNumber() {
    return Math.floor(Math.random() * hexs.length)
}
