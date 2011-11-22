node-bitly - bit.ly API for nodejs
====================

[![Build Status](https://secure.travis-ci.org/tanepiper/node-bitly.png)](http://travis-ci.org/tanepiper/node-bitly)


This module makes the [bit.ly](http://bitly.com) API accessible via NodeJS

Installation
------------

To install via NPM type the following:

    npm install bitly

You can also install via git by cloning:

    git clone git://github.com/tanepiper/node-bitly.git /path/to/node_modules/bitly


Usage
-----

    var Bitly = require('bitly');
    var bitly = new Bitly('<YOUR USERNAME>', '<YOUR API KEY>');
    bitly.shorten('https://github.com/tanepiper/node-bitly', function(err, response) {
      if (err) throw err;

      // See http://code.google.com/p/bitly-api/wiki/ApiDocumentation for format of returned object
      var short_url = response.data.url

      // Do something with data
    });


Bit.ly Features
---------------
* Shorten Url.
* Expand single/multiple Urls
* Expand single/multiple hashes
* Expand mixed urls/hashes
* Get Clicks for URLs
* Get Info about URLs
* Lookup URLs
* Check for pro domain
* Check for authenticated account
