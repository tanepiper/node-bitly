const expect = require('chai').expect;

const { generateNiceUrl, doRequest, doMethod } = require('../src/lib');

describe('generateNiceUrl', () => {
    it('should return a default url', () => {
        const result = generateNiceUrl({ accessToken: 'iamatoken', method: 'foo' });
        expect(result.href).to.equal('https://api-ssl.bitly.com/v3/foo?access_token=iamatoken');
    });

    it('should return a custom url', () => {
        const result = generateNiceUrl({
            accessToken: 'iamatoken',
            method: 'foo',
            apiUrl: 'api-ssl.myhost.com',
            apiVersion: 'v4'
        });
        expect(result.href).to.equal('https://api-ssl.myhost.com/v4/foo?access_token=iamatoken');
    });
});

describe('doRequest', () => {
    it('makes requests', async () => {
        const result = await doRequest({ url: 'http://example.com' });
        const { statusCode } = result;
        expect(statusCode).to.equal(200);
    });
});
