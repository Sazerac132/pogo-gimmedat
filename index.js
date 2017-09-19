const Map = require('./controllers/Map');
const Reporter = require('./reporter/Discord');

const reporter = new Reporter();

const myMap = new Map();

myMap.fetch().then(pokemons => {
  let data = pokemons
    .filter(pokemon => pokemon.getPercentage() > 80)
    .map(pokemon => pokemon.reporterText)
    .join('\n\n');

    reporter.post(data);
});