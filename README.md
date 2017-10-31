# node-bitly - Bitly API for nodejs

[![CircleCI](https://circleci.com/gh/tanepiper/node-bitly/tree/refactor.svg?style=svg)](https://circleci.com/gh/tanepiper/node-bitly/tree/refactor)

[![NPM version](https://badge.fury.io/js/bitly.png)](http://badge.fury.io/js/bitly)

[![Dependencies](https://david-dm.org/tanepiper/node-bitly.svg)](https://david-dm.org/tanepiper/node-bitly)

This module provides calls to the [Bitly](http://bitly.com) API for [Nodejs](http://nodejs.org).
For more information on the API request and responses visit the [Bitly API docs](http://dev.bitly.com/api.html)

Version 5 of this library only support `Node 8.x.x` and above as it uses `async/await`

## Installation

To install via NPM type the following: `npm install bitly`

You can also install via git by cloning: `git clone https://github.com/tanepiper/node-bitly.git /path/to/bitly`

## Usage

This library uses the API provided by bitly and requires an OAuth token to use.
To get your access token, visit https://bitly.com/a/oauth_apps (under Generic Access Token)

See http://dev.bitly.com/ for format of returned objects from the API

#### Code

```js
const BitlyClient = require('bitly');
const bitly = BitleyClient('<accessToken>');

const myFunc = async(uri = 'https://github.com/tanepiper/node-bitly') => {
  try {
    return await bitly.shorten(uri);
  } catch(e) {
    throw e;
  }
}
```

You can also do raw requests to any Bitly endpoint.  With this you need to pass the access
token to the method

```js
const BitlyClient = require('bitly');
const MY_API_TOKEN = '<accessToken>';
const bitly = BitleyClient(MY_API_TOKEN);

const myFunc = async(method, data) => {
  try {
    return await bitly.doRequest({accessToken: MY_API_TOKEN, method, data});
  } catch(e) {
    throw e;
  }
}
```

## Tests
To run tests type `npm test`. For coverage type `npm run coverage`

### Bit.ly Features

This module is limited to the following API methods:

* info
* shorten
* expand
* clicks / clicks_by_minute / clicks_by_day
* referrers
* countries
* lookup
