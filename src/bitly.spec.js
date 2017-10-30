const expect = require('chai').expect;

require('../test/bootstrap');

const bitly = require('../src/bitly')(process.env.BITLY_API_KEY);

describe('Bitly client', () => {
    describe('shorten', () => {
        it('should shorten a url', async () => {
            const result = await bitly.shorten('http://example.com');
            const { data } = result;
            expect(data.hash).to.equal('1KjIwXl');
        });
    });

    describe('expand', () => {
      it('should expand a url and hash', async () => {
          const result = await bitly.expand(['http://example.com', '1KjIwXl']);
          const { data } = result;
          //expect(data.hash).to.equal('1KjIwXl');
      });
  });
});
