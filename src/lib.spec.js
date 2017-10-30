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

    it('makes a request with a generateUrl url', async (done) => {
        const uri = generateUrl({ accessToken: process.env.BITLY_API_KEY, method: 'shorten', data: { longUrl: 'http://example.com'} });
        const result = await doRequest({ uri: uri.href });
        const { statusCode } = result;

        const data = [];
        result.on('data', data => {
          console.log(data);
        });
        result.on('end', () => {
          expect(data.join('')).to.equal('')
        });
        expect(statusCode).to.equal(200);
    });
});

// describe('generateQuery', () => {
//     it('should generate a querypart for a request', () => {
//         const result = generateQuery({ accessToken: 'foobar', data: { foo: 'bar', moo: [1, 2] } });
//         expect(result).to.deep.equal({
//             access_token: 'foobar',
//             foo: 'bar',
//             moo: [1, 2],
//             domain: 'bit.ly',
//             format: 'json'
//         });
//     });

//     it('should generate a nice url', () => {
//         const query = generateQuery({ accessToken: 'foobar', data: { foo: 'bar', moo: [1, 2] } });
//         const result = generateNiceUrl({ accessToken: 'iamatoken', method: 'foo', query });
//     });
// });
