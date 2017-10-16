const rp = require('request-promise-native');
const url = require('url');
const pokemonList = require('../information/pokemonList');

const Pokemon = require('./Pokemon');

class Map {

  constructor() {
    this.mons = [
      63,
      66,
      74,
      92,
      113,
      143,
      147,
      148,
      149,
      242,
      246,
      247,
      248
    ];

    console.info('Searching for the following mons:', this.mons.map(num => pokemonList[num]).join(', '));

    this.url = url.format({
      protocol: 'https',
      host: 'londonpogomap.com',
      pathname: 'query2.php',
      query: {
        token: 'pleaseDontStealOurData',
        since: '0',
        mons: this.mons.join(',')
      }
    });

    this.authority = 'londonpogomap.com';
    this.referer = 'https://londonpogomap.com';
    this.userAgent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.113 Safari/537.36';
  }

  fetch() {
    return rp({
      uri: this.url,
      headers: {
        authority: this.authority,
        referer: this.referer,
        'user-agent': this.userAgent
      }
    }).then(data => {
      try {
        return JSON.parse(data).pokemons;
      } catch (err) {
        throw new Error('Invalid data received from London Pogo Map API.');
      }
    }).then(pokemons => {
      return pokemons.map(pokemon => new Pokemon(pokemon));
    }).catch(err => {
      console.warn(err);
    });
  }

}

module.exports = Map;