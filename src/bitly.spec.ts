import { expect } from 'chai';
import '../test/bootstrap';

const EXAMPLE_URL = 'https://github.com/tanepiper/node-bitly';
const EXAMPLE_HASH = '1JtuvXY';
const EXAMPLE_URL_HASH = 'bit.ly/1JtuvXY';
const EXAMPLE_URL_BITLY = 'http://bit.ly/2hpSRbP';

import '../test/bootstrap';

import { BitlyClient } from './bitly';
import { BitlyErrorResponse } from '.';

describe('Bitly client', () => {
  let bitly: BitlyClient;
  before(() => {
    bitly = new BitlyClient(process.env.BITLY_API_KEY);
  });

  xdescribe('should handle invalid requests', () => {
    it('it should throw an error', async () => {
      let err: BitlyErrorResponse;
      try {
        await bitly.shorten(EXAMPLE_URL_BITLY);
      } catch (error) {
        err = error;
      }
      return expect(err)
          .to.have.property('statusCode')
          .and.to.equal(400);
    });
  });

  xdescribe('should work with bitly api endpoints with no helper', () => {
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

  xdescribe('shorten', () => {
    it('should shorten a url', async () => {
      try {
        const data = await bitly.shorten(EXAMPLE_URL);
        return expect(data)
            .to.have.property('id')
            .and.to.equal(EXAMPLE_URL_HASH);
      } catch (error) {
        throw error;
      }
    });
  });

  describe('expand', () => {
    it('should expand a url and hash', async () => {
      try {
        const data = await bitly.expand(EXAMPLE_HASH);
        return expect(data)
            .to.have.property('long_url')
            .and.to.equal(EXAMPLE_URL)
      } catch (error) {
        throw error;
      }
    });
  });

  xdescribe('clicks', () => {
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

  xdescribe('clicksByMinute', () => {
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

  xdescribe('lookup', () => {
    it('should look up existing bitly url', async () => {
      try {
        const data = await bitly.lookup(EXAMPLE_URL_BITLY);
        return expect(data).to.have.property('lookup');
      } catch (error) {
        throw error;
      }
    });
  });

  xdescribe('info', () => {
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

  xdescribe('referrers', () => {
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
