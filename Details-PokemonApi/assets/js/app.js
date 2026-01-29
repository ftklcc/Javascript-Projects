import { fetchPokemons } from "./fetchPokemon.js";
import { initUI, showLoading, hideLoading } from "./UI.js";


const initApp = async () => {
    showLoading()
    const pokemons = await fetchPokemons()
    hideLoading()
    initUI(pokemons)
}

initApp()