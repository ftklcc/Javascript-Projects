import { questions } from './questions.js'


const DOM = {
    configScreen: document.querySelector('.config-screen'),
    quizScreen: document.querySelector('.quiz-screen'),
    endScreen: document.querySelector('.end-screen'),
    questionOptions: document.querySelector('.question-options'),
    categoryOptions: document.querySelector('.category-options'),
    //-----------------------------------------------------------
    startButton: document.querySelector('.start-button'),
    nextButton: document.querySelector('.next-button'),
    restartButton: document.querySelector('.restart-button'),
    //-----------------------------------------------------------
    quizTime: document.querySelector('.time'),
    question: document.querySelector('.question'),
    questionNumber: document.querySelector('.quiz-footer h4'),
    resultMessage: document.querySelector('.end-screen p'),

}

let c = 'matematik'
const QUİZ_TIME_LIMIT = 10;
let currentTime = QUİZ_TIME_LIMIT
let timer = null;

let currentQuestion = null;
let numberOfQuestion = 5;
let indexHistory = []
let score = 0;









const runEvents = () => {
    renderQuestion()
    DOM.nextButton.addEventListener('click', renderQuestion)
    DOM.restartButton.addEventListener('click', showConfig)
    DOM.startButton.addEventListener('click', startQuiz)
    document.addEventListener('DOMContentLoaded', showConfigButton)
}


const resetTimer = () => {
    clearInterval(timer)
    currentTime = QUİZ_TIME_LIMIT
    DOM.quizTime.innerHTML = `${currentTime}s`
}

const startTimer = () => {
    timer = setInterval(() => {
        currentTime--
        DOM.quizTime.innerHTML = `${currentTime}s`

        if (currentTime <= 0) {
            clearInterval(timer)
            highLightAnswer()
            DOM.nextButton.classList.remove('hidden')
            DOM.questionOptions.querySelectorAll('.question-option')
                .forEach(option => option.style.pointerEvents = 'none')
        }
    }, 1000)
}

const getRandomQuestion = () => {
    //tüm sorular arasından kategoriyi bul
    const foundCategory = questions.find(cat => cat.category === c).questions || [];
    //eğer sorulan soru sayısı istenen soru sayısına eşit veya büyükse quiz bitti
    if (indexHistory.length >= numberOfQuestion) {
        showResultScreen()
        return
    }
    //daha önce sorulmamış sorular
    const availableQuestion = foundCategory
        .filter((_, index) => !indexHistory.includes(index))
    //rastgele soru
    const randomQuestion = availableQuestion[Math.floor(Math.random() * availableQuestion.length)]
    //rastgele sorunun indexi
    const randomQuestionIndex = foundCategory.indexOf(randomQuestion)
    //sorulan sorunun indexini history'e ekle
    indexHistory.push(randomQuestionIndex)

    return randomQuestion
}
const renderQuestion = () => {
    currentQuestion = getRandomQuestion()
    if (!currentQuestion) return
    resetTimer()
    startTimer()
    //Seçenekleri temizle
    DOM.questionOptions.innerHTML = ""
    //Yeni souruyu ekle
    DOM.question.textContent = currentQuestion.question
    //Next button gizle
    DOM.nextButton.classList.add('hidden')
    //Soru numarasını güncelle
    DOM.questionNumber.innerHTML = `${indexHistory.length} / ${numberOfQuestion}`
    //Seçenekleri ekle 
    currentQuestion.options.forEach((option, index) => {
        const li = document.createElement('li')
        li.className = 'question-option'
        li.innerHTML = option
        DOM.questionOptions.appendChild(li)
        //Seçeneklere tıklama eventi ekle
        li.addEventListener('click', () => handleAnswer(li, index))
    })
}

const handleAnswer = (li, index) => {
    //Doğru cevabı kontrol et
    const isCorrect = currentQuestion.correctAnswer === index
    //Seçeneğe doğru veya yanlış classı ekle
    li.classList.add(isCorrect ? 'correct' : 'incorrect')
    //Yanlış cevap seçildiğinde doğru cevabı göster ve score gunceleme
    !isCorrect ? highLightAnswer() : score++;
    clearInterval(timer)
    //Next button göster
    DOM.nextButton.classList.remove('hidden')
    //Tıklama işlemi sonrası Tüm seçenekleri pasif yap
    DOM.questionOptions.querySelectorAll('.question-option')
        .forEach(option => option.style.pointerEvents = 'none')

}
//Doğru cevabı göster
const highLightAnswer = () => {
    //Doğru cevabın li elementini bul
    const correctLi = DOM.questionOptions.querySelectorAll('.question-option')[currentQuestion.correctAnswer]
    //Doğru cevaba correct classı ekle
    correctLi.classList.add('correct')
}

const showResultScreen = () => {
    DOM.quizScreen.classList.add('hidden')
    DOM.endScreen.classList.remove('hidden')
    DOM.resultMessage.textContent = `${numberOfQuestion} soruda ${score} doğru cevap !`
}
//Show Config Screen
const showConfig = () => {
    DOM.endScreen.classList.add('hidden')
    DOM.configScreen.classList.remove('hidden')
    resetQuiz()
    resetTimer()
}
//Start Quiz 
const startQuiz = () => {
    DOM.configScreen.classList.add('hidden')
    DOM.quizScreen.classList.remove('hidden')
    c = document.querySelector('.category-option.active').textContent.toLowerCase()
    numberOfQuestion = parseInt(DOM.configScreen.querySelector('.number-option.active').textContent)
    resetQuiz()
    resetTimer()
    renderQuestion()
}
const resetQuiz = () => {
    indexHistory = []
    score = 0
}
//Config Button Active inActive
DOM.configScreen.querySelectorAll('.number-option').forEach(option => {
    option.addEventListener('click', () => {
        //Aktif olanı pasif yap
        option.parentNode.querySelector('.active').classList.remove('active')
        //Tıklananı aktif yap
        option.classList.add('active')
    })
})

//Questions'dan Category Başlıklarından alınıyor yeni bir kategori eklendiğinde 
//Otomatik tekrar buton eklenecektır.
const showConfigButton = () => {
    DOM.categoryOptions.innerHTML = "";
    questions.forEach((cat) => {
        const button = document.createElement('button')
        button.className = 'category-option'
        button.textContent = cat.category
        button.type = 'button'
        if (cat.category.toLowerCase() === c) {
            button.classList.add('active')
        }
        DOM.categoryOptions.appendChild(button)

    })
    DOM.categoryOptions.querySelectorAll('.category-option').forEach(option => {
        option.addEventListener('click', () => {
            option.parentNode.querySelector('.active').classList.remove('active')
            option.classList.add('active')
        })
    })
}


runEvents()
