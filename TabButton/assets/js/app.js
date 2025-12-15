const about = document.querySelector('.about')
const btns = document.querySelectorAll('.btn')
const contents = document.querySelectorAll('.content')

about.addEventListener('click', (e) => {
    const btnDataset = e.target.dataset.id
    if (!btnDataset) return

    btns.forEach(btn => btn.classList.remove('active'))
    contents.forEach(content => content.classList.remove('active'))

    e.target.classList.add('active')

    const el = document.getElementById(btnDataset)
    if (el) el.classList.add('active')
})