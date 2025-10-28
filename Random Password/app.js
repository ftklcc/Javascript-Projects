const btn = document.querySelector('.genereate')
const text = document.querySelector('.passInput')
const cop = document.querySelector('.fa-copy')
const alert = document.querySelector('.alert')

const passWord = [
    ..."abcdefghijklmnopqrstuvwxyz",
    ..."ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    ..."0123456789",
    ..."!@#$%^&*()_+-=[]{}"
];
// Şifre oluşturmak için
btn.addEventListener('click', () => {
    random()
})
// Kopyalamak için
cop.addEventListener('click', () => {
    copyPassWord()
})

const random = () => {
    let pass = ""
    for (let i = 0; i < 16; i++) {
        pass += passWord[randomNumber()]
    }
    text.value = pass
}

const randomNumber = () => {
    return Math.floor(Math.random() * passWord.length)
}

const copyPassWord = () => {
    navigator.clipboard.writeText(text.value)
        .then(() => {
            if (text.value === "") {
                displayAlert('danger', 'Şifre oluşturunuz')
            } else {
                cop.closest(['.form']).classList.add('active')
                setTimeout(() => {
                    cop.closest(['.form']).classList.remove('active')
                }, 1000)
            }
        })
        .catch(err => {
            alert(err, 'Hata')
        })
};

const displayAlert = (type, message) => {
    alert.textContent = message
    alert.classList.add(`alert-${type}`)
    setTimeout(() => {
        alert.textContent = ""
        alert.classList.remove(`alert-${type}`)
    }, 1000);
}