import 'sepia';
import { expect } from 'chai';

const EXAMPLE_URL = 'https://github.com/tanepiper/node-bitly';
const EXAMPLE_URL_HASH = '2hpSRbP';
const EXAMPLE_URL_BITLY = 'http://bit.ly/2hpSRbP';

import '../test/bootstrap';

import { BitlyClient } from './bitly';
import { BitlyError } from './bitly.types';

describe('Bitly client', () => {
  let bitly: BitlyClient;
  before(() => {
    bitly = new BitlyClient(process.env.BITLY_API_KEY);
  });

  describe('should handle invalid requests', () => {
    it('it should throw an error', async () => {
      let err: BitlyError;
      try {
        await bitly.shorten(EXAMPLE_URL_BITLY);
      } catch (error) {
        err = error;
      }
      return expect(err)
        .to.have.property('statusCode')
        .and.to.equal(500);
    });
  });

  describe('should work with bitly api endpoints with no helper', () => {
    it('should accept any valid bitly url and data object', async () => {
      try {
        const data = await bitly.bitlyRequest('link/referrers_by_domain', {
          link: EXAMPLE_URL_BITLY,
          unit: 'hour',
          timezone: 'Europe/Amsterdam'
        });
        return expect(data).to.have.property('referrers');
      } catch (error) {
        throw error;
      }
    });
  });

  describe('shorten', () => {
    it('should shorten a url', async () => {
      try {
        const data = await bitly.shorten(EXAMPLE_URL);
        return expect(data)
          .to.have.property('hash')
          .and.to.equal(EXAMPLE_URL_HASH);
      } catch (error) {
        throw error;
      }
    });
  });

  describe('expand', () => {
    it('should expand a url and hash', async () => {
      try {
        const data = await bitly.expand([EXAMPLE_URL_BITLY, EXAMPLE_URL_HASH]);
        return expect(data)
          .to.have.property('expand')
          .and.lengthOf(2);
      } catch (error) {
        throw error;
      }
    });
  });

  describe('clicks', () => {
    it('should get click numbers for url', async () => {
      try {
        const data = await bitly.clicks(EXAMPLE_URL_BITLY);
        return expect(data).to.have.property('clicks');
      } catch (error) {
        throw error;
      }
    });
    it('should get click numbers for hash', async () => {
      try {
        const data = await bitly.clicks(EXAMPLE_URL_HASH);
        return expect(data).to.have.property('clicks');
      } catch (error) {
        throw error;
      }
    });
  });

  describe('clicksByMinute', () => {
    it('should get click numbers for url', async () => {
      try {
        const data = await bitly.clicksByMinute(EXAMPLE_URL_BITLY);
        return expect(data).to.have.property('clicks_by_minute');
      } catch (error) {
        throw error;
      }
    });
    it('should get click numbers for hash', async () => {
      try {
        const data = await bitly.clicksByMinute(EXAMPLE_URL_HASH);
        return expect(data).to.have.property('clicks_by_minute');
      } catch (error) {
        throw error;
      }
    });
  });

  describe('lookup', () => {
    it('should look up existing bitly url', async () => {
      try {
        const data = await bitly.lookup(EXAMPLE_URL_BITLY);
        return expect(data).to.have.property('lookup');
      } catch (error) {
        throw error;
      }
    });
  });

  describe('info', () => {
    it('should get info for url', async () => {
      try {
        const data = await bitly.info(EXAMPLE_URL_BITLY);
        return expect(data).to.have.property('info');
      } catch (error) {
        throw error;
      }
    });
    it('should get info for hash', async () => {
      try {
        const data = await bitly.info(EXAMPLE_URL_HASH);
        return expect(data).to.have.property('info');
      } catch (error) {
        throw error;
      }
    });
  });

  describe('referrers', () => {
    it('should look up existing bitly url', async () => {
      try {
        const data = await bitly.referrers(EXAMPLE_URL_BITLY);
        return expect(data).to.have.property('referrers');
      } catch (error) {
        throw error;
      }
    });
  });
});
