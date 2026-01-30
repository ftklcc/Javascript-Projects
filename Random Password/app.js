//Character sets for password generation
const characters = {
    lowercase: "abcdefghijklmnopqrstuvwxyz",
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    numbers: "0123456789",
    symbols: "^!$%&|[](){}:;.,*+-#@<>~"
}
//Cached DOM elements for performance and accessibility
const DOM = {
    passwordText: document.querySelector('.passwordText'),
    modal: document.querySelector('.modal'),
    copyButton: document.querySelector('.fa-copy'),
    rangeText: document.querySelector('.length'),
    rangeInput: document.getElementById('range'),
    progress: document.querySelector('.progress'),
    optionInput: document.querySelectorAll('.option input'),
    generateButton: document.querySelector('.generate')
}
//initialize application event listeners
const runEvents = () => {
    DOM.rangeInput.addEventListener('input', updateRangeInput)
    DOM.generateButton.addEventListener('click', generatePassword)
    DOM.copyButton.addEventListener('click', copyPassword)

}
//Handles range input changes and updates UI
const updateRangeInput = () => {
    const value = Number(DOM.rangeInput.value);
    DOM.rangeText.textContent = value
    updateProgress(value)
}
//Characters based on checked options
const mixValue = () => {
    let staticPassword = "";
    DOM.optionInput.forEach(input => {
        //Only add characters if the checkbox is checked
        if (input.checked) {
            staticPassword += characters[input.id]
        }
    })
    return staticPassword
}
//Generates a random password from selected character pools
const generatePassword = () => {
    const value = DOM.rangeInput.value
    const static = mixValue()

    let randomPassword = "";
    for (let i = 0; i < value; i++) {
        //Select random index from the pool
        randomPassword += static[Math.floor(Math.random() * static.length)]
    }
    DOM.passwordText.textContent = randomPassword
}
//Updates progress bar visual state based on password length
const updateProgress = (value) => {
    DOM.progress.classList
        .remove('very-weak', 'weak', 'medium', 'strong', 'very-strong')

    //Configuration for progress bar levels.
    const config = [
        { limit: 5, className: 'very-weak' },
        { limit: 10, className: 'weak' },
        { limit: 15, className: 'medium' },
        { limit: 20, className: 'strong' },
    ];

    let newClass = "very-strong";

    for (let data of config) {
        if (value <= data.limit) {
            newClass = data.className
            break;
        }
    }
    DOM.progress.classList.add(newClass)
}
//Copies generated password to clipboard and shows feedback.
const copyPassword = () => {
    const text = DOM.passwordText.textContent;
    navigator.clipboard.writeText(text)
    DOM.modal.classList.add('active')
    setTimeout(() => {
        DOM.modal.classList.remove('active')
    }, 1000);
}


document.addEventListener('DOMContentLoaded', runEvents)
