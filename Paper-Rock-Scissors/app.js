const playerResult = document.querySelector('.player__result h2')
const cpuResult = document.querySelector('.cpu__result h2')
const match = document.querySelector('.match')

const btns = document.querySelectorAll('.btn')
const playButton = document.querySelector('.play-button')
const score = document.querySelector('.score__content h3')




const option = ['paper', 'rock', 'scissors']
let playerScore = 0
let cpuScore = 0



/* BUTTON ACTİVE */
btns.forEach(btn => {
    btn.addEventListener('click', () => {
        btn.parentNode.querySelector('.active').classList.remove('active')
        btn.classList.add('active')

        const buttonId = btn.dataset.id
        playerResult.textContent = buttonId

    })
})





const checkWinner = (player, cpu) => {
    //Beraberlik
    if (player === cpu) {
        match.textContent = 'Draw'
        setTimeout(() => match.textContent = '!', 1500)
        return
    }
    //Oyuncu Kazanır ise
    if (
        (player === 'paper' && cpu === 'rock') ||
        (player === 'rock' && cpu === 'scissors') ||
        (player === 'scissors' && cpu === 'paper')
    ) {
        match.textContent = 'Player Win'
        setTimeout(() => match.textContent = '!', 1500)
        playerScore++
    }
    //Bilgisayar Kazarnı ise
    else {
        match.textContent = 'Cpu Win'
        setTimeout(() => match.textContent = '!', 1500)
        cpuScore++
    }

    score.textContent = `${playerScore} - ${cpuScore}`

}

playButton.addEventListener('click', () => {
    let cpu = option[Math.floor(Math.random() * 3)]
    let player = playerResult.textContent

    if (!option.includes(player)) {
        match.textContent = 'Lütfen Bir seçim yapınız'
        return
    }
    setTimeout(() => {
        cpuResult.textContent = cpu
        checkWinner(player, cpu)
    }, 300);

})