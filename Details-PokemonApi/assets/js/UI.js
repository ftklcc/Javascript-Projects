// import { fetchPokemons } from "./fetchPokemon.js";
//DOM elements
const pokemonList = document.querySelector('.pokemon__lists')
const pokemonCardTemplate = document.getElementById('pokemonCardTemplate')
const modal = document.querySelector('.modal__overlay')
const closeModalButton = document.querySelector('.cancel__modal')
const searchInput = document.querySelector('.search')
const loadingEl = document.getElementById('loading')


let pokemons = []

export const initUI = (pokemonData) => {
    pokemons = pokemonData
    renderPokemons()
    runEvents()
}

// const pokemons = await fetchPokemons()
// ALL EVENTS
const runEvents = () => {
    handleModal()
    closeModalButton.addEventListener('click', closeModal)
    searchInput.addEventListener('keyup', filterSearch)
}


const renderPokemons = () => {
    pokemonList.innerHTML = "";

    const fragment = document.createDocumentFragment()

    pokemons.forEach(pokemon => {
        const card = createPokemonCard(pokemon)
        fragment.appendChild(card)
    })

    pokemonList.appendChild(fragment)
}
//create Pokemon Card 
const createPokemonCard = (pokemon) => {
    //fetch elements destructuring 
    const { id, name, types, sprites } = pokemon
    const pokemonImg = sprites.other['official-artwork'].front_default
    const firstType = types[0].type.name

    const clone = pokemonCardTemplate.content.cloneNode(true)
    //clone template elements
    const el = {
        li: clone.querySelector('.pokemon__card'),
        id: clone.querySelector('.pokemon__id'),
        name: clone.querySelector('.pokemon__name'),
        img: clone.querySelector('.pokemon__card img'),
        badgeWrapper: clone.querySelector('.pokemon__badge-wrapper')
    }
    //add classlist
    el.li.className = `pokemon__card ${firstType}`
    el.li.dataset.id = id

    el.id.textContent = `#${String(id).padStart(3, '0')}`
    el.name.textContent = name;
    el.img.src = pokemonImg


    el.badgeWrapper.innerHTML = types
        .map(t => `<span class="pokemon__badge ${t.type.name}"> ${t.type.name} </span>`)
        .join("")


    return clone;
}

const handleModal = () => {
    pokemonList.addEventListener('click', e => {
        const card = e.target.closest('li')
        if (!card) return;

        const cardID = card.dataset.id
        const pokemon = pokemons.find(p => p.id === Number(cardID))
        showDetailPokemonCard(pokemon)
    })
}

//SHOW DETAİL CARD POKEMONS
const showDetailPokemonCard = (pokemon) => {
    modal.classList.add('active')

    //fetch pokemon elements destructuring
    const { id, name, types, sprites, stats } = pokemon
    const pokemonImg = sprites.other['official-artwork'].front_default
    const firstType = types[0].type.name

    //MODAL ELEMENTS
    const modalElements = {
        id: document.querySelector('.modal__id'),
        name: document.querySelector('.modal__name'),
        img: document.querySelector('.img__container img'),
        typesWrapper: document.querySelector('.modal__type-wrapper'),
        statsWrapper: document.querySelector('.modal__stats-wrapper')
    }
    //Changes values in fetch set modals
    modalElements.id.textContent = `#${String(id).padStart(3, '0')}`
    modalElements.name.textContent = name
    modalElements.img.src = pokemonImg

    //TYPES loop
    modalElements.typesWrapper.innerHTML = types
        .map(t => `<span class="pokemon__badge ${t.type.name}"> ${t.type.name} </span>`)
        .join("")

    //STATS LOOP
    modalElements.statsWrapper.innerHTML = stats.map(stat => {
        return `<div class="stat__box">
							<div class="stat__info">
								<span class="stat__name">
                                 ${stat.stat.name.replace("special-", "SP.")} 
                                 </span>
								<span class="stat__value"> 
                                ${stat.base_stat} 
                                </span>
							</div>
							<div class="stat__progress">
								<div class="stat__progress-fill ${firstType} "></div>
							</div>
						</div>`
    }).join("")
    //stat bars animasyon
    setTimeout(() => {
        const bars = modalElements.statsWrapper.querySelectorAll('.stat__progress-fill');
        stats.map((stat, index) => {
            const width = Math.min(stat.base_stat / 200) * 100
            bars[index].style.width = `${width}%`
        })
    }, 200)

}

const closeModal = () => {
    modal.classList.remove('active')
}
const filterSearch = (e) => {
    const value = e.target.value.toLowerCase().trim()
    const cardList = pokemonList.querySelectorAll('.pokemon__card')
    cardList.forEach(card => {
        const text = card.querySelector('.pokemon__name').textContent.toLowerCase()
        card.style.display = text.includes(value) ? 'flex' : 'none';
    })
}


export const showLoading = () => {
    loadingEl.classList.add('active')
}
export const hideLoading = () => {
    loadingEl.classList.remove('active')
}


