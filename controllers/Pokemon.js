const moment = require('moment');
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

    this.lat = lat;
    this.lng = lng;

    try {
      this.number = parseInt(number);
      this.attack = parseInt(attack);
      this.defence = parseInt(defence);
      this.stamina = parseInt(stamina);
      this.level = parseInt(level);
      this.cp = parseInt(cp);
      this.despawn = (parseInt(despawn) * 1000);
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
    return Math.round(((this.attack + this.defence + this.stamina) / 45) * 100);
  }

  get mapLink() {
    console.log(this.toString());
    return `https://www.google.co.uk/maps/@${this.lat},${this.lng},15z`;
  }

  get despawnTime() {
    const mDespawn = moment(this.despawn);
    const timeRemaining = Math.floor(moment.duration(mDespawn.diff(moment())).asMinutes());

    return `${mDespawn.format('MMM Do, h:mm:ssa')} (${timeRemaining} minutes remaining)`;
  }

  toString() {
    return `Level ${this.level} ${this.name}, ${this.cp} CP, ${this.getPercentage()}% IV.`;
  }
}

module.exports = Pokemon;