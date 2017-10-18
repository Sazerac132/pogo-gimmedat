const _ = require('lodash');

class Memory {
  constructor(details) {
    let { bits, useBinary } = details;

    this.format = this.format.bind(this);

    this.divisor = (useBinary) ? 1024 : 1000;
    this.bits = _.isInteger(bits) ? bits : parseInt(bits);

    if (!this.bits) throw new Error('Memory object needs a numeric value for bits.');
  }

  format() {
    let { bits, divisor } = this;

    const units = ['B', 'kB', 'MB', 'GB', 'TB'];

    let i = 0;

    while ((bits >= divisor) && (i+1 < units.length)) {
      bits /= divisor;
      i++;
    }

    return `${Math.max(bits, 0.1).toFixed(1)} ${units[i]}`;
  }

}

module.exports = Memory;