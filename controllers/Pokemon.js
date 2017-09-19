const pokemonList = require('../information/pokemonList');

class Pokemon {
  constructor(details) {
    const {
      pokemon_id: number,
      lat,
      lng,
      attack,
      defence,
      stamina,
      level,
      cp,
      despawn
    } = details;



    try {
      this.number = parseInt(number);
      this.attack = parseInt(attack);
      this.defence = parseInt(defence);
      this.stamina = parseInt(stamina);
      this.level = parseInt(level);
      this.cp = parseInt(cp);
      this.despawn = parseInt(despawn);

      this.lat = parseInt(lat);
      this.lng = parseInt(lng);
    } catch (e) {
      console.warn('Invalid data for pokemon.');
      console.warn(e.message);
    }

    this.name = pokemonList[this.number];
  }

  isPerfect() {
    return (this.attack === 15) && (this.defence === 15) && (this.stamina === 15);
  }

  getPercentage() {
    return ((this.attack + this.defence + this.stamina) / 45).toFixed(2) * 100
  }

  toString() {
    return `Level ${this.level} ${this.name}, ${this.cp} CP, ${this.getPercentage()}% IV.`;
  }
}

module.exports = Pokemon;