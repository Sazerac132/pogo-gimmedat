const Map = require('./controllers/Map');

const myMap = new Map();

myMap.fetch().then(pokemons => {
  pokemons
    .filter(pokemon => pokemon.getPercentage() > 80)
    .forEach(pokemon => console.log(pokemon.despawnTime));
});