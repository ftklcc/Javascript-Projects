const characters = {
    lowercase: "abcdefghijklmnopqrstuvwxyz",
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    numbers: "0123456789",
    symbols: "^!$%&|[](){}:;.,*+-#@<>~"
}
// Range variables
const rangeInput = document.querySelector('.range')
const rangeText = document.querySelector('.length')

const generateBtn = document.querySelector('.generate')
const options = document.querySelectorAll('.option input')
const passwordText = document.querySelector('.passwordText')
const progress = document.querySelector('.progress')
const copyBtn = document.querySelector('.fa-copy')
const modal = document.querySelector('.modal')

const runEvents = () => {
    rangeInput.addEventListener('input', updateDisplay)
    generateBtn.addEventListener('click', generatePassword)
    copyBtn.addEventListener('click', copyPassword)
}
// Dynamically updates progress and range
const updateDisplay = () => {
    rangeText.textContent = rangeInput.value
    updateProgress()
}
//Password generation function.
const generatePassword = () => {
    const value = rangeInput.value;

    let staticPassword = "";
    let randomPassword = "";
    //Generates password based on selected checkboxes.
    options.forEach(option => {
        if (option.checked) {
            staticPassword += characters[option.id]
        };
    });
    //Loop generates random password.
    for (let i = 0; i < value; i++) {
        randomPassword += staticPassword[Math.floor(Math.random() * staticPassword.length)];
    };
    passwordText.textContent = randomPassword;
}
//Update Progress line
const updateProgress = () => {
    progress.classList.remove('very-weak', 'weak', 'medium', 'strong', 'very-strong')
    const value = rangeInput.value

    const levels = [
        { limit: 4, className: 'very-weak' },
        { limit: 8, className: 'weak' },
        { limit: 14, className: 'medium' },
        { limit: 21, className: 'strong' },
    ]
    let newClass = 'very-strong';

    for (const levelData of levels) {
        if (value < levelData.limit) {
            newClass = levelData.className
            break;
        }
    }
    progress.classList.add(newClass)
}
//Copy password
const copyPassword = () => {
    const copyText = passwordText.textContent;
    navigator.clipboard.writeText(copyText)
        .then(() => {
            showCopy()
        })
        .catch(err => {
            alert('An error occurred during copying.', err)
        })
}
// modal isActive
const showCopy = () => {
    modal.classList.add('active')
    setTimeout(() => {
        modal.classList.remove('active')
    }, 1500)
}




runEvents()