'use strict';

require('sepia');

const Code = require('code');
const Lab = require('lab');
const Bitly = require('../src/bitly');

const lab = exports.lab = Lab.script();

const bitly_token = 'eb1b99efe83c7d029e7600a6b38e32d1c9c2c6d9';
const LONG_URL = 'http://example.com';
const SHORT_URL = 'http://bit.ly/1KjIwXl';
const BITLY_HASH = 'VDcn';

lab.experiment('The module', () => {

  let bitly;

  lab.beforeEach((done) => {
    bitly = new Bitly(bitly_token);
    done();
  });

  lab.afterEach((done) => {
    bitly = undefined;
    done();
  });

  lab.test('should be a valid object with configuration and methods', (done) => {
    Code.expect(bitly.config).to.be.an.object();
    Code.expect(bitly.config).to.deep.include({ access_token: bitly_token });
    done();
  });
});

lab.experiment('shorten url', () => {

  let bitly;

  lab.beforeEach((done) => {
    bitly = new Bitly(bitly_token);
    done();
  });

  lab.afterEach((done) => {
    bitly = undefined;
    done();
  });

  lab.test('should return a success', (done) => {

    bitly.shorten(LONG_URL).then((result) => {
      Code.expect(result).to.deep.include({ status_code: 200 });
      done();
    }, done);
  });
});

lab.experiment('bitly pro-domain', () => {

  let bitly;

  lab.beforeEach((done) => {
    bitly = new Bitly(bitly_token);
    done();
  });

  lab.afterEach((done) => {
    bitly = undefined;
    done();
  });

  lab.test('should return a success', (done) => {

    bitly.bitlyProDomain('nyti.ms').then((result) => {
      Code.expect(result).to.deep.include({ status_code: 200 });
      done();
    }, done);
  });
});

lab.experiment('expand url', () => {

  let bitly;

  lab.beforeEach((done) => {
    bitly = new Bitly(bitly_token);
    done();
  });

  lab.afterEach((done) => {
    bitly = undefined;
    done();
  });

  lab.test('should return a success for short url', (done) => {

    bitly.expand(SHORT_URL).then((result) => {
      Code.expect(result).to.deep.include({ status_code: 200 });
      done();
    }, done);
  });

  lab.test('should return a success for hash', (done) => {

    bitly.expand(BITLY_HASH).then((result) => {
      Code.expect(result).to.deep.include({ status_code: 200 });
      done();
    }, done);
  });

  lab.test('should return a success for mixed url hash', (done) => {

    bitly.expand([SHORT_URL, BITLY_HASH]).then((result) => {
      Code.expect(result).to.deep.include({ status_code: 200 });
      done();
    }, done);
  });
});

lab.experiment('Get info about domain or hash', () => {

  let bitly;

  lab.beforeEach((done) => {
    bitly = new Bitly(bitly_token);
    done();
  });

  lab.afterEach((done) => {
    bitly = undefined;
    done();
  });

  lab.test('should return a success for short url', (done) => {

    bitly.info(SHORT_URL).then((result) => {
      Code.expect(result).to.deep.include({ status_code: 200 });
      done();
    }, done);
  });

  lab.test('should return a success for hash', (done) => {

    bitly.info(BITLY_HASH).then((result) => {
      Code.expect(result).to.deep.include({ status_code: 200 });
      done();
    }, done);
  });

  lab.test('should return a success for mixed url hash', (done) => {

    bitly.info([SHORT_URL, BITLY_HASH]).then((result) => {
      Code.expect(result).to.deep.include({ status_code: 200 });
      done();
    }, done);
  });
});

lab.experiment('Get info on click', () => {

  let bitly;

  lab.beforeEach((done) => {
    bitly = new Bitly(bitly_token);
    done();
  });

  lab.afterEach((done) => {
    bitly = undefined;
    done();
  });

  lab.test('should return a success for short url', (done) => {

    bitly.clicks(SHORT_URL).then((result) => {
      Code.expect(result).to.deep.include({ status_code: 200 });
      done();
    }, done);
  });

  lab.test('should return a success for hash', (done) => {

    bitly.clicks(BITLY_HASH).then((result) => {
      Code.expect(result).to.deep.include({ status_code: 200 });
      done();
    }, done);
  });

  lab.test('should return a success for mixed url hash', (done) => {

    bitly.clicks([SHORT_URL, BITLY_HASH]).then((result) => {
      Code.expect(result).to.deep.include({ status_code: 200 });
      done();
    }, done);
  });
});

lab.experiment('clicks by day', () => {

  let bitly;

  lab.beforeEach((done) => {
    bitly = new Bitly(bitly_token);
    done();
  });

  lab.afterEach((done) => {
    bitly = undefined;
    done();
  });

  lab.test('should return a success for short url', (done) => {

    bitly.clicksByDay(SHORT_URL).then((result) => {
      Code.expect(result).to.deep.include({ status_code: 200 });
      done();
    }, done);
  });

  lab.test('should return a success for hash', (done) => {

    bitly.clicksByDay(BITLY_HASH).then((result) => {
      Code.expect(result).to.deep.include({ status_code: 200 });
      done();
    }, done);
  });

  lab.test('should return a success for mixed url hash', (done) => {

    bitly.clicksByDay([SHORT_URL, BITLY_HASH]).then((result) => {
      Code.expect(result).to.deep.include({ status_code: 200 });
      done();
    }, done);
  });
});

lab.experiment('Get referrers', () => {

  let bitly;

  lab.beforeEach((done) => {
    bitly = new Bitly(bitly_token);
    done();
  });

  lab.afterEach((done) => {
    bitly = undefined;
    done();
  });

  lab.test('should return a success for short url', (done) => {

    bitly.referrers(SHORT_URL).then((result) => {
      Code.expect(result).to.deep.include({ status_code: 200 });
      done();
    }, done);
  });

  lab.test('should return a success for hash', (done) => {

    bitly.referrers(BITLY_HASH).then((result) => {
      Code.expect(result).to.deep.include({ status_code: 200 });
      done();
    }, done);
  });
});

lab.experiment('Get countries', () => {

  let bitly;

  lab.beforeEach((done) => {
    bitly = new Bitly(bitly_token);
    done();
  });

  lab.afterEach((done) => {
    bitly = undefined;
    done();
  });

  lab.test('should return a success for short url', (done) => {

    bitly.countries(SHORT_URL).then((result) => {
      Code.expect(result).to.deep.include({ status_code: 200 });
      done();
    }, done);
  });

  lab.test('should return a success for hash', (done) => {

    bitly.countries(BITLY_HASH).then((result) => {
      Code.expect(result).to.deep.include({ status_code: 200 });
      done();
    }, done);
  });
});

lab.experiment('Get info', () => {

  let bitly;

  lab.beforeEach((done) => {
    bitly = new Bitly(bitly_token);
    done();
  });

  lab.afterEach((done) => {
    bitly = undefined;
    done();
  });

  lab.test('should return a success for short url', (done) => {

    bitly.lookup(LONG_URL).then((result) => {
      Code.expect(result).to.deep.include({ status_code: 200 });
      done();
    }, done);
  });

  lab.test('should return a success for hash', (done) => {

    bitly.lookup([LONG_URL, 'http://nodejs.org']).then((result) => {
      Code.expect(result).to.deep.include({ status_code: 200 });
      done();
    }, done);
  });
});
