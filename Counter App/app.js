const text = document.querySelector('.text')
const btns = document.querySelectorAll('.btn')
let count = 0

// button display event
btns.forEach(btn => {

    btn.addEventListener('click', (e) => {
        if (btn.classList.contains('decrease')) count--
        else if (btn.classList.contains('increase')) count++
        else count = 0
        updateDisplay()
    })
})

// show Display
function updateDisplay() {
    text.innerHTML = count
    if (count > 0) text.style.color = 'green'
    else if (count < 0) text.style.color = 'red'
    else text.style.color = '#3b3b3b'
}

// Keyborad event
document.addEventListener('keydown', e => {
    if (e.key === '+') count++
    else if (e.key === '-') count--
    else if (e.key === '0') count = 0




    updateDisplay()
})