const modeToggle = document.querySelector('.darkLight-box')
const searchBox = document.querySelector('.search-box')
const body = document.querySelector('body')
const hamburger = document.querySelector('.hamburger-box')

if (localStorage.getItem('theme') === 'dark') {
    body.classList.add('dark')
    modeToggle.classList.add('active')
}

modeToggle.addEventListener('click', () => {
    modeToggle.classList.toggle('active')
    body.classList.toggle('dark')
    //* Local Save
    if (body.classList.contains('dark')) {
        localStorage.setItem('theme', 'dark')
    } else {
        localStorage.setItem('theme', 'light')
    }
})

searchBox.addEventListener('click', () => {
    searchBox.classList.toggle('active')
})
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active')
})