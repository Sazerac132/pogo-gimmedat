const expect = require('chai').expect;
const nock = require('nock');

const Reporter = require('../../reporter/Discord');

const getTestPokemon = require('../data/testPokemon');

describe('Reporter should report on the correct pokemon', function() {

  describe('It caches pokemon properly', function() {
    let reporter = new Reporter();
    let pokemon = getTestPokemon({});

    reporter.cacheReported([pokemon]);

    it('has cached the pokemon correctly', function() {
      let cached = Object.keys(reporter.reported);

      expect(cached).to.have.lengthOf(1);
      expect(cached[0]).to.equal(pokemon.getUniqueId());
    });

    it('will not clear a pokemon that has not expired', function() {
      reporter.clearExpired();
      let cached = Object.keys(reporter.reported);

      expect(cached).to.have.lengthOf(1);
      expect(cached[0]).to.equal(pokemon.getUniqueId());
    });

    it('will not cache the same pokemon twice', function() {
      reporter.cacheReported([pokemon]);

      let cached = Object.keys(reporter.reported);

      expect(cached).to.have.lengthOf(1);
      expect(cached[0]).to.equal(pokemon.getUniqueId());
    });
  });

  describe('It handles expired pokemon properly', function() {
    let reporter = new Reporter();
    let pokemon = getTestPokemon({expired: true});

    reporter.cacheReported([pokemon]);

    it('will clear a pokemon that has expired', function() {
      reporter.clearExpired();
      let cached = Object.keys(reporter.reported);

      expect(cached).to.have.lengthOf(0);
    });
  });

  describe('It handles a mix of expired and not expired pokemon properly', function() {
    let reporter = new Reporter();
    let pokemon1 = getTestPokemon({expired: true});
    let pokemon2 = getTestPokemon({});

    it('caches one pokemon', function() {
      reporter.cacheReported([pokemon1]);
      let cached = Object.keys(reporter.reported);

      expect(cached).to.have.lengthOf(1);
      expect(cached[0]).to.equal(pokemon1.getUniqueId());
    });

    it('caches both pokemon without repeating', function() {
      reporter.cacheReported([pokemon1, pokemon2]);
      let cached = Object.keys(reporter.reported);

      expect(cached).to.have.lengthOf(2);
      expect(cached[0]).to.equal(pokemon1.getUniqueId());
      expect(cached[1]).to.equal(pokemon2.getUniqueId());
    });

    it('clears only expired pokemon', function() {
      reporter.clearExpired();
      let cached = Object.keys(reporter.reported);

      expect(cached).to.have.lengthOf(1);
      expect(cached[0]).to.equal(pokemon2.getUniqueId());
    });
  });
});