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

const buttonContainer = document.querySelector('.button-container')
const sectionCenter = document.querySelector('.section-center')
const themeButton = document.querySelector('.themeButton')

document.addEventListener('DOMContentLoaded', () => {
    showButtonMenu()
    showMenu(menu)

})

const showButtonMenu = () => {
    let categories = menu.reduce((value, item) => {
        if (!value.includes(item.category)) {
            value.push(item.category)
        }
        return value
    }, ['tümü'])

    let createButton = categories.map(category => {
        return `<button type="button" class="filter-btn" data-id="${category}">${category}</button>`
    }).join("")
    buttonContainer.innerHTML = createButton
    filter()
}

const showMenu = (menuItem) => {
    let displayMenu = menuItem.map(item => {
        return ` <article class="menu-item">
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
				</article> `
    }).join("")

    sectionCenter.innerHTML = displayMenu
}

const filter = () => {
    const filterBtns = document.querySelectorAll('.filter-btn')

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const btnCategory = btn.dataset.id
            const menuCategory = menu.filter(item => {
                if (item.category === btnCategory) {
                    return item
                }
            })
            if (btnCategory === 'tümü') {
                showMenu(menu)
            } else {
                showMenu(menuCategory)
            }
        })

    })
}
themeButton.addEventListener('click', () => {
    themeButton.classList.toggle('active')
    document.body.classList.toggle('light')

    if (document.body.classList.contains('light')) {
        localStorage.setItem('bg', 'light')
    } else {
        localStorage.setItem('bg', 'dark')
    }

})

const loadTheme = () => {
    const theme = localStorage.getItem('bg')

    if (theme === 'light') {
        document.body.classList.add('light')
        themeButton.classList.add('active')
    }
}

loadTheme()