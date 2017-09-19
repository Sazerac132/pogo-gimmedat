const url = require('url');
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
  }

  post(data) {
    const uri = url.format({
      protocol: 'https',
      host: 'discordapp.com',
      pathname: `api/webhooks/${this.webhookId}/${this.webhookToken}`
    });

    request({
      method: 'POST',
      url: uri,
      json: {
        content: data
      },
      headers: {
        'Content-Type': 'application/json',
        Authorization: this.botToken
      }
    });
  }

}

module.exports = DiscordReporter;