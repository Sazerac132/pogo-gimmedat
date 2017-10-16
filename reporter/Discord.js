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

    this.threshold = 90;

    this.clearExpired = this.clearExpired.bind(this);
    this.removeLowIv = this.removeLowIv.bind(this);
    this.removeReported = this.removeReported.bind(this);
    this.cacheReported = this.cacheReported.bind(this);
    this.toText = this.toText.bind(this);
    this.post = this.post.bind(this);
    this.report = this.report.bind(this);
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

  removeLowIv(pokemons) {
    let highIvs = pokemons.filter(pokemon => pokemon.isPerfect());
    return Promise.resolve(highIvs);
  }

  removeReported(pokemons) {
    let notYetReported = pokemons.filter(pokemon => {
      let id = pokemon.getUniqueId();
      return !this.reported.hasOwnProperty(id);
    });
    return Promise.resolve(notYetReported);
  }

  cacheReported(pokemons) {
    pokemons.forEach(pokemon => {
      let id = pokemon.getUniqueId();
      this.reported[id] = pokemon.despawn;
    });
    return Promise.resolve(pokemons);
  }

  toText(pokemons) {
    let pokemonText = pokemons
      .map(pokemon => pokemon.reporterText)
      .join('\n\n');
    return Promise.resolve(pokemonText);
  }

  post(textPayload) {
    const uri = url.format({
      protocol: 'https',
      host: 'discordapp.com',
      pathname: `api/webhooks/${this.webhookId}/${this.webhookToken}`
    });

    request({
      method: 'POST',
      url: uri,
      json: {
        content: textPayload
      },
      headers: {
        'Content-Type': 'application/json',
        Authorization: this.botToken
      }
    });
  }

  report(pokemons) {
    this.clearExpired();

    this.removeLowIv(pokemons)
      .then(this.removeReported)
      .then(this.cacheReported)
      .then(this.toText)
      .then(this.post);
  }

}

module.exports = DiscordReporter;