const movies = [
    {
        img: './assets/img/game-of-thrones.webp',
        name: 'Game of Thrones',
        category: 'Bilim Kurgu',
        info: 'Game of Thrones, Westeros’un yedi hanedanının Demir Taht uğruna verdiği acımasız mücadeleyi anlatır. Güç, entrika ve ihanetin hükümsürdüğü bu dünyada affetmek zayıflık, hata ise ölümcül bir bedeldir.',
        year: ' 2011'
    },
    {
        img: './assets/img/prison-break.webp',
        name: 'Prison Break',
        category: 'Suç',
        info: 'Bir inşaat mühendisi, haksız yere suçlanan kardeşinin idamını engellemek için tasarımına yardımcı olduğu hapishaneye içeriden sızarak kaçış planı yapar.',
        year: '2005'
    },
    {
        img: "./assets/img/the-boys.webp",
        name: 'The Boys',
        category: 'Bilim Kurgu',
        info: 'Haklının değil güçlünün söz sahibi olduğu bu düzende, ekip adaletin gerçekten ne anlama geldiğini herkese göstermeye kararlıdır.',
        year: '2019'
    },
    {
        img: './assets/img/dexter-new-blood.webp',
        name: 'Dexter: New Blood',
        category: 'Suç',
        info: 'Gerilim ve psikolojik derinliğiyle dikkat çeken dizi, adalet ile vicdan arasındaki ince çizgiyi yeniden sorgulatıyor.',
        year: '2011'
    }
]
const img = document.querySelector('.movImage')
const movName = document.querySelector('.name')
const category = document.querySelector('.category')
const info = document.querySelector('.info')
const year = document.querySelector('.year')


const prevBtn = document.querySelector('.prev')
const nextBtn = document.querySelector('.next')

let currentItem = 0

document.addEventListener('DOMContentLoaded', () => {
    showDisplay(currentItem)

})
//Show Display
function showDisplay(movie) {
    let item = movies[movie]
    img.src = item.img
    movName.textContent = item.name
    category.textContent = item.category
    info.textContent = item.info
    year.textContent = item.year
}
// Events
nextBtn.addEventListener('click', () => {
    currentItem++
    if (currentItem > movies.length - 1) currentItem = 0
    showDisplay(currentItem)
})
prevBtn.addEventListener('click', () => {
    currentItem--
    if (currentItem < 0) currentItem = movies.length - 1
    showDisplay(currentItem)
})