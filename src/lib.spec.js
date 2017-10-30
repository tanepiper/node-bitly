const expect = require('chai').expect;

process.on('unhandledRejection', err => {
    /*eslint-disable */
    console.log(err.stack);
    process.exit(1);
    /*eslint-enable */
});

process.on('uncaughtException', error => {
    /*eslint-disable */
    console.log(error.stack); // to see your exception details in the console
    process.exit(1);
    /*eslint-enable */
});

const { generateUrl, doRequest } = require('../src/lib');

describe('generateUrl', () => {
    it('should return a default url', () => {
        const result = generateUrl({ accessToken: 'iamatoken', method: 'foo' });
        expect(result.href).to.equal(
            'https://api-ssl.bitly.com/v3/foo?access_token=iamatoken&domain=bit.ly&format=json'
        );
    });

    it('should return a custom url', () => {
        const result = generateUrl({
            accessToken: 'iamatoken',
            method: 'foo',
            apiUrl: 'api-ssl.myhost.com',
            apiVersion: 'v4'
        });
        expect(result.href).to.equal(
            'https://api-ssl.myhost.com/v4/foo?access_token=iamatoken&domain=bit.ly&format=json'
        );
    });
});

describe('doRequest', () => {
    before(() => {});

    it('makes a request with a generateUrl url', async () => {
        const uri = generateUrl({
            accessToken: process.env.BITLY_API_KEY,
            method: 'shorten',
            data: { longUrl: 'http://example.com' }
        });
        try {
            const result = await doRequest({ uri: uri.href });
            const jsonResult = JSON.parse(result);
            expect(jsonResult).to.deep.equal({
                status_code: 200,
                status_txt: 'OK',
                data: {
                    url: 'http://bit.ly/1KjIwXl',
                    hash: '1KjIwXl',
                    global_hash: 'VDcn',
                    long_url: 'http://example.com/',
                    new_hash: 0
                }
            });
            return true;
        } catch (e) {
            throw e;
        }
    });
});
