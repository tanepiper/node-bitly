const expect = require('chai').expect;
require('sepia');
require('../test/bootstrap');

const { generateUrl, sortUrlsAndHash } = require('./lib');

describe('generateUrl', () => {
  it('should return a default url', () => {
    const result = generateUrl('iamatoken', 'foo');
    expect(result.href).to.equal(
      'https://api-ssl.bitly.com/v3/foo?access_token=iamatoken&domain=bit.ly&format=json',
    );
  });

  it('should return a custom url', () => {
    const result = generateUrl('iamatoken', 'foo', null, {
      apiUrl: 'api-ssl.myhost.com',
      apiVersion: 'v4',
    });
    expect(result.href).to.equal(
      'https://api-ssl.myhost.com/v4/foo?access_token=iamatoken&domain=bit.ly&format=json',
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
