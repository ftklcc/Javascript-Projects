const BASE_URL = 'https://pokeapi.co/api/v2/pokemon'
const LIMIT = 151

//Fetches data for 151 pokemons and resolves their details in parallel.
export const fetchPokemons = async () => {
    //Define query parametres for pagination
    const params = new URLSearchParams({
        offset: 0,
        limit: LIMIT
    })

    try {
        // Fetch the initial list of Pokemon names and URLs.
        const response = await fetch(`${BASE_URL}?${params}`)
        if (!response.ok) throw new Error('Http Hata', response.status)
        const data = await response.json()

        // Create an array of promises for concurrent detail fetching.
        const promises = data.results.map(async pokemon => {
            // Fetch individual pokemon data from its unique URL.
            const res = await fetch(pokemon.url)
            return await res.json()
        })
        // Wait for all promises to resolve while maintaining original order.
        const pokemonList = await Promise.all(promises)
        return pokemonList;

    }

    catch (error) {
        // Log error and return empty array to prevent app crash.
        console.error('Fetch error', error);
        return [];
    }
}






