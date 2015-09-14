var Bitly = require('../');
var sepia = require('sepia');

var bitly_token = 'eb1b99efe83c7d029e7600a6b38e32d1c9c2c6d9';
var bitly;
var LONG_URL = 'http://example.com/';
var SHORT_URL = 'http://bit.ly/1KjIwXl';
var BITLY_HASH = 'VDcn';

module.exports = {
  'setUp': function(callback) {
    bitly = new Bitly(bitly_token);
    callback();
  },

  'tearDown': function(callback) {
    bitly = undefined;
    callback();
  },

  'Test valid url': function(test) {
    test.ok(true, bitly._urlCheck(LONG_URL));
    test.done();
  },

  'Shorten url with callback': function(test) {
    bitly.shorten(LONG_URL, function(error, result) {
      test.ifError(error);
      test.deepEqual(result.status_code, 200);
      test.done();
    });
  },

  'Shorten url with promise': function(test) {
    bitly.shorten(LONG_URL).then(function(result) {
      test.deepEqual(result.status_code, 200);
      test.done();
    }, function(error) {
      test.ifError(error);
      test.done();
    });
  },

  'Check info on bitly pro-domain with callback': function(test) {
    bitly.bitlyProDomain('nyti.ms', function(error, result) {
      test.ifError(error);
      test.deepEqual(result.status_code, 200);
      test.done();
    });
  },

  'Check info on bitly pro-domain with promise': function(test) {
    bitly.bitlyProDomain('nyti.ms').then(function(result) {
      test.deepEqual(result.status_code, 200);
      test.done();
    }, function(error) {
      test.ifError(error);
      test.done();
    });
  },

  'Get info about single short url with callback': function(test) {
    bitly.info(SHORT_URL, function(error, result) {
      test.ifError(error);
      test.deepEqual(result.status_code, 200);
      test.done();
    });
  },

  'Get info about single short url with promise': function(test) {
    bitly.info(SHORT_URL).then(function(result) {
      test.deepEqual(result.status_code, 200);
      test.done();
    }, function(error) {
      test.ifError(error);
      test.done();
    });
  },

  'Get info about single hash with callback': function(test) {
    bitly.info(BITLY_HASH, function(error, result) {
      test.ifError(error);
      test.deepEqual(result.status_code, 200);
      test.done();
    });
  },

  'Get info about single hash with promise': function(test) {
    bitly.info(BITLY_HASH).then(function(result) {
      test.deepEqual(result.status_code, 200);
      test.done();
    }, function(error) {
      test.ifError(error);
      test.done();
    });
  },

  'Get info about mixed url and hash with callback': function(test) {
    bitly.info([SHORT_URL, BITLY_HASH], function(error, result) {
      test.ifError(error);
      test.deepEqual(result.status_code, 200);
      test.done();
    });
  },

  'Get info about mixed url and hash with promise': function(test) {
    bitly.info([SHORT_URL, BITLY_HASH]).then(function(result) {
      test.deepEqual(result.status_code, 200);
      test.done();
    }, function(error) {
      test.ifError(error);
      test.done();
    });
  },

  'Get clicks for single short url with callback': function(test) {
    bitly.clicks(SHORT_URL, function(error, result) {
      test.ifError(error);
      test.deepEqual(result.status_code, 200);
      test.done();
    });
  },

  'Get clicks for single short url with promise': function(test) {
    bitly.clicks(SHORT_URL).then(function(result) {
      test.deepEqual(result.status_code, 200);
      test.done();
    }, function(error) {
      test.ifError(error);
      test.done();
    });
  },

  'Get clicks for single hash with callback': function(test) {
    bitly.clicks(BITLY_HASH, function(error, result) {
      test.ifError(error);
      test.deepEqual(result.status_code, 200);
      test.done();
    });
  },

  'Get clicks for single hash with promise': function(test) {
    bitly.clicks(BITLY_HASH).then(function(result) {
      test.deepEqual(result.status_code, 200);
      test.done();
    }, function(error) {
      test.ifError(error);
      test.done();
    });
  },

  'Get clicks for mixed url and hash with callback': function(test) {
    bitly.clicks([SHORT_URL, BITLY_HASH], function(error, result) {
      test.ifError(error);
      test.deepEqual(result.status_code, 200);
      test.done();
    });
  },

  'Get clicks for mixed url and hash with promise': function(test) {
    bitly.clicks([SHORT_URL, BITLY_HASH]).then(function(result) {
      test.deepEqual(result.status_code, 200);
      test.done();
    }, function(error) {
      test.ifError(error);
      test.done();
    });
  },

  'Get clicks by minute for single short url with callback': function(test) {
    bitly.clicksByMinute(SHORT_URL, function(error, result) {
      test.ifError(error);
      test.deepEqual(result.status_code, 200);
      test.done();
    });
  },

  'Get clicks by minute for single short url with promise': function(test) {
    bitly.clicksByMinute(SHORT_URL).then(function(result) {
      test.deepEqual(result.status_code, 200);
      test.done();
    }, function(error) {
      test.ifError(error);
      test.done();
    });
  },

  'Get clicks by minute for single hash with callback': function(test) {
    bitly.clicksByMinute(BITLY_HASH, function(error, result) {
      test.ifError(error);
      test.deepEqual(result.status_code, 200);
      test.done();
    });
  },

  'Get clicks by minute for single hash with promise': function(test) {
    bitly.clicksByMinute(BITLY_HASH).then(function(result) {
      test.deepEqual(result.status_code, 200);
      test.done();
    }, function(error) {
      test.ifError(error);
      test.done();
    });
  },

  'Get clicks by minute for mixed url and hash with callback': function(test) {
    bitly.clicksByMinute([SHORT_URL, BITLY_HASH], function(error, result) {
      test.ifError(error);
      test.deepEqual(result.status_code, 200);
      test.done();
    });
  },

  'Get clicks by minute for mixed url and hash with promise': function(test) {
    bitly.clicksByMinute([SHORT_URL, BITLY_HASH]).then(function(result) {
      test.deepEqual(result.status_code, 200);
      test.done();
    }, function(error) {
      test.ifError(error);
      test.done();
    });
  },

  'Get clicks by day for single short url with callback': function(test) {
    bitly.clicksByDay(SHORT_URL, function(error, result) {
      test.ifError(error);
      test.deepEqual(result.status_code, 200);
      test.done();
    });
  },

  'Get clicks by day for single short url with promise': function(test) {
    bitly.clicksByDay(SHORT_URL).then(function(result) {
      test.deepEqual(result.status_code, 200);
      test.done();
    }, function(error) {
      test.ifError(error);
      test.done();
    });
  },

  'Get clicks by day for single hash with callback': function(test) {
    bitly.clicksByDay(BITLY_HASH, function(error, result) {
      test.ifError(error);
      test.deepEqual(result.status_code, 200);
      test.done();
    });
  },

  'Get clicks by day for single hash with promise': function(test) {
    bitly.clicksByDay(BITLY_HASH).then(function(result) {
      test.deepEqual(result.status_code, 200);
      test.done();
    }, function(error) {
      test.ifError(error);
      test.done();
    });
  },

  'Get clicks by day for mixed url and hash with callback': function(test) {
    bitly.clicksByDay([SHORT_URL, BITLY_HASH], function(error, result) {
      test.ifError(error);
      test.deepEqual(result.status_code, 200);
      test.done();
    });
  },

  'Get clicks by day for mixed url and hash with promise': function(test) {
    bitly.clicksByDay([SHORT_URL, BITLY_HASH]).then(function(result) {
      test.deepEqual(result.status_code, 200);
      test.done();
    }, function(error) {
      test.ifError(error);
      test.done();
    });
  },


  'Get referrers for single short url with callback': function(test) {
    bitly.referrers(SHORT_URL, function(error, result) {
      test.ifError(error);
      test.deepEqual(result.status_code, 200);
      test.done();
    });
  },

  'Get referrers for single short url with promise': function(test) {
    bitly.referrers(SHORT_URL).then(function(result) {
      test.deepEqual(result.status_code, 200);
      test.done();
    }, function(error) {
      test.ifError(error);
      test.done();
    });
  },

  'Get referrers for single hash with callback': function(test) {
    bitly.referrers(BITLY_HASH, function(error, result) {
      test.ifError(error);
      test.deepEqual(result.status_code, 200);
      test.done();
    });
  },

  'Get referrers for single hash with promise': function(test) {
    bitly.referrers(BITLY_HASH).then(function(result) {
      test.deepEqual(result.status_code, 200);
      test.done();
    }, function(error) {
      test.ifError(error);
      test.done();
    });
  },

  'Get countries for single short url with callback': function(test) {
    bitly.countries(SHORT_URL, function(error, result) {
      test.ifError(error);
      test.deepEqual(result.status_code, 200);
      test.done();
    });
  },

  'Get countries for single short url with promise': function(test) {
    bitly.countries(SHORT_URL).then(function(result) {
      test.deepEqual(result.status_code, 200);
      test.done();
    }, function(error) {
      test.ifError(error);
      test.done();
    });
  },


  'Get countries for single hash with callback': function(test) {
    bitly.countries(BITLY_HASH, function(error, result) {
      test.ifError(error);
      test.deepEqual(result.status_code, 200);
      test.done();
    });
  },

  'Get countries for single hash with promise': function(test) {
    bitly.countries(BITLY_HASH).then(function(result) {
      test.deepEqual(result.status_code, 200);
      test.done();
    }, function(error) {
      test.ifError(error);
      test.done();
    });
  },

  'Look up information about 1 long url with callback': function(test) {
    bitly.lookup(LONG_URL, function(error, result) {
      test.ifError(error);
      test.deepEqual(result.status_code, 200);
      test.done();
    });
  },

  'Look up information about 1 long url with promise': function(test) {
    bitly.lookup(LONG_URL).then(function(result) {
      test.deepEqual(result.status_code, 200);
      test.done();
    }, function(error) {
      test.ifError(error);
      test.done();
    });
  },

  'Look up information about multiple long url with callback': function(test) {
    bitly.lookup([LONG_URL, 'http://nodejs.org'], function(error, result) {
      test.ifError(error);
      test.deepEqual(result.status_code, 200);
      test.done();
    });
  },

  'Look up information about multiple long url with promise': function(test) {
    bitly.lookup([LONG_URL, 'http://nodejs.org']).then(function(result) {
      test.deepEqual(result.status_code, 200);
      test.done();
    }, function(error) {
      test.ifError(error);
      test.done();
    });
  },

  'Expand for single short url with callback': function(test) {
    bitly.expand(SHORT_URL, function(error, result) {
      test.ifError(error);
      test.deepEqual(result.status_code, 200);
      test.done();
    });
  },

  'Expand for single short url with promise': function(test) {
    bitly.expand(SHORT_URL).then(function(result) {
      test.deepEqual(result.status_code, 200);
      test.done();
    }, function(error) {
      test.ifError(error);
      test.done();
    });
  },


  'Expand for single hash with callback': function(test) {
    bitly.expand(BITLY_HASH, function(error, result) {
      test.ifError(error);
      test.deepEqual(result.status_code, 200);
      test.done();
    });
  },

  'Expand for single hash with promise': function(test) {
    bitly.expand(BITLY_HASH).then(function(result) {
      test.deepEqual(result.status_code, 200);
      test.done();
    }, function(error) {
      test.ifError(error);
      test.done();
    });
  },

  'Expand for mixed url and hash with callback': function(test) {
    bitly.expand([SHORT_URL, BITLY_HASH], function(error, result) {
      test.ifError(error);
      test.deepEqual(result.status_code, 200);
      test.done();
    });
  },

  'Expand for mixed url and hash with promise': function(test) {
    bitly.expand([SHORT_URL, BITLY_HASH]).then(function(result) {
      test.deepEqual(result.status_code, 200);
      test.done();
    }, function(error) {
      test.ifError(error);
      test.done();
    });
  },

  'Edit the title of an existing link': function(test) {
    test.expect(2);
    bitly.linkEdit('title', SHORT_URL, 'Edited title', function(error, result) {
      test.ifError(error);
      test.deepEqual(result.status_code, 200);
      test.done();
    });
  },

  'Edit the note of an existing link': function(test) {
    test.expect(2);
    bitly.linkEdit('note', SHORT_URL, 'Edited note', function(error, result) {
      test.ifError(error);
      test.deepEqual(result.status_code, 200);
      test.done();
    });
  },

  'Edit the private status of an existing link': function(test) {
    test.expect(2);
    bitly.linkEdit('private', SHORT_URL, 'true', function(error, result) {
      test.ifError(error);
      test.deepEqual(result.status_code, 200);
      test.done();
    });
  },

  'Edit the user timestamp of an existing link': function(test) {
    test.expect(2);
    bitly.linkEdit('user_ts', SHORT_URL, '522585000', function(error, result) {
      test.ifError(error);
      test.deepEqual(result.status_code, 200);
      test.done();
    });
  },

  'Edit the archived status of an existing link': function(test) {
    test.expect(2);
    bitly.linkEdit('archived', SHORT_URL, 'true', function(error, result) {
      test.ifError(error);
      test.deepEqual(result.status_code, 200);
      test.done();
    });
  },

  'Takes an array of metadata to edit': function(test) {
    test.expect(2);
    bitly.linkEdit(['title', 'note'], SHORT_URL, ['new title', 'new note'], function(error, result) {
      test.ifError(error);
      test.deepEqual(result.status_code, 200);
      test.done();
    });
  },

  "Throws if trying to edit a non existent link": function(test) {
    test.expect(1);
    test.throws(bitly.linkEdit('tite', 'http://bit.ly/invalidhash', 'new title', function(error, result) {
      test.done();
    }));
  },

  "Throws if trying to edit a non existent metadata parameter": function(test) {
    test.expect(1);
    test.throws(bitly.linkEdit('normality', SHORT_URL, 'restored', function(error, result) {
      test.done();
    }));
  }
};
