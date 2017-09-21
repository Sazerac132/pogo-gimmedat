const url = require('url');
const _ = require('lodash');
const moment = require('moment');

const request = require('request');

class DiscordReporter {

  constructor() {
    const {
      botToken,
      webhook: {
        id: webhookId, token: webhookToken
      }
    } = require('./discordSecrets');

    this.botToken = botToken;
    this.webhookId = webhookId;
    this.webhookToken = webhookToken;

    this.reported = {};

    this.formatPokemonData = this.formatPokemonData.bind(this);
    this.clearExpired = this.clearExpired.bind(this);
    this.post = this.post.bind(this);
  }

  formatPokemonData(pokemons) {
    pokemons = pokemons.filter(pokemon => pokemon.getPercentage() > 75);
    let pokemonsToReport = [];

    pokemons.forEach(pokemon => {
      let pokemonId = pokemon.getUniqueId();
      if (this.reported.hasOwnProperty(pokemonId)) {
        return;
      }

      this.reported[pokemonId] = pokemon.despawn;
      pokemonsToReport.push(pokemon)
    });

    return pokemonsToReport
      .map(pokemon => pokemon.reporterText)
      .join('\n\n');
  }

  clearExpired() {
    for (let id in this.reported) {
      if (!this.reported.hasOwnProperty(id)) continue;

      let mDespawn = moment(this.reported[id]);
      if (moment.duration(mDespawn.diff(moment())) <= 0) {
        delete this.reported[id];
      }
    }
  }

  post(pokemons) {
    this.clearExpired();

    const uri = url.format({
      protocol: 'https',
      host: 'discordapp.com',
      pathname: `api/webhooks/${this.webhookId}/${this.webhookToken}`
    });

    request({
      method: 'POST',
      url: uri,
      json: {
        content: this.formatPokemonData(pokemons)
      },
      headers: {
        'Content-Type': 'application/json',
        Authorization: this.botToken
      }
    });
  }

}

module.exports = DiscordReporter;