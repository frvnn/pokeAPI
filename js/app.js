
console.log()

// Evento que carga primero el HTML

document.addEventListener('DOMContentLoaded', () => {
    const random = getRandomInt(1,151)
    fetchData(random)
})

// Numero Random
const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
  }


// Consumir de la API -
const fetchData = async (id) => {
    try {
        const res = await axios (`https://pokeapi.co/api/v2/pokemon/${id}`)
        
        const pokemon = {
            img: res.data.sprites.other.dream_world.front_default,
            nombre: res.data.name,
        }

        pintarCard(pokemon)
    } catch (error) {
        console.log(error)
    }
}

// Pintar Card en HTML

const pintarCard = (pokemon) => {
    console.log(pokemon)

    const flex = document.querySelector('.flex')
    const template = document.getElementById('template-card').content
    const clone = template.cloneNode(true)
    const fragment = document.createDocumentFragment()

    clone.querySelector('.card-body-img').setAttribute('src', pokemon.img)
    clone.querySelector('.card-body-title').innerHTML = `${pokemon.nombre} <span>20</span>`
    fragment.appendChild(clone)
    flex.appendChild(fragment)
}   