import { expect } from 'chai';
import '../test/bootstrap';

import { generateUrl, sortUrlsAndHash } from './lib';

describe('generateUrl', () => {
  it('should return a default url', () => {
    const result = generateUrl('foo');
    expect(result)
        .to.have.property('href')
        .and.to.equal('https://api-ssl.bitly.com/v4/foo');
  });

  it('should return a custom url', () => {
    const result = generateUrl('foo', null, {
      apiUrl: 'api-ssl.myhost.com',
      apiVersion: 'v4',
    });
    expect(result)
        .to.have.property('href')
        .and.to.equal('https://api-ssl.myhost.com/v4/foo');
  });
});

describe('sortUrlsAndHash', () => {
  it('takes urls and hashes and appends them correctly', () => {
    const { shortUrl, hash } = sortUrlsAndHash(['http://example.com', '1KjIwXl']);
    expect(shortUrl).to.have.lengthOf(1);
    expect(hash).to.have.lengthOf(1);
  });
});
