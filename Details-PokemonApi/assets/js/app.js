const pokemonLists = document.querySelector('.pokemon__lists')
const modal = document.querySelector('.modal__overlay')
const closeModalButton = document.querySelector('.cancel__modal')
const searchInput = document.querySelector('.search')

const POKEMON_LIMIT = 151

//ALL EVENTS
const runEvents = () => {
    getFetchPokemons()
    closeModalButton.addEventListener('click', closeModal)
    searchInput.addEventListener('keyup', filter)
}

//FETCH APİ POKEMONS
const getFetchPokemons = async () => {
    const params = new URLSearchParams({
        offset: 0,
        limit: POKEMON_LIMIT
    })
    const url = `https://pokeapi.co/api/v2/pokemon`

    try {
        const response = await fetch(`${url}?${params}`)
        if (!response.ok) throw new Error('Api isteği reddedildi', response.status)
        const datas = await response.json()

        //Tüm datanın sıralı gelmesi adına for of döngüsü kullanıyoruz..
        //ForEach veya map 'de sıralı gelmeyebilir ilk geleni dönderir.

        for (const details of datas.results) {
            const getPokemons = await fetch(details.url)
            const pokemon = await getPokemons.json()

            createPokemonCard(pokemon)
        }

    } catch (error) {
        console.error('Hata', error);
    }
}
//CREATE CARD POKEMONS
const createPokemonCard = pokemon => {
    //Fetch Data elements
    const id = String(pokemon.id).padStart(3, '0')
    const img = pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default
    const firtType = pokemon.types[0].type.name

    const li = document.createElement('li')
    li.className = `pokemon__card ${firtType}`
    li.innerHTML = `<span class="pokemon__id">#${id}</span>
					<img src="${img}" alt="${pokemon.name}" />
					<h3 class="pokemon__name">${pokemon.name}</h3>`

    //create type Badge Wrapper
    const typeWrapper = document.createElement('article')
    typeWrapper.className = `pokemon__badge-wrapper`
    typeWrapper.innerHTML = pokemon.types.map(item => {
        return `<span class="pokemon__badge ${item.type.name}">${item.type.name}</span>`
    }).join("")


    li.appendChild(typeWrapper)
    pokemonLists.appendChild(li)

    li.addEventListener('click', () => createDetailsCard(pokemon))

}
//SHOW DETAİL CARD POKEMONS
const createDetailsCard = (pokemon) => {
    //MODAL ELEMENTS
    const modalElements = {
        img: document.querySelector('.img__container img'),
        id: document.querySelector('.modal__id'),
        name: document.querySelector('.modal__name'),
        types: document.querySelector('.modal__type-wrapper'),
        stats: document.querySelector('.modal__stats-wrapper')
    }

    //FETCH ELEMENTS
    const id = `#${String(pokemon.id).padStart(3, '0')}`
    const img = pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default;
    const firtType = pokemon.types[0].type.name

    //Changes values
    modalElements.img.src = img
    modalElements.id.textContent = id
    modalElements.name.textContent = pokemon.name

    //TYPES loop
    modalElements.types.innerHTML = pokemon.types.map(item => {
        return `<span class="modal__type ${item.type.name}">${item.type.name}</span>`
    }).join("")
    //STATS LOOP
    modalElements.stats.innerHTML = pokemon.stats.map(item => {
        return `<div class="stat__box">
							<div class="stat__info">
								<span class="stat__name">${item.stat.name.replace('special-', 'sp. ')}</span>
								<span class="stat__value">${item.base_stat}</span>
							</div>
							<div class="stat__progress">
								<div class="stat__progress-fill ${firtType}"></div>
							</div>
						</div>`
    }).join("")
    //stat bars animasyon
    setTimeout(() => {
        const bars = modalElements.stats.querySelectorAll('.stat__progress-fill')
        pokemon.stats.map((item, index) => {
            const percent = Math.min((item.base_stat / 200) * 100, 100)
            bars[index].style.width = `${percent}%`
        })
    }, 100)

    modal.classList.add('active')
}
//Modal close
const closeModal = () => {
    modal.classList.remove('active')
}
/* FİLTER INPUT */
const filter = () => {
    const filterValue = searchInput.value.toLowerCase().trim()
    const pokemonCard = pokemonLists.querySelectorAll('.pokemon__card')
    pokemonCard.forEach(card => {
        const pokemonName = card.querySelector('.pokemon__name')
        if (pokemonName.textContent.trim().toLowerCase().includes(filterValue)) {
            card.setAttribute('style', 'display:grid')
        } else {
            card.setAttribute('style', 'display:none')
        }
    })
}

runEvents()