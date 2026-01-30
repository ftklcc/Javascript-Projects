import { faqs } from "./faqs.js"

const faqContainer = document.querySelector('.faq__list')
const faqsTemplate = document.getElementById('faqTemplate')

const runEvents = () => {
    renderFaqs(faqs)
    faqContainer.addEventListener('click', handleClick)
}
//Get the questions from the data and display them on the screen
const renderFaqs = (faqs) => {
    faqContainer.innerHTML = "";
    //hız kazandırma adına fragment kullanıldı.
    const fragment = document.createDocumentFragment()

    faqs.forEach(faq => {
        const clone = faqsTemplate.content.cloneNode(true)
        //clone elments
        const el = {
            question: clone.querySelector('.question h3'),
            answer: clone.querySelector('.answer p')
        }
        //faqs datasından gelen veri ile dom elemanları setlendi
        el.question.textContent = faq.question
        el.answer.textContent = faq.answer

        fragment.appendChild(clone)
    })
    faqContainer.appendChild(fragment)
}

const handleClick = (e) => {
    const question = e.target.closest('.question')
    if (!question) return;

    // li parent element selected
    const currentFaq = question.parentElement
    // all faq selected
    const allFaqs = faqContainer.querySelectorAll('.faq')
    //If the clicked and open are not equal, remove acitve
    allFaqs.forEach(faq => {
        if (faq !== currentFaq) {
            faq.classList.remove('active')
        }
    })
    //Add active class to clicked
    currentFaq.classList.toggle('active')
}

document.addEventListener('DOMContentLoaded', runEvents)