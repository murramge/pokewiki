import { writable } from "svelte/store";

export const arrPokemon = writable([]);

const fetchNum = 150;

const fetchPokemon = async () => {
    const url = `https://pokeapi.co/api/v2/pokemon?limit=${fetchNum}`;
    const res = await fetch(url);
    const data = await res.json();

    const loadedPokemon = data.results.map((pokemon, index) => {
        return {
            name: koreanNames[index],
            id: index + 1,
            image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`
        }
    })

    arrPokemon.set(loadedPokemon);
};


let koreanNames = [];
const urls = [];

for (let i = 0; i < fetchNum; i++) {
    let url = `https://pokeapi.co/api/v2/pokemon-species/${i + 1}`;
    urls.push(url);
}

let requests = urls.map(url => fetch(url));

Promise.all(requests)
    .then((responses) => Promise.all(responses.map(res => res.json())))
    .then((results) => {
        for (let result of results) {
       
            koreanNames.push(result.names[2].name);
        }
        fetchPokemon();
    });