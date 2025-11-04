const inputs = document.querySelectorAll('.otp-input')
const btn = document.querySelector('.input-btn')

inputs.forEach((input, index) => {
    input.addEventListener('keyup', e => {
        let currentInput = input
        let nextInput = inputs[index + 1]
        let prevInput = inputs[index - 1]

        //*kontrol yapılır ve aynı inputa 2.sayı yazılırsa siler ve durdurur.
        if (currentInput.value.length > 1) {
            currentInput.value = "";
            return;
        }
        if (nextInput && nextInput.hasAttribute('disabled') && currentInput.value !== "") {
            nextInput.removeAttribute('disabled')
            nextInput.focus()
        }
        if (e.key === "Backspace" && currentInput.value === "") {
            if (prevInput) {
                currentInput.setAttribute('disabled', true)
                prevInput.focus()
            }
        }
        if ([...inputs].every(input => input.value !== "")) {
            btn.classList.add('active')
            btn.removeAttribute('disabled')
        } else {
            btn.classList.remove('active')
        }

    })
})

window.addEventListener('DOMContentLoaded', () => inputs[0].focus())