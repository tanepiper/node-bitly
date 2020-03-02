import { expect } from 'chai';
import { BitlyClient } from './bitly';
import { isBitlyLink, isBitlyErrResponse, BitlyErrorResponse } from './types';
import { BitlyIdPattern } from './lib';
import '../test/bootstrap';

const EXAMPLE_URL = 'https://github.com/tanepiper/node-bitly';
let EXAMPLE_SHORTENED = {
  OLD_STYLE_HASH: '1JtuvXY',
  // Serves as both hash and ID
  URL_HASH: 'bit.ly/1JtuvXY',
  // Full URL
  URL_BITLY: 'http://bit.ly/2hpSRbP'
};

describe('Bitly client', () => {
  let bitly: BitlyClient;
  before(() => {
    bitly = new BitlyClient(process.env.BITLY_API_KEY);
  });

  describe('shorten', () => {
    it('should shorten a url', async () => {
      try {
        const data = await bitly.shorten(EXAMPLE_URL);
        const isLinkResponse = isBitlyLink(data);
        const resultTypePassed = expect(isLinkResponse)
            .to.equal(true);
        if (!isBitlyLink(data)) {
          return false;
        }
        const idPassed = expect(data)
            .to.have.property('id')
            .and.to.match(BitlyIdPattern);
        const linkPassed = expect(data)
            .to.have.property('link')
            .and.to.be.an('string')
            .and.to.satisfy((link: string) => {
              return link === `http://${data.id}` || link === `https://${data.id}`;
            });
        if (isBitlyLink(data)) {
          EXAMPLE_SHORTENED = {
            OLD_STYLE_HASH: data.id.replace('bit.ly/',''),
            URL_BITLY: data.link,
            URL_HASH: data.id
          };
        }
        return idPassed && linkPassed && resultTypePassed;
      } catch (error) {
        throw error;
      }
    });
  });

  describe('should handle invalid requests', () => {
    it('it should throw an error', async () => {
      let err: any;
      try {
        await bitly.shorten('NOT_REAL_URL');
      } catch (error) {
        err = error;
      }
      const isBitlyErr = isBitlyErrResponse(err);
      expect(isBitlyErr).to.equal(true);
      return expect(err)
          .to.have.property('resource')
          .and.to.equal('bitlinks');
    });
  });

  describe('should work with bitly api endpoints with no helper', () => {
    it('should accept any valid bitly url and data object', async () => {
      try {
        const data = await bitly.bitlyRequest(`bitlinks/${EXAMPLE_SHORTENED.URL_HASH}/referrers_by_domains`, {}, 'GET');
        return expect(data).to.have.property('referrers_by_domain').that.satisfy((referrer_data: any) => {
          return Array.isArray(referrer_data);
        })
      } catch (error) {
        throw error;
      }
    });
  });

  describe('expand', () => {
    it('should expand a url and hash', async () => {
      try {
        const data = await bitly.expand(EXAMPLE_SHORTENED.URL_HASH);
        return expect(data)
            .to.have.property('long_url')
            .that.is.equal(EXAMPLE_URL)
      } catch (error) {
        throw error;
      }
    });
  });

  describe('clicks', () => {
    it('should get click numbers for url', async () => {
      try {
        const data = await bitly.clicks(EXAMPLE_SHORTENED.URL_BITLY);
        return expect(data).to.have.property('link_clicks').that.is.an('array');
      } catch (error) {
        throw error;
      }
    });
    it('should get click numbers for hash', async () => {
      try {
        const data = await bitly.clicks(EXAMPLE_SHORTENED.URL_HASH);
        return expect(data).to.have.property('link_clicks').that.is.an('array');
      } catch (error) {
        throw error;
      }
    });
  });

  describe('clicksByDay', () => {
    it('should get click numbers by day for url', async () => {
      try {
        const data = await bitly.clicksByDay(EXAMPLE_SHORTENED.URL_BITLY);
        expect(data).to.have.property('unit').that.is.equal('day');
        expect(data).to.have.property('link_clicks').that.is.an('array');
      } catch (error) {
        throw error;
      }
    });
    it('should get click numbers by day for hash', async () => {
      try {
        const data = await bitly.clicksByDay(EXAMPLE_SHORTENED.URL_HASH);
        expect(data).to.have.property('unit').that.is.equal('day');
        expect(data).to.have.property('link_clicks').that.is.an('array');
      } catch (error) {
        throw error;
      }
    });
  })

  // This API endpint is currently returning 500 internal errors for the same requests that were previously working
  describe.skip('clicksByMinute', () => {
    it('should get click numbers by minute for url', async () => {
      try {
        const data = await bitly.clicksByMinute(EXAMPLE_SHORTENED.URL_BITLY);
        expect(data).to.have.property('unit').that.is.equal('minute');
        expect(data).to.have.property('link_clicks').that.is.an('array');
      } catch (error) {
        throw error;
      }
    });
    it('should get click numbers by minute for hash', async () => {
      try {
        const data = await bitly.clicksByMinute(EXAMPLE_SHORTENED.URL_HASH);
        expect(data).to.have.property('unit').that.is.equal('minute');
        expect(data).to.have.property('link_clicks').that.is.an('array');
      } catch (error) {
        throw error;
      }
    });
  });

  describe('info', () => {
    it('should get info for url', async () => {
      try {
        const data = await bitly.info(EXAMPLE_SHORTENED.URL_BITLY);
        return expect(data).to.have.property('title');
      } catch (error) {
        throw error;
      }
    });
    it('should get info for hash', async () => {
      try {
        const data = await bitly.info(EXAMPLE_SHORTENED.URL_HASH);
        return expect(data).to.have.property('title');
      } catch (error) {
        throw error;
      }
    });
  });

  describe('referrers', () => {
    it('should look up existing bitly url', async () => {
      try {
        const data = await bitly.referrers(EXAMPLE_SHORTENED.URL_BITLY);
        return expect(data).to.have.property('facet').that.equals('referrers');
      } catch (error) {
        throw error;
      }
    });
  });

  describe('countries', () => {
    it('should look up metrics by country', async () => {
      try {
        const data = await bitly.countries(EXAMPLE_SHORTENED.URL_BITLY);
        return expect(data).to.have.property('facet').that.equals('countries');
      } catch (error) {
        throw error;
      }
    })
  })
});
