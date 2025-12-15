const characters = {
    lowercase: "abcdefghijklmnopqrstuvwxyz",
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    numbers: "0123456789",
    symbols: "^!$%&|[](){}:;.,*+-#@<>~"
}
const rangeInput = document.getElementById('range')
const rangeText = document.querySelector('.length')
const generateButton = document.querySelector('.generate')
const options = document.querySelectorAll('.option input')
const passwordText = document.querySelector('.passwordText')
const progress = document.querySelector('.progress')

const copyButton = document.querySelector('.fa-copy')
const modal = document.querySelector('.modal')

const runEvents = () => {
    rangeInput.addEventListener('input', updateDisplay)
    generateButton.addEventListener('click', generatePassword)
    copyButton.addEventListener('click', copyPassword)
}

const updateDisplay = () => {
    rangeText.textContent = rangeInput.value
    updateProgress()
}

const generatePassword = () => {
    const value = rangeInput.value

    let staticPassword = "";
    let randomPassword = "";

    options.forEach(option => {
        if (option.checked) {
            staticPassword += characters[option.id]
        }
    })

    for (let i = 0; i < value; i++) {
        randomPassword += staticPassword[Math.floor(Math.random() * staticPassword.length)]
    }
    passwordText.textContent = randomPassword
}

const updateProgress = () => {
    const value = rangeInput.value
    progress.classList.remove('very-weak', 'weak', 'medium', 'strong', 'very-strong')

    const list = [
        { limit: 5, className: 'very-weak' },
        { limit: 10, className: 'weak' },
        { limit: 15, className: 'medium' },
        { limit: 20, className: 'strong' },
    ]
    let newClass = 'very-strong'

    for (const data of list) {
        if (value < data.limit) {
            newClass = data.className
            break
        }
    }
    progress.classList.add(newClass)
}
const copyPassword = () => {
    const text = passwordText.textContent
    navigator.clipboard.writeText(text)
        .then(() => {
            modal.classList.add('active')
            setTimeout(() => {
                modal.classList.remove('active')
            }, 1500)
        })
        .catch(err => console.log(err))
}

runEvents()