
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
        
        console.log(res)

        const pokemon = {
            img: res.data.sprites.other.dream_world.front_default,
            nombre: res.data.name,
            hp: res.data.stats[0].base_stat,
            experiencia: res.data.base_experience,
            attack: res.data.stats[1].base_stat,
            especial: res.data.stats[3].base_stat,
            defensa: res.data.stats[2].base_stat
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
    clone.querySelector('.card-body-title').innerHTML = `${pokemon.nombre} <span>${pokemon.hp} hp</span>`
    clone.querySelector('.card-body-text').textContent = pokemon.experiencia + ' Exp'
    clone.querySelectorAll('.card-footer-social h3')[0].textContent = pokemon.attack +'K'
    clone.querySelectorAll('.card-footer-social h3')[1].textContent = pokemon.especial +'K'
    clone.querySelectorAll('.card-footer-social h3')[2].textContent = pokemon.defensa +'K'
    fragment.appendChild(clone)
    flex.appendChild(fragment)
}   