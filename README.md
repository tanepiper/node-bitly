# Bit.ly For node.js #

The bit.ly library for node.js provides methods to pass URL requests to bit.ly

## Features ##

- Shorten Url.
- Expand single/multiple Urls
- Expand single/multiple hashes
- Expand mixed urls/hashes
- Get Clicks for URLs
- Get Info about URLs
- Lookup URLs
- Check for pro domain
- Check for authenticated account

## Usage ##

    var Bitly = require('bitly').Bitly;
    var bitly = new Bitly('<YOUR USERNAME>', '<YOUR API KEY>');

To see the methods available, see examples in the tests folder.  All methods
take a string or array list of urls or hashes and a callback to return the data

See http://code.google.com/p/bitly-api/wiki/ApiDocumentation for format of
returned object