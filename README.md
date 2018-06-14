# node-bitly - Unofficial Bitly API for nodejs

[![CircleCI](https://circleci.com/gh/tanepiper/node-bitly.svg?style=svg)](https://circleci.com/gh/tanepiper/node-bitly) [![NPM version](https://badge.fury.io/js/bitly.png)](http://badge.fury.io/js/bitly) [![Dependencies](https://david-dm.org/tanepiper/node-bitly.svg)](https://david-dm.org/tanepiper/node-bitly)

## Current Versions

* [v6.0.x](https://github.com/tanepiper/node-bitly) - Support for Node >=6. Available on npm as `npm install bitly@latest`
* [v5.1.x](https://github.com/tanepiper/node-bitly/tree/v5.x.x) - Support for Node >=4. Available on npm as `npm install bitly@stable`

Version 5 is end-of-life and will only recieve minor updates in the future and is considered stable.  This will only ever support the **Bitly v3** API

Version 6 is the current in-development version, re-written in Typescript. This version currently only supports the **Bitly v3** API and will continue to do so in `v6.0.x`. Version `6.1.x` will introduce **Bitly v4** support.

## Module Features

This module provides calls to the [Bitly](http://bitly.com) API for [Nodejs](http://nodejs.org).

For more information on the API request and responses visit the [Bitly API docs](https://dev.bitly.com/api.html)

`node-bitly` is programmed with `TypeScript` but is compiled to JavaScript and supports `node 6, 8, 10`.  When you import the client you get full type information.  There maybe be some gaps in the information but this will be filled in, in future releases.

**Currently `node-bitly` only supports Bitly's `v3` API and has this hard coded in the parameter type.  Support for version 4 will be added in a future release**

## Installation

To install via NPM type the following: `npm install bitly`

You can also install via git by cloning: `git clone https://github.com/tanepiper/node-bitly.git /path/to/bitly`

## Usage

This library uses the API provided by bitly and requires an OAuth token to use.
To get your access token, visit [OAuth Apps](https://bitly.com/a/oauth_apps) (under Generic Access Token)

See [http://dev.bitly.com](http://dev.bitly.com/) for format of returned objects from the API

To see the available libary APIs, you can view the [API Documentation](http://tanepiper.github.io/node-bitly/index.html) offline, or you can view the index here (the generated documentation does not work on Github).

### Code

#### TypeScript / ES6 Imports

```js
import { BitlyClient } from 'bitly';
const bitly = new BitlyClient('<accessToken>', {});

async function init() {
  let result;
  try {
    result = await bitly.shorten('https://github.com/tanepiper/node-bitly');
  } catch (e) {
    throw e;
  }
  return result;
}

init();
```

#### JavaScript

```js
const { BitlyClient } = require('bitly');
const bitly = new BitlyClient('<accessToken>', {});

let result;
try {
  result = await bitly.shorten(uri);
} catch(e) {
  throw e;
}
return result;
```

If you are not using `node 8` then you can still use the library with `Promise` values:

```js
const BitlyClient = require('bitly');
const bitly = new BitlyClient('<accessToken>');

bitly
  .shorten('https://github.com/tanepiper/node-bitly')
  .then(function(result) {
    console.log(result);
  })
  .catch(function(error) {
    console.error(error);
  });
```

You can also do raw requests to any Bitly endpoint. With this you need to pass the access
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

To run tests type `npm test`. Please note one test will fail if you use your own API key, please update the string accordingly.

## Support This Project
This module is a side project of mine and I don't actively use the module except to completly over-engineer the CI pipeline and re-write it in Typescript all in the name of learning.  But to add features like the v4 API would take a lot of work, so if you use this library a lot please consider donating using the links below. Or if you learned something useful from one of my blog posts talking about the changes I've done with this module please consider leaving a tip.

[![Beerpay](https://beerpay.io/tanepiper/node-bitly/badge.svg?style=beer-square)](https://beerpay.io/tanepiper/node-bitly)  [![Beerpay](https://beerpay.io/tanepiper/node-bitly/make-wish.svg?style=flat-square)](https://beerpay.io/tanepiper/node-bitly?focus=wish)

You can also [PayPal Me](https://paypal.me/tanepiper).
