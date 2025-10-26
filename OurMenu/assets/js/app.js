const menu = [
    {
        id: 1,
        img: './assets/images/breakfast/serpmeKahvalti.jpeg',
        name: 'Serpme Kahvaltı',
        price: '800',
        category: 'kahvaltı',
        info: 'Çeşitli peynirler, zeytinler, reçeller, yumurta ve sıcak hamur işleriyle sunulan zengin ve paylaşmaya uygun kahvaltı servisi.'
    },
    {
        id: 2,
        img: './assets/images/breakfast/omlet.jpg',
        name: 'omlet',
        price: '150',
        category: 'kahvaltı',
        info: 'Omlet, çırpılmış yumurtaların tavada pişirilmesiyle yapılan, kahvaltıda sıkça tüketilen besleyici bir yemektir. İçine peynir, sebze veya et gibi malzemeler eklenerek çeşitlendirilebilir.'
    },
    {
        id: 3,
        img: './assets/images/breakfast/menemen.jpg',
        name: 'menemen',
        price: '200',
        category: 'kahvaltı',
        info: 'Menemen, domates, biber ve yumurtayla yapılan geleneksel bir Türk kahvaltı yemeğidir. Genellikle zeytinyağında sotelenmiş sebzelerin üzerine yumurta kırılarak hazırlanır.'
    },
    {
        id: 4,
        img: './assets/images/dinner/beyti.jpg',
        name: 'beyti',
        price: '420',
        category: 'ana yemek',
        info: 'Beyti, kıymadan yapılan köftenin lavaş veya yufkaya sarılıp dilimlenerek servis edildiği, üzerine domates sosu ve yoğurt eklenen lezzetli bir et yemeğidir.'
    },
    {
        id: 5,
        img: './assets/images/dinner/guvec.webp',
        name: 'Güveç',
        price: '450',
        category: 'ana yemek',
        info: 'Güveç, et ve sebzelerin toprak kapta uzun süre pişirilmesiyle hazırlanan bir yemektir. Malzemeler genellikle kuşbaşı et, patlıcan, domates, biber, soğan ve sarımsaktır.'
    },
    {
        id: 6,
        img: './assets/images/dinner/kofte-sarma.jpg',
        name: 'Köfte Sarma',
        price: '470',
        category: 'ana yemek',
        info: 'İçi kıymayla hazırlanan köftenin dışının yufka, patlıcan veya başka bir malzemeyle sarılarak pişirildiği bir yemektir. Genellikle fırında veya tavada pişirilir, üzerine domates sosu ve yoğurt eklenerek servis edilir. Hem sunumu şık hem de lezzeti zengindir.'
    },
    {
        id: 7,
        img: './assets/images/drinks/cay.webp',
        name: 'Çay',
        price: '50',
        category: 'içecekler',
        info: 'Çayımız, özenle seçilen yapraklardan hazırlanıp özel demleme yöntemiyle 15 dakika içinde taze olarak servis edilmektedir.'
    },
    {
        id: 8,
        img: './assets/images/drinks/kahve.jpg',
        name: 'Kahve',
        price: '100',
        category: 'içecekler',
        info: 'Türk kahvemiz, taze çekilmiş çekirdeklerle geleneksel cezve yöntemiyle pişirilerek köpüğüyle birlikte sıcak olarak servis edilmektedir.'
    },
    {
        id: 9,
        img: './assets/images/drinks/limonata.jpg',
        name: 'limonata',
        price: '130',
        category: 'içecekler',
        info: 'Limonatamız, taze sıkılmış limon suyu ve doğal şekerle hazırlanarak soğuk ve ferahlatıcı şekilde servis edilmektedir.'
    },
]

const sectionCenter = document.querySelector('.section-center')
const buttonContainer = document.querySelector('.button-container')

const modeToggle = document.querySelector('.darkLight')

//Load Menu and Button
document.addEventListener('DOMContentLoaded', () => {
    displayMenuItem(menu)
    createButton()
    filter()
})
//*Show all Menu
const displayMenuItem = menuItem => {
    let displayMenu = menuItem.map(item => {
        return `<article class="menu-item">
					<img src="${item.img}" alt="${item.name}" class="menu-img" />
					<div class="menu-info">
						<header>
							<h4>${item.name}</h4>
							<h4 class="price">${item.price} TL</h4>
						</header>
						<p class="menu-text">
							${item.info}
						</p>
					</div>
				</article>`
    }).join("")
    sectionCenter.innerHTML = displayMenu
}
//*Create Button
const createButton = () => {
    let categories = menu.reduce((value, item) => {
        if (!value.includes(item.category)) {
            value.push(item.category)
        }
        return value
    }, ['tümü'])
    let dispayButtonMenu = categories.map(category => {
        return `<button type="button" class="filter-btn" data-id="${category}">${category}</button>`
    }).join("")
    buttonContainer.innerHTML = dispayButtonMenu


}
//* Filter menu
const filter = () => {
    const filterBtn = document.querySelectorAll('.filter-btn')
    filterBtn.forEach(btn => {
        btn.addEventListener('click', e => {
            const btnCategory = e.currentTarget.dataset.id
            const menuCategory = menu.filter(item => {
                if (btnCategory === item.category) {
                    return item.category
                }
            })
            if (btnCategory === 'tümü') {
                displayMenuItem(menu)
            } else {
                displayMenuItem(menuCategory)
            }
        })
    })
}

//* mode Dark Light
if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark')
    modeToggle.classList.add('active')
}

modeToggle.addEventListener('click', () => {
    modeToggle.classList.toggle('active')
    document.body.classList.toggle('dark')
    if (document.body.classList.contains('dark')) {
        localStorage.setItem('theme', 'dark')
    } else {
        localStorage.setItem('theme', 'light')
    }
})

