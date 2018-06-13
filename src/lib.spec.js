const expect = require('chai').expect;
require('sepia');
require('../test/bootstrap');

const { generateUrl, sortUrlsAndHash } = require('./lib');

describe('generateUrl', () => {
  it('should return a default url', () => {
    const result = generateUrl('iamatoken', 'foo');
    expect(result)
      .to.have.property('href')
      .and.to.equal('https://api-ssl.bitly.com/v3/foo?access_token=iamatoken&domain=bit.ly&format=json');
  });

  it('should return a custom url', () => {
    const result = generateUrl('iamatoken', 'foo', null, {
      apiUrl: 'api-ssl.myhost.com',
      apiVersion: 'v4'
    });
    expect(result)
      .to.have.property('href')
      .and.to.equal('https://api-ssl.myhost.com/v4/foo?access_token=iamatoken&domain=bit.ly&format=json');
  });
});

describe('sortUrlsAndHash', () => {
  it('takes urls and hashes and appends them correctly', () => {
    const { shortUrl, hash } = sortUrlsAndHash(['http://example.com', '1KjIwXl']);
    expect(shortUrl).to.have.lengthOf(1);
    expect(hash).to.have.lengthOf(1);
  });

  it('should never return falsy values', () => {
    const { shortUrl, hash } = sortUrlsAndHash([false, null, undefined]);
    expect(shortUrl).to.have.lengthOf(0);
    expect(hash).to.have.lengthOf(0);
  });
});
