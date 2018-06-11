# node-bitly - Bitly API for nodejs

[![CircleCI](https://circleci.com/gh/tanepiper/node-bitly.svg?style=svg)](https://circleci.com/gh/tanepiper/node-bitly) [![NPM version](https://badge.fury.io/js/bitly.png)](http://badge.fury.io/js/bitly) [![Dependencies](https://david-dm.org/tanepiper/node-bitly.svg)](https://david-dm.org/tanepiper/node-bitly)

This module provides calls to the [Bitly](http://bitly.com) API for [Nodejs](http://nodejs.org).
For more information on the API request and responses visit the [Bitly API docs](http://dev.bitly.com/api.html)

`node-bitly` is programmed with `TypeScript` but is compiled to JavaScript and supports `node 6, 8, 10`.

## Installation

To install via NPM type the following: `npm install bitly`

You can also install via git by cloning: `git clone https://github.com/tanepiper/node-bitly.git /path/to/bitly`

## Usage

**Note: This is the Version 6 API**

This library uses the API provided by bitly and requires an OAuth token to use.
To get your access token, visit [OAuth Apps](https://bitly.com/a/oauth_apps) (under Generic Access Token)

See [http://dev.bitly.com](http://dev.bitly.com/) for format of returned objects from the API

To see the available libary APIs, you can view the [API Documentation](docs/api.md)

### Code
#### TypeScript / ES6 Imports
```js
import { BitlyClient } from 'bitly';
const bitly = new BitlyClient('<accessToken>', {});
try {
  return await bitly.shorten(uri);
} catch(e) {
  throw e;
}
```
#### JavaScript
```js
const { BitlyClient } = require('bitly');
const bitly = new BitlyClient('<accessToken>', {});

try {
  const data = await bitly.shorten(uri);
} catch(e) {
  throw e;
}
return data;
```

If you are not using `node 8` then you can still use the library with `Promise` values:

```js
const BitlyClient = require('bitly');
const bitly = BitlyClient('<accessToken>');

bitly.shorten('https://github.com/tanepiper/node-bitly')
.then(function(result) {
  console.log(result);
})
.catch(function(error) {
  console.error(error);
});
```

You can also do raw requests to any Bitly endpoint.  With this you need to pass the access
token to the method

```js
const BitlyClient = require('bitly');
const bitly = new BitlyClient('<accessToken>');

try {
  return await bitly.bitlyRequest('link/referrers_by_domain', {
    link: 'https://github.com/tanepiper/node-bitly',
    unit: 'hour',
    timezone: 'Europe/Amsterdam'
  });
} catch(e) {
  throw e;
}
```

### Tests

To run tests type `npm test`.  Please note one test will fail if you use your own API key, please update the string accordingly.
