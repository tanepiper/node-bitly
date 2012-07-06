var Bitly = require('../');

var bitly_user = 'bitlynodejs';
var bitly_key = 'R_8a2a91d31932dc7fda5468033dfe3c15';


module.exports = {
  'test valid url': function(test) {
    var bitly = new Bitly(bitly_user, bitly_key);
    test.ok(true, bitly._urlCheck('http://tanepiper.com/test?q=test'));
    test.done();
  },

  'shorten url': function(test) {
    var bitly = new Bitly(bitly_user, bitly_key);
    bitly.shorten('http://tanepiper.com', function(error, result) {
      test.ifError(error);
      test.deepEqual(result.status_code, 200);
      test.done();
    });
  },

  'Check info on bitly pro-domain': function(test) {
    var bitly = new Bitly(bitly_user, bitly_key);
    bitly.bitlyProDomain('nyti.ms', function(error, result) {
      test.ifError(error);
      test.deepEqual(result.status_code, 200);
      test.done();
    });
  },

  'Get info about single short url': function(test) {
    var bitly = new Bitly(bitly_user, bitly_key);
    bitly.info('http://bit.ly/9lCnZ9', function(error, result) {
      test.ifError(error);
      test.deepEqual(result.status_code, 200);
      test.done();
    });
  },

  'Get info about single hash': function(test) {
    var bitly = new Bitly(bitly_user, bitly_key);
    bitly.info('6uBruH', function(error, result) {
      test.ifError(error);
      test.deepEqual(result.status_code, 200);
      test.done();
    });
  },

  'Get info about mixed url and hash': function(test) {
    var bitly = new Bitly(bitly_user, bitly_key);
    bitly.info(['http://bit.ly/9lCnZ9', '6uBruH'], function(error, result) {
      test.ifError(error);
      test.deepEqual(result.status_code, 200);
      test.done();
    });
  },

  'Get clicks for single short url': function(test) {
    var bitly = new Bitly(bitly_user, bitly_key);
    bitly.clicks('http://bit.ly/9lCnZ9', function(error, result) {
      test.ifError(error);
      test.deepEqual(result.status_code, 200);
      test.done();
    });
  },

  'Get clicks for single hash': function(test) {
    var bitly = new Bitly(bitly_user, bitly_key);
    bitly.clicks('6uBruH', function(error, result) {
      test.ifError(error);
      test.deepEqual(result.status_code, 200);
      test.done();
    });
  },

  'Get clicks for mixed url and hash': function(test) {
    var bitly = new Bitly(bitly_user, bitly_key);
    bitly.clicks(['http://bit.ly/9lCnZ9', '6uBruH'], function(error, result) {
      test.ifError(error);
      test.deepEqual(result.status_code, 200);
      test.done();
    });
  },

  'Get clicks by minute for single short url': function(test) {
    var bitly = new Bitly(bitly_user, bitly_key);
    bitly.clicksByMinute('http://bit.ly/9lCnZ9', function(error, result) {
      test.ifError(error);
      test.deepEqual(result.status_code, 200);
      test.done();
    });
  },

  'Get clicks by minute for single hash': function(test) {
    var bitly = new Bitly(bitly_user, bitly_key);
    bitly.clicksByMinute('6uBruH', function(error, result) {
      test.ifError(error);
      test.deepEqual(result.status_code, 200);
      test.done();
    });
  },

  'Get clicks by minute for mixed url and hash': function(test) {
    var bitly = new Bitly(bitly_user, bitly_key);
    bitly.clicksByMinute(['http://bit.ly/9lCnZ9', '6uBruH'], function(error, result) {
      test.ifError(error);
      test.deepEqual(result.status_code, 200);
      test.done();
    });
  },

  'Get clicks by day for single short url': function(test) {
    var bitly = new Bitly(bitly_user, bitly_key);
    bitly.clicksByDay('http://bit.ly/9lCnZ9', function(error, result) {
      test.ifError(error);
      test.deepEqual(result.status_code, 200);
      test.done();
    });
  },

  'Get clicks by day for single hash': function(test) {
    var bitly = new Bitly(bitly_user, bitly_key);
    bitly.clicksByDay('6uBruH', function(error, result) {
      test.ifError(error);
      test.deepEqual(result.status_code, 200);
      test.done();
    });
  },

  'Get clicks by day for mixed url and hash': function(test) {
    var bitly = new Bitly(bitly_user, bitly_key);
    bitly.clicksByDay(['http://bit.ly/9lCnZ9', '6uBruH'], function(error, result) {
      test.ifError(error);
      test.deepEqual(result.status_code, 200);
      test.done();
    });
  },

  'Get referrers for single short url': function(test) {
    var bitly = new Bitly(bitly_user, bitly_key);
    bitly.referrers('http://bit.ly/9lCnZ9', function(error, result) {
      test.ifError(error);
      test.deepEqual(result.status_code, 200);
      test.done();
    });
  },

  'Get referrers for single hash': function(test) {
    var bitly = new Bitly(bitly_user, bitly_key);
    bitly.referrers('6uBruH', function(error, result) {
      test.ifError(error);
      test.deepEqual(result.status_code, 200);
      test.done();
    });
  },

  'Get countries for single short url': function(test) {
    var bitly = new Bitly(bitly_user, bitly_key);
    bitly.countries('http://bit.ly/9lCnZ9', function(error, result) {
      test.ifError(error);
      test.deepEqual(result.status_code, 200);
      test.done();
    });
  },

  'Get countries for single hash': function(test) {
    var bitly = new Bitly(bitly_user, bitly_key);
    bitly.countries('6uBruH', function(error, result) {
      test.ifError(error);
      test.deepEqual(result.status_code, 200);
      test.done();
    });
  },

  'Look up information about 1 long url': function(test) {
    var bitly = new Bitly(bitly_user, bitly_key);
    bitly.lookup('http://tanepiper.com', function(error, result) {
      test.ifError(error);
      test.deepEqual(result.status_code, 200);
      test.done();
    });
  },

  'Look up information about multiple long url': function(test) {
    var bitly = new Bitly(bitly_user, bitly_key);
    bitly.lookup(['http://tanepiper.com', 'http://nodejs.org'], function(error, result) {
      test.ifError(error);
      test.deepEqual(result.status_code, 200);
      test.done();
    });
  },

  'Expand for single short url': function(test) {
    var bitly = new Bitly(bitly_user, bitly_key);
    bitly.expand('http://bit.ly/9lCnZ9', function(error, result) {
      test.ifError(error);
      test.deepEqual(result.status_code, 200);
      test.done();
    });
  },

  'Expand for single hash': function(test) {
    var bitly = new Bitly(bitly_user, bitly_key);
    bitly.expand('6uBruH', function(error, result) {
      test.ifError(error);
      test.deepEqual(result.status_code, 200);
      test.done();
    });
  },

  'Expand for mixed url and hash': function(test) {
    var bitly = new Bitly(bitly_user, bitly_key);
    bitly.expand(['http://bit.ly/9lCnZ9', '6uBruH'], function(error, result) {
      test.ifError(error);
      test.deepEqual(result.status_code, 200);
      test.done();
    });
  },

  'Validate any bitly user and API key': function(test) {
    var bitly = new Bitly(bitly_user, bitly_key);
    bitly.validate(bitly_user, bitly_key, function(error, result) {
      test.ifError(error);
      test.deepEqual(result.status_code, 200);
      test.done();
    });
  }

};