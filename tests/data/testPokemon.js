const Pokemon = require('../../controllers/Pokemon');

const generateTestPokemon = function({ expired = false }) {

  let offset = 300000;
  if (!!expired) {
    offset *= (-1);
  }

  const data = {
    "pokemon_id": "113",
    "lat": "51.36348961",
    "lng": "-0.09164304",
    "despawn": ((Date.now() + offset)/1000).toString(),
    "disguise": "0",
    "attack": "2",
    "defence": "15",
    "stamina": "10",
    "move1": "234",
    "move2": "14",
    "costume": "0",
    "gender": "2",
    "shiny": "0",
    "form": "0",
    "cp": "345",
    "level": "10"
  };

  return new Pokemon(data);
};

module.exports = generateTestPokemon;