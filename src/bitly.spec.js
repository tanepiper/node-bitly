const expect = require('chai').expect;

const EXAMPLE_URL = 'https://github.com/tanepiper/node-bitly';
const EXAMPLE_URL_HASH = '2hpSRbP';

require('../test/bootstrap');

const bitly = require('../src/bitly')(process.env.BITLY_API_KEY);

describe('Bitly client', () => {
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
          const result = await bitly.clicks([EXAMPLE_URL]);
          const { data } = result;
          expect(data).to.have.property('clicks');
      });
      it('should get click numbers for hash', async () => {
        const result = await bitly.clicks([EXAMPLE_URL_HASH]);
        const { data } = result;
        expect(data).to.have.property('clicks');
    });
  });
});
