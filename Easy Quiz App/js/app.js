const questionText = document.querySelector('.quesion')
const answers = document.querySelector('.answers')
const questionStatus = document.querySelector('.quiz-screen-footer p')
const resultMessage = document.querySelector('.result-screen p')

//*Buttons
const startBtn = document.querySelector('.start-btn')
const nextBtn = document.querySelector('.next-btn')
const tryAgainBtn = document.querySelector('.try-again')
//* Screen container
const startContainer = document.querySelector('.start-screen')
const quizContainer = document.querySelector('.quiz-screen')
const resultContainer = document.querySelector('.result-screen')

const numberOfQuestions = 10;
let currentQuestion = null;
let questionIndexHistory = []
let correctAnswerCount = 0



const runEvents = () => {
    render()
    nextBtn.addEventListener('click', render)
    startBtn.addEventListener('click', startQuiz)
    tryAgainBtn.addEventListener('click', restartQuiz)
}




const getRandomQuestion = () => {

    if (questionIndexHistory.length >= Math.min(questions.length, numberOfQuestions)) {
        return endScreen()
    }

    //Sorular 10 ise 9'a düşer ve aynı soruyu sormaz...
    const availableQuestion = questions.filter((_, index) => !questionIndexHistory.includes(index))
    //Kalan sorular içinden random soru verir.
    const randomQuestion = availableQuestion[Math.floor(Math.random() * availableQuestion.length)]
    //Kalan soruları pushlar
    questionIndexHistory.push(questions.indexOf(randomQuestion))
    return randomQuestion
}
const render = () => {
    if (questionIndexHistory.length >= numberOfQuestions || questionIndexHistory.length >= questions.length) {
        endScreen()
        return;
    }
    currentQuestion = getRandomQuestion()
    if (!currentQuestion) return;

    questionText.textContent = currentQuestion.question
    answers.innerHTML = "";
    nextBtn.style.display = 'none'
    questionStatus.innerHTML = `<b>${questionIndexHistory.length} of <b>${numberOfQuestions}</b></b>`
    currentQuestion.answers.forEach((option, index) => {
        const li = document.createElement('li')
        li.classList.add('answer')
        li.innerHTML = option;
        answers.appendChild(li)
        li.addEventListener('click', () => handleAnswer(li, index))
    })
}
const handleAnswer = (li, index) => {
    const isCorrect = currentQuestion.correct === index
    li.classList.add(isCorrect ? 'correct' : 'incorrect')

    !isCorrect ? highlightAnswer() : correctAnswerCount++;
    nextBtn.style.display = 'block'
    answers.querySelectorAll('.answer').forEach(ans => ans.style.pointerEvents = 'none')
}
const highlightAnswer = () => {
    const correctLi = answers.querySelectorAll('.answer')[currentQuestion.correct]
    correctLi.classList.add('correct')
}
const endScreen = () => {
    quizContainer.style.display = 'none'
    resultContainer.style.display = 'block'
    resultMessage.innerHTML = `<b>${correctAnswerCount}</b> of <b>${numberOfQuestions}</b>`
}
const startQuiz = () => {
    startContainer.style.display = 'none'
    quizContainer.style.display = 'block'
    questionIndexHistory = [];
    correctAnswerCount = 0;
    render();
}
const restartQuiz = () => {
    resultContainer.style.display = 'none';
    startContainer.style.display = 'block'
    questionIndexHistory = [];
    correctAnswerCount = 0
}


runEvents()
