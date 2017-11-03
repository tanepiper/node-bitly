require('sepia');
const expect = require('chai').expect;

const EXAMPLE_URL = 'https://github.com/tanepiper/node-bitly';
const EXAMPLE_URL_HASH = '2hpSRbP';
const EXAMPLE_URL_BITLY = 'http://bit.ly/2hpSRbP';

require('../test/bootstrap');

const bitlyClient = require('./bitly');

describe('Bitly client', () => {
  let bitly;
  before(() => {
    bitly = bitlyClient(process.env.BITLY_API_KEY);
  });

  describe('should handle invalid requests', () => {
    it('it should throw an error', async () => {
      let err;
      try {
        await bitly.shorten(EXAMPLE_URL_BITLY);
      } catch (error) {
        err = error;
      }
      return expect(err.statusCode).to.equal(500);
    });
  });

  describe('should work with bitly api endpoints with no helper', () => {
    it('should accept any valid bitly url and data object', async() => {
      try {
        const {data} = await bitly.bitlyRequest('link/referrers_by_domain', {
          link: EXAMPLE_URL_BITLY,
          unit: 'hour',
          timezone: 'Europe/Amsterdam'
        });
        return expect(data).to.have.property('referrers');
      } catch (error)  {
        throw error;
      }
    })
  })

  describe('shorten', () => {
    it('should shorten a url', async () => {
      try {
        const { data } = await bitly.shorten(EXAMPLE_URL);
        return expect(data.hash).to.equal(EXAMPLE_URL_HASH);
      } catch (error) {
        throw error;
      }
    });
  });

  describe('expand', () => {
    it('should expand a url and hash', async () => {
      try {
        const { data } = await bitly.expand([EXAMPLE_URL_BITLY, EXAMPLE_URL_HASH]);
        return expect(data.expand.length).to.equal(2);
      } catch (error) {
        throw error;
      }
    });
  });

  describe('clicks', () => {
    it('should get click numbers for url', async () => {
      try {
        const { data } = await bitly.clicks(EXAMPLE_URL_BITLY);
        return expect(data).to.have.property('clicks');
      } catch (error) {
        throw error;
      }
    });
    it('should get click numbers for hash', async () => {
      try {
        const { data } = await bitly.clicks(EXAMPLE_URL_HASH);
        return expect(data).to.have.property('clicks');
      } catch (error) {
        throw error;
      }
    });
  });

  describe('clicksByMinute', () => {
    it('should get click numbers for url', async () => {
      try {
        const { data } = await bitly.clicksByMinute(EXAMPLE_URL_BITLY);
        return expect(data).to.have.property('clicks_by_minute');
      } catch (error) {
        throw error;
      }
    });
    it('should get click numbers for hash', async () => {
      try {
        const { data } = await bitly.clicksByMinute(EXAMPLE_URL_HASH);
        return expect(data).to.have.property('clicks_by_minute');
      } catch (error) {
        throw error;
      }
    });
  });

  describe('lookup', () => {
    it('should look up existing bitly url', async () => {
      try {
        const { data } = await bitly.lookup(EXAMPLE_URL_BITLY);
        return expect(data).to.have.property('lookup');
      } catch (error) {
        throw error;
      }
    });
  });

  describe('info', () => {
    it('should get info for url', async () => {
      try {
        const { data } = await bitly.info(EXAMPLE_URL_BITLY);
        return expect(data).to.have.property('info');
      } catch (error) {
        throw error;
      }
    });
    it('should get info for hash', async () => {
      try {
        const { data } = await bitly.info(EXAMPLE_URL_HASH);
        return expect(data).to.have.property('info');
      } catch (error) {
        throw error;
      }
    });
  });

  describe('referrers', () => {
    it('should look up existing bitly url', async () => {
      try {
        const { data } = await bitly.referrers(EXAMPLE_URL_BITLY);
        return expect(data).to.have.property('referrers');
      } catch (error) {
        throw error;
      }
    });
  });
});
