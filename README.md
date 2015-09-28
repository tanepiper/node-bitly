node-bitly - Bitly API for nodejs
====================

[![Build Status](https://secure.travis-ci.org/tanepiper/node-bitly.png)](http://travis-ci.org/tanepiper/node-bitly)

[![NPM version](https://badge.fury.io/js/bitly.png)](http://badge.fury.io/js/bitly)

This module provides calls to the [Bitly](http://bitly.com) API for [Nodejs](http://nodejs.org).
For more information on the API request and responses visit the [Bitly API docs](http://dev.bitly.com/api.html)

Installation
------------
To install via NPM type the following: `npm install bitly`

You can also install via git by cloning: `git clone https://github.com/tanepiper/node-bitly.git /path/to/bitly`

Usage
-----
    var Bitly = require('bitly');
    var bitly = new Bitly('<YOUR ACCESS TOKEN>');
    // To get your access token, visit https://bitly.com/a/oauth_apps (under Generic Access Token)

    
    /**
     * With callback
     */
    bitly.shorten('https://github.com/tanepiper/node-bitly', function(err, response) {
      if (err) throw err;

      // See http://dev.bitly.com/ for format of returned object
      var short_url = response.data.url

      // Do something with data
    });
    
    /**
     * With promise
     */
    bitly.shorten('https://github.com/tanepiper/node-bitly')
      .then(function(response) {
        // See http://dev.bitly.com/ for format of returned object
        var short_url = response.data.url

        // Do something with data
      }, function(error) {
        throw error;
      });

Tests
-----
To run tests type `npm test`

Bit.ly Features
---------------
This module is limited to the following API methods:

* shorten
* expand
* clicks / clicks_by_minute / clicks_by_day
* referrers
* countries
* bitly_pro_domain
* lookup
* info
* history
* link_edit
