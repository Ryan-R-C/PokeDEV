//This function get the pokemon from the PokeApi
const fetchPokemon = () =>{
    
    const getPokemonUrl = id => `https://pokeapi.co/api/v2/pokemon/${id}`//GETs API's url

    const pokemonPromises = []//A array to storage the promises and show in the screen

    //Each pokemon needs its own request
    for(let i = 1; i <= 151; i++){
        pokemonPromises.push(fetch(getPokemonUrl(i))//modern method to do AJAX requests! -> .:. It gets data from the url. So returns a promise
        .then(response => response.json())//Change the response from HTTP to JSON. But it so returns a promise
        )//storage the pokemon data in the array
        Promise.all(pokemonPromises)//after all pokemon promises be done it will
        .then(pokemons => {
            const listPokemon = pokemons.reduce((accumulator, pokemon) => {// transforms a array into a string
                const types = pokemon.types.map(typeinfo => typeinfo.type.name)
                accumulator += `
                    <li class="card">
                        <img class="card-image ${types[0]}" alt"${pokemon.name} src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png">
                        <h2 class="card-title"> ${pokemon.id}.: ${pokemon.name}
                        <p class="card-subtitle">${types.join(" | ")}
                    </li>
                `
                return accumulator
            }, '')//after do the create a li with pokemon data it will be none

            const ul = document.querySelector('[data-js="pokedex"]')
            ul.innerHTML = listPokemon
        },

        )

    }
} 
fetchPokemon()