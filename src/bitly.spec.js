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

  describe('shorten', () => {
    it('should shorten a url', async () => {
      const result = await bitly.shorten(EXAMPLE_URL);
      const { data } = result;
      expect(data.hash).to.equal(EXAMPLE_URL_HASH);
    });
  });

  describe('expand', () => {
    it('should expand a url and hash', async () => {
      const result = await bitly.expand([EXAMPLE_URL, EXAMPLE_URL_HASH]);
      const { data } = result;
      expect(data.expand.length).to.equal(2);
    });
  });

  describe('clicks', () => {
    it('should get click numbers for url', async () => {
      const result = await bitly.clicks(EXAMPLE_URL);
      const { data } = result;
      expect(data).to.have.property('clicks');
    });
    it('should get click numbers for hash', async () => {
      const result = await bitly.clicks(EXAMPLE_URL_HASH);
      const { data } = result;
      expect(data).to.have.property('clicks');
    });
  });

  describe('clicksByMinute', () => {
    it('should get click numbers for url', async () => {
      const result = await bitly.clicksByMinute(EXAMPLE_URL);
      const { data } = result;
      expect(data).to.have.property('clicks_by_minute');
    });
    it('should get click numbers for hash', async () => {
      const result = await bitly.clicksByMinute(EXAMPLE_URL_HASH);
      const { data } = result;
      expect(data).to.have.property('clicks_by_minute');
    });
  });

  describe('lookup', () => {
    it('should look up existing bitly url', async () => {
      const result = await bitly.lookup(EXAMPLE_URL_BITLY);
      const { data } = result;
      expect(data).to.have.property('lookup');
    });
  });

  describe('info', () => {
    it('should get info for url', async () => {
      const result = await bitly.info(EXAMPLE_URL);
      const { data } = result;
      expect(data).to.have.property('info');
    });
    it('should get info for hash', async () => {
      const result = await bitly.info(EXAMPLE_URL_HASH);
      const { data } = result;
      expect(data).to.have.property('info');
    });
  });

  describe('referrers', () => {
    it('should look up existing bitly url', async () => {
      const result = await bitly.referrers(EXAMPLE_URL_BITLY);
      const { data } = result;
      expect(data).to.have.property('referrers');
    });
  });
});
