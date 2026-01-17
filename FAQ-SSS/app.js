const faqs = document.querySelectorAll('.faq')

faqs.forEach(faq => {
    const question = faq.querySelector('.question')
    const answer = faq.querySelector('.answer')

    question.addEventListener('click', () => {
        const isActive = document.querySelector('.faq.active')

        //if other faq is open a other faq closeed
        if (isActive && isActive !== faq) {
            isActive.classList.remove('active')
            isActive.querySelector('.answer').style.height = 0
        }
        //open/close the clicked faq
        faq.classList.toggle('active')

        //scrollHeight gives the actual height of the content
        if (faq.classList.contains('active')) answer.style.height = `${answer.scrollHeight}px`
        else answer.style.height = 0

    })
})

