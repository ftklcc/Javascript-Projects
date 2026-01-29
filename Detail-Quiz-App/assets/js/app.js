import { questions } from './questions.js'

//Centralized DOM element references
const DOM = {
    //screens
    configScreen: document.querySelector('.config-screen'),
    quizScreen: document.querySelector('.quiz-screen'),
    endScreen: document.querySelector('.end-screen'),

    //buttons
    startButton: document.querySelector('.start-button'),
    nextButton: document.querySelector('.next-button'),
    restartButton: document.querySelector('.restart-button'),

    //Configuration options
    categoryOptions: document.querySelector('.category-options'),
    numberOptions: document.querySelector('.number-options'),

    //Quiz elements
    questionText: document.querySelector('.question'),
    questionOptions: document.querySelector('.question-options'),
    questionStatus: document.querySelector('.quiz-footer h4'),
    resultMessage: document.querySelector('.end-screen p'),
    quizTime: document.querySelector('.time')
}


//Application state management
const QUIZ_TIME_LIMIT = 10;
let currentTime = QUIZ_TIME_LIMIT
let timer = null;

let selectedCategory = 'matematik'
let indexHistory = new Set()
let totalQuestion = 5;
let currentQuestion = null;
let score = 0;




//Entry point of the application
const initApp = () => {
    renderQuestion()
    DOM.nextButton.addEventListener('click', renderQuestion)
    DOM.restartButton.addEventListener('click', configScreen)
    DOM.startButton.addEventListener('click', startQuiz)
    createCategoryButtons()
    activeNumberQuestion()
}

//Returns a random unanswered question from selected category
const getRandomQuestion = () => {
    const foundCategory = questions.find(q => q.category === selectedCategory).questions || [];
    if (!foundCategory) return;

    //Get indexes of unused questions
    const availableQuestion = foundCategory
        .map((_, i) => i)
        .filter(i => !indexHistory.has(i))

    //Stop quiz if question limit reached
    if (indexHistory.size >= totalQuestion) {
        return endQuiz();
    }

    const randomIndex = Math.floor(Math.random() * availableQuestion.length);
    const randomQuestion = availableQuestion[randomIndex]
    indexHistory.add(randomQuestion);

    console.log(indexHistory);
    return foundCategory[randomQuestion]
}

//Renders question content to UI
const renderQuestion = () => {
    currentQuestion = getRandomQuestion()
    if (!currentQuestion) return;

    resetTimer()
    startTimer()

    //at the beginning options list clear
    DOM.questionOptions.innerHTML = "";
    //show question
    DOM.questionText.textContent = currentQuestion.question
    //hidden again in the new question
    DOM.nextButton.classList.add('hidden')
    DOM.questionStatus.textContent = `${indexHistory.size} / ${totalQuestion}`
    DOM.quizTime.textContent = `${currentTime}s`



    currentQuestion.options.forEach((option, index) => {
        const li = document.createElement('li');
        li.classList.add('question-option')
        li.innerHTML = option
        DOM.questionOptions.appendChild(li)
        li.addEventListener('click', () => handleAnswer(li, index))
    })
}
//correct or incorrect answer
const handleAnswer = (li, index) => {
    //returns false or true when clicked
    // datadaki correct answer ile yukarıdaki li index eşit ise
    const isCorrect = currentQuestion.correctAnswer === index
    //Add class based on true/false status
    li.classList.add(isCorrect ? 'correct' : 'incorrect')

    //yanlış cevap'da doğru cevap yeşil yanacak/ true değer'de
    //doğru cevap'da ise score'a +1 eklenecek./ false değer'de
    !isCorrect ? highlightAnswer() : score++;
    clearInterval(timer)
    //second click blocked
    DOM.questionOptions.querySelectorAll('.question-option')
        .forEach(opt => opt.style.pointerEvents = 'none')
    DOM.nextButton.classList.remove('hidden')
}

const highlightAnswer = () => {
    const correctLi = DOM.questionOptions
        .querySelectorAll('.question-option')[currentQuestion.correctAnswer]
    correctLi.classList.add('correct')
}
//starts the countdown timer
const startTimer = () => {
    timer = setInterval(() => {
        currentTime--
        DOM.quizTime.textContent = `${currentTime}s`


        if (currentTime <= 0) {
            clearInterval(timer)
            highlightAnswer()
            DOM.questionOptions.querySelectorAll('.question-option')
                .forEach(opt => opt.style.pointerEvents = 'none')
            DOM.nextButton.classList.remove('hidden')

        }
    }, 1000)
}
//resets timer 
const resetTimer = () => {
    clearInterval(timer);
    currentTime = QUIZ_TIME_LIMIT;
    DOM.quizTime.textContent = `${currentTime}s`
}
//ends the quiz and shows result screen
const endQuiz = () => {
    DOM.quizScreen.classList.add('hidden')
    DOM.endScreen.classList.remove('hidden')
    DOM.resultMessage.textContent = `${totalQuestion} soru da ${score} doğru cevap ! `
    resetQuiz()
}
//show config screen
const configScreen = () => {
    DOM.endScreen.classList.add('hidden')
    DOM.configScreen.classList.remove('hidden')
    resetQuiz()
}
//start quiz with selected options
const startQuiz = () => {
    DOM.configScreen.classList.add('hidden')
    DOM.quizScreen.classList.remove('hidden')

    selectedCategory = DOM.categoryOptions
        .querySelector('.category-option.active').textContent.toLowerCase()

    totalQuestion = parseInt(DOM.numberOptions
        .querySelector('.number-option.active').textContent
    )


    resetQuiz()
    resetTimer()
    renderQuestion()
}
//reset quiz auxiliary function
const resetQuiz = () => {
    indexHistory.clear()
    score = 0
}
//create category selection buttons
const createCategoryButtons = () => {
    //Extract category names
    const category = questions.map(q => q.category)
    if (!category) return;

    category.forEach(item => {
        const button = document.createElement('button')
        button.textContent = item
        button.type = 'button'
        button.classList.add('category-option')
        DOM.categoryOptions.appendChild(button)
    })
    //set first button as active
    const firstButton = DOM.categoryOptions.querySelector('.category-option')
    firstButton.classList.add('active')

    const allButton = DOM.categoryOptions.querySelectorAll('.category-option')

    allButton.forEach(btn => {
        btn.addEventListener('click', (e) => {
            btn.parentNode.querySelector('.active').classList.remove('active')
            e.target.classList.add('active')
        })
    })

}
//handles question count selection
const activeNumberQuestion = () => {
    DOM.configScreen.querySelectorAll('.number-option').forEach(option => {
        option.addEventListener('click', () => {
            option.parentNode.querySelector('.active').classList.remove('active')
            option.classList.add('active')
        })
    })
}





document.addEventListener('DOMContentLoaded', initApp)