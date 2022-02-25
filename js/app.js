const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
}
console.log(getRandomInt(1, 151));
const fetchData = async() => {
    try {
        let rand = getRandomInt(1, 151);
        let url = `https://pokeapi.co/api/v2/pokemon/${rand}`;
        const res = await fetch(url);
        const data = await res.json();
        console.log(data);
        const pokemon = {
            img: data.sprites.other.dream_world.front_default,
            nombre: data.name,
            hp: data.stats[0].base_stat,
            exp: data.base_experience,
            ataque: data.stats[1].base_stat,
            especial: data.stats[2].base_stat,
            defensa: data.stats[3].base_stat
        }
        pintarCard(pokemon);
    } catch (error) {
        console.log(error);
    }
}
const pintarCard = (pokemon) => {
    const flex = document.querySelector(".flex");
    const template = document.querySelector("#template-card").content;
    const clone = template.cloneNode(true);
    const fragment = document.createDocumentFragment();
    clone.querySelector(".card-body-img").setAttribute('src', pokemon.img);
    clone.querySelector(".card-body-title").innerHTML = `${pokemon.nombre} <span>${pokemon.hp} hp</span>`;
    clone.querySelector(".card-body-text").innerHTML = `Exp ${pokemon.exp}`;
    const social = clone.querySelectorAll(".card-footer .card-footer-social h3");
    social[0].innerHTML = pokemon.ataque + "K";
    social[1].innerHTML = pokemon.especial + "K";
    social[2].innerHTML = pokemon.defensa + "K";
    fragment.appendChild(clone);
    flex.appendChild(fragment);
}
document.addEventListener("DOMContentLoaded", () => { fetchData() });