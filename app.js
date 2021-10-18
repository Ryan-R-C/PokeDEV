const getPokemonUrl = id => `https://pokeapi.co/api/v2/pokemon/${id}`//GETs API's url
//This function get the pokemon from the PokeApi

const fetchPokemon = () =>{
    //instead of do a for it could be done using a previous array, and using map to do the hardwork
    generatePokemonPromisses = () => Array(151).fill().map((_, index) => 
        fetch(getPokemonUrl(index+1)).then(response => response.json())
    )

    const pokemonPromises = generatePokemonPromisses() //A array to storage the promises
    /*OLD VERSION.:
    //Each pokemon needs its own request
    for(let i = 1; i <= 151; i++){
        pokemonPromises.push(fetch(getPokemonUrl(i))//modern method to do AJAX requests! -> .:. It gets data from the url. So returns a promise
        .then(response => response.json())//Change the response from HTTP to JSON. But it so returns a promise
        )//storage the pokemon data in the array*/
        Promise.all(pokemonPromises)//after all pokemon promises be done it will
        .then(pokemons => {
            return pokemons.reduce((accumulator, pokemon) => {// transforms a array into a string
                const types = pokemon.types.map(typeinfo => typeinfo.type.name)//gets the type(s) of the pokemon, made it like this to save code
                //this accumulator will get all the pokemon data and interpolate it in HTML
                accumulator += `
                    <li class="card ${types[0]}">
                        <img class="card-image" alt"${pokemon.name} src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png">
                        <h2 class="card-title"> ${pokemon.id}.: ${pokemon.name}
                        <p class="card-subtitle">${types.join(" | ")}
                    </li>
                `
                return accumulator
            }, '')//after do the create a li with pokemon data it will be none
        })
        .then(pokemons => {
            const ul = document.querySelector('[data-js="pokedex"]')
            ul.innerHTML = pokemons// add all content in the ul
    },

        )
    }

fetchPokemon()