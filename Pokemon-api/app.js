const pokemonLists = document.querySelector('.pokemon__lists')
const modal = document.querySelector('.modal')
const search = document.querySelector('.search')

const typeColors = {
    fire: '#ef4444',
    grass: '#22c55e',
    water: '#3b82f6',
    bug: '#84cc16',
    normal: '#a8a29e',
    poison: '#cd28eb',
    electric: '#eab308',
    ground: '#ca8a04',
    fairy: '#f472b6',
    fighting: '#b91c1c',
    psychic: '#d946ef',
    rock: '#78716c',
    ghost: '#7c3aed',
    ice: '#67e8f9',
    dragon: '#6366f1',
    dark: '#475569',
    steel: '#94a3b8',
    flying: '#8b5cf6',
};
const getPokemons = async () => {
    const url = 'https://pokeapi.co/api/v2/pokemon'
    const params = new URLSearchParams({
        offset: 0,
        limit: 151
    })

    const response = await fetch(`${url}?${params}`)
    if (!response.ok) throw new Error('Api reddedildi', response.status)
    const data = await response.json()


    for (const pokemon of data.results) {
        const detailsPokemon = await fetch(pokemon.url)
        const details = await detailsPokemon.json()

        addUI(details)
    }
}

const addUI = pokemon => {
    const firstType = pokemon.types[0].type.name
    const img = pokemon.sprites.other['official-artwork'].front_default
    const id = pokemon.id.toString().padStart(3, '0')
    const secondType = pokemon.types.length > 1
    const secondTypeName = secondType ? pokemon.types[1].type.name : "";




    const li = document.createElement('li')
    li.className = `pokemon__card ${firstType}`
    li.innerHTML = `
					<span class="pokemon__id">#${id}</span>
					<img src="${img}" alt="${pokemon.name} picture" />
					<div class="pokemon__title">
						<p class="pokemon__name">${pokemon.name}</p>
						<div class="pokemon__badge-wrapper">
							<span class="pokemon__badge ${firstType}">${firstType}</span>
							${secondType ? `<span class="pokemon__badge ${secondTypeName}">${secondTypeName}</span>` : ''}
						</div>
					</div>`
    pokemonLists.appendChild(li)
    li.addEventListener('click', () => showModal(pokemon))
}

const showModal = (pokemon) => {
    const firstType = pokemon.types[0].type.name
    const img = pokemon.sprites.other['official-artwork'].front_default
    const id = pokemon.id.toString().padStart(3, '0')
    const secondType = pokemon.types.length > 1
    const secondTypeName = secondType ? pokemon.types[1].type.name : "";



    const statsHTML = pokemon.stats.map(stat => {

        const val = stat.base_stat

        const max = 200;
        const width = (val / max) * 100;
        return `
        	<div class="stat-wrapper">
					<span class="stat__label">${stat.stat.name.replace('special-', 'sp. ')}</span>
					<span class="stat__value">${val}</span>
					<div class="progress__bar">
						<div class="progress__bar-fill" style="width: ${width}%; background: ${typeColors[firstType]}"></div>
					</div>
				</div>
        `
    }).join("")

    modal.innerHTML = "";

    modal.innerHTML = `<article class="modal__top">
					<i class="fa-solid fa-x"></i>
					<span class="modal__id">#${id}</span>
					<h2 class="modal__name">${pokemon.name}</h2>
					<span class="modal__type ${firstType}">${firstType}</span>
					${secondType ? `<span class="pokemon__badge ${secondTypeName}">${secondTypeName}</span>` : ''}
				</article>
				<div class="modal__img-container">
					<img src="${img}" alt="" />
				</div>
                <div class="stat-container">
					${statsHTML}
				</div>
				`

    modal.classList.add('active')
}

modal.addEventListener('click', (e) => {
    if (e.target.className === 'fa-solid fa-x') {
        modal.classList.remove('active')
    }
})
search.addEventListener('keyup', (e) => {
    const filter = e.target.value.toLowerCase().trim()
    const list = pokemonLists.querySelectorAll('.pokemon__card')

    list.forEach(li => {
        const name = li.querySelector('.pokemon__name').textContent.toLowerCase()
        if (name.includes(filter)) {
            li.style.display = 'block'
        } else {
            li.style.display = 'none'
        }
    })


})
getPokemons()



