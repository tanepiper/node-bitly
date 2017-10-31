const expect = require('chai').expect;
require('sepia');
require('../test/bootstrap');

const { generateUrl, doRequest, sortUrlsAndHash } = require('../src/lib');

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

describe('sortUrlsAndHash', () => {
    it('takes urls and hashes and appends them correctly', () => {
        const { shortUrl, hash } = sortUrlsAndHash(['http://example.com', '1KjIwXl']);
        expect(shortUrl.length).to.equal(1);
        expect(hash.length).to.equal(1);
    });

    it('should never return falsy values', () => {
        const { shortUrl, hash } = sortUrlsAndHash([false, null, undefined]);
        expect(shortUrl.length).to.equal(0);
        expect(hash.length).to.equal(0);
    });
});

describe('doRequest', () => {
    before(() => {});

    it('makes a request with a generateUrl url', async () => {
        try {
            const result = await doRequest({
                accessToken: process.env.BITLY_API_KEY,
                method: 'shorten',
                data: { longUrl: 'http://example.com' }
            });
            expect(result).to.deep.equal({
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
