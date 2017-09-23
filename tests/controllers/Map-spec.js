const expect = require('chai').expect;
const nock = require('nock');

const Map = require('../../controllers/Map');
const Pokemon = require('../../controllers/Pokemon');

const map = new Map();

const pogoMapData = require('../data/london-pogo-map.json');

describe('Map handles incoming data properly', function() {
  before(function() {
    nock(/londonpogomap\.com/)
      .get(/query2\.php/)
      .reply(200, pogoMapData);
  });

  it('makes the request and returns an array of pokemon', function(done) {
    map.fetch().then(pokemons => {
      expect(pokemons).to.be.an('array');

      pokemons.forEach((pokemon, index) => {
        expect(pokemon instanceof Pokemon).to.be.true;
      });

      done();
    });
  });
});

describe('Map catches error for incorrect incoming data', function() {
  before(function() {
    nock(/londonpogomap\.com/)
      .get(/query2\.php/)
      .reply(200, 'invalid response');
  });

  it('catches the error', function(done) {
    map.fetch()
      .then(function(pokemons) {
        throw new Error('should be caught');
      })
      .catch(err => {
        console.log('error running')
        expect(err).to.be.an('error');
        expect(err.message).to.equal('should be caught');

        done();
      });
  });

  after(function() {
    nock.restore();
    nock.cleanAll();
  });
});