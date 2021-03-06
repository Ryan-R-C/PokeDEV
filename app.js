const getPokemonUrl = id => `https://pokeapi.co/api/v2/pokemon/${id}`//GETs API's url
//This function get the pokemon from the PokeApi

const generateHTML = pokemons => pokemons.reduce((accumulator, { name, id, types }) => {// transforms a array into a string
    const ElementTypes = types.map(typeinfo => typeinfo.type.name)//gets the type(s) of the pokemon, made it like this to save code
    //this accumulator will get all the pokemon data and interpolate it in HTML
    accumulator += `
            <li class="card">
                <div class="card-circle ${ElementTypes[0]}"></div>
                <img class="card-image" alt"${name} src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png">
                <div class="card-content">
                    <h2 class="card-title"> ${id}.: ${name}
                    <div class="separator"></div>
                    <p class="card-subtitle">${ElementTypes.join(" | ")}
                </div>
            </li>
        `
    return accumulator
}, '')


const insertPokemonsIntoPage = pokemons => {
    const ul = document.querySelector('[data-js="pokedex"]')
    ul.innerHTML = pokemons// add all content in the ul
}

const fetchPokemon = () => {
    //instead of do a for it could be done using a previous array, and using map to do the hardwork
    generatePokemonPromisses = () => Array(151).fill().map((_, index) =>
        fetch(getPokemonUrl(index + 1)).then(response => response.json())
    )

    const pokemonPromises = generatePokemonPromisses() //A array to storage the promises
    /*OLD VERSION.:
    //Each pokemon needs its own request
    for(let i = 1; i <= 151; i++){
        pokemonPromises.push(fetch(getPokemonUrl(i))//modern method to do AJAX requests! -> .:. It gets data from the url. So returns a promise
        .then(response => response.json())//Change the response from HTTP to JSON. But it so returns a promise
        )//storage the pokemon data in the array*/

    Promise.all(pokemonPromises)//after all pokemon promises be done it will
        .then(generateHTML)//after do the create a li with pokemon data it will be none
        .then(insertPokemonsIntoPage)

}
fetchPokemon()