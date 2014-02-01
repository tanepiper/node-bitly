/**
 * node-bitly - A node module for calling the bitly API
 * See http://code.google.com/p/bitly-api/wiki/ApiDocumentation for details
 * about the API requests and responses
 * Copyright (c) 2011 Tane Piper
 * MIT Licence
 */


var url = require('url');
var http = require('http');

/**
 * The main Bitly constructor, takes the users login, api key and additional options
 * @param {String} login   The user login
 * @param {String} api_key The users API key
 * @param {Object} options Optional options
 */
var Bitly = function(login, api_key, options) {
  // Set default options
  options = options || {
    format: 'json',
    api_url: 'api.bit.ly',
    api_version: 'v3',
    domain: 'bit.ly'
  };

  // Set up the config for requests being made with the instance of this
  this.config = {
    login: login,
    api_key: api_key,
    format: options.format,
    api_url: options.api_url,
    api_version: options.api_version,
    domain: options.domain
  };

  return this;
};

/**
 * Generates the URL object to be passed to the HTTP request for a specific
 * API method call
 * @param  {Object} query  The query object
 * @param  {String} method The Bit.ly method to call with the request
 * @return {Object} The URL object for this request
 */
Bitly.prototype._generateNiceUrl = function(query, method) {
  var result = url.parse(url.format({
    protocol: 'http',
    hostname: this.config.api_url,
    pathname: '/' + this.config.api_version + '/' + method,
    query: query
  }));
  // HACK: Fixes the redirection issue in node 0.4.x
  if (!result.path) { result.path = result.pathname + result.search; }

  return result;
};

/**
 * Function to do a HTTP Get request with the current query
 * @param  {Object} request_query The current query object
 * @param  {Function} cb The callback function for the returned data
 * @return {void}
 */
Bitly.prototype._doRequest = function(request_query, cb) {
  // Pass the requested URL as an object to the get request
  http.get(request_query, function(res) {
      var data = [];
      res
      .on('data', function(chunk) { data.push(chunk); })
      .on('end', function() {
          var urldata = data.join('').trim();
          var result;
          try {
            result = JSON.parse(urldata);
          } catch (exp) {
            result = {'status_code': 500, 'status_text': 'JSON Parse Failed'};
          }
          cb(null, result);
      });
  })
  .on('error', function(e) {
      cb(e);
  });
};

/**
 * Function to check if a passed string is a valid URL
 * @param  {String} str The URL string to be checked
 * @return {Boolean}
 */
Bitly.prototype._urlCheck = function(str) {
    var v = new RegExp();
    v.compile("^[A-Za-z]+://[A-Za-z0-9-_]+\\.[A-Za-z0-9-_%&\\?\/.=]+$");
    if (!v.test(str)) return false;
    return true;
};

/**
 * Function to check through an array of items to check for short urls or hashes
 * @param  {Array} items The array of items to be checked
 * @param  {Object} The query object
 * @return {void)
 */
Bitly.prototype._sortUrlsAndHash = function(items, query) {
  var shortUrl = [];
  var hash = [];
  var i = 0, j = items.length;
  for(; i < j; i++) {
    if (this._urlCheck(items[i])) {
      shortUrl.push(items[i]);
    } else {
      hash.push(items[i]);
    }
  }
  if (shortUrl.length > 0) query.shortUrl = shortUrl;
  if (hash.length > 0) query.hash = hash;
};

/**
 * Request to shorten one long url
 * @param  {String} longUrl The URL to be shortened
 * @param  {String} domain The domain to use (optional)
 * @param  {Function} cb The callback function with the results
 * @return {void}
 */
Bitly.prototype.shorten = function(longUrl, domain, cb) {
  if (typeof(domain) == 'function') {
    cb = domain;
    domain = null;
  }
  var query = {
    login: this.config.login,
    apiKey: this.config.api_key,
    format: this.config.format,
    longUrl: longUrl,
    domain: this.config.domain
  };

  if (domain) {
    query.domain = domain;
  }

  this._doRequest(this._generateNiceUrl(query, 'shorten'), cb);
};

/**
 * Request to expand a single short url, short hash or mixed array or items
 * @param  {Mixed} items  The string or array of short urls and/or hashes to expand
 * @param  {Function} cb The callback function with the results
 * @return {void}
 */
Bitly.prototype.expand = function(items, cb) {
  var query = {
    login: this.config.login,
    apiKey: this.config.api_key,
    format: this.config.format,
    domain: this.config.domain
  };

  if (typeof items === 'string') {
    var type = (this._urlCheck(items)) ? 'shortUrl' : 'hash';
    query[type] = items;
  } else {
    this._sortUrlsAndHash(items, query);
  }

  this._doRequest(this._generateNiceUrl(query, 'expand'), cb);
};

/**
 * Request to get clicks for a single short url, short hash or mixed array or items
 * @param  {Mixed} items  The string or array of short urls and/or hashes to expand
 * @param  {Function} cb The callback function
 * @return {void}
 */
Bitly.prototype.clicks = function(items, cb) {
  var query = {
    login: this.config.login,
    apiKey: this.config.api_key,
    format: this.config.format,
    domain: this.config.domain
  };

  if (typeof items === 'string') {
    var type = (this._urlCheck(items)) ? 'shortUrl' : 'hash';
    query[type] = items;
  } else {
    this._sortUrlsAndHash(items, query);
  }

  this._doRequest(this._generateNiceUrl(query, 'clicks'), cb);
};

/**
 * Request to get clicks by minute for a single short url, short hash or mixed array or items
 * @param  {Mixed} items  The string or array of short urls and/or hashes to expand
 * @param  {Function} cb The callback function
 * @return {void}
 */
Bitly.prototype.clicksByMinute = function(items, cb) {
  var query = {
    login: this.config.login,
    apiKey: this.config.api_key,
    format: this.config.format,
    domain: this.config.domain
  };

  if (typeof items === 'string') {
    var type = (this._urlCheck(items)) ? 'shortUrl' : 'hash';
    query[type] = items;
  } else {
    this._sortUrlsAndHash(items, query);
  }

  this._doRequest(this._generateNiceUrl(query, 'clicks_by_minute'), cb);

};

/**
 * Request to get clicks by day for a single short url, short hash or mixed array or items
 * @param  {Mixed} items  The string or array of short urls and/or hashes to expand
 * @param  {Function} cb The callback function
 * @return {void}
 */
Bitly.prototype.clicksByDay = function(items, cb) {
  var query = {
    login: this.config.login,
    apiKey: this.config.api_key,
    format: this.config.format,
    domain: this.config.domain
  };

  if (typeof items === 'string') {
    var type = (this._urlCheck(items)) ? 'shortUrl' : 'hash';
    query[type] = items;
  } else {
    this._sortUrlsAndHash(items, query);
  }

  this._doRequest(this._generateNiceUrl(query, 'clicks_by_day'), cb);
};

/**
 * Request to get look up an existing bitly link for a long url or array of urls
 * @param  {Mixed} items  The string or array of long urls
 * @param  {Function} cb The callback function
 * @return {void}
 */
Bitly.prototype.lookup = function(links, cb) {
  var query = {
    login: this.config.login,
    apiKey: this.config.api_key,
    format: this.config.format,
    url: links,
    domain: this.config.domain
  };

  this._doRequest(this._generateNiceUrl(query, 'lookup'), cb);

};

/**
 * Request to get clicks by day for a single short url, short hash or mixed array or items
 * @param  {Mixed} items  The string or array of short urls and/or hashes to expand
 * @param  {Function} cb The callback function
 * @return {void}
 */
Bitly.prototype.info = function(items, cb) {
  var query = {
    login: this.config.login,
    apiKey: this.config.api_key,
    format: this.config.format,
    domain: this.config.domain
  };

  if (typeof items === 'string') {
    var type = (this._urlCheck(items)) ? 'shortUrl' : 'hash';
    query[type] = items;
  } else {
    this._sortUrlsAndHash(items, query);
  }

  this._doRequest(this._generateNiceUrl(query, 'info'), cb);
};



/**
 * Request the informations on all referrers for a short url.  This function only
 * accepts one url (as per the limit of the bitly API)
 * @param  {String} link The link be checked
 * @param  {Function} cb The callback function
 * @return {void}
 */
Bitly.prototype.referrers = function(link, cb) {
  var query = {
    login: this.config.login,
    apiKey: this.config.api_key,
    format: this.config.format,
    domain: this.config.domain
  };

  query[(this._urlCheck(link)) ? 'shortUrl' : 'hash'] = link;

  this._doRequest(this._generateNiceUrl(query, 'referrers'), cb);
};

/**
 * Request the information on all countries for a short url.  This function only
 * accepts one url (as per the limit of the bitly API)
 * @param  {Function} cb The callback function
 * @return {void}
 */
Bitly.prototype.countries = function(link, cb) {
  var query = {
    login: this.config.login,
    apiKey: this.config.api_key,
    format: this.config.format,
    domain: this.config.domain
  };

  query[(this._urlCheck(link)) ? 'shortUrl' : 'hash'] = link;

  this._doRequest(this._generateNiceUrl(query, 'countries'), cb);
};

/**
 * Request to confirm a pro-domain it set up with bitly
 * @param  {String} domain The domain to be checked
 * @param  {Function} cb The callback function
 * @return {void}
 */
Bitly.prototype.bitlyProDomain = function(domain, cb) {
  var query = {
    login: this.config.login,
    apiKey: this.config.api_key,
    format: this.config.format,
    domain: domain
  };

  this._doRequest(this._generateNiceUrl(query, 'bitly_pro_domain'), cb);
};

/**
 * Request to validate that a login + API key are enabled with Bitly
 * @param  {String} x_login   The login to be validated
 * @param  {String} x_apiKey  The API key to be validated
 * @param  {Function} cb The callback
 * @return {void}
 */
Bitly.prototype.validate = function(x_login, x_apiKey, cb) {
  var query = {
    login: this.config.login,
    apiKey: this.config.api_key,
    format: this.config.format,
    x_login: x_login,
    x_apiKey: x_apiKey
  };

  this._doRequest(this._generateNiceUrl(query, 'validate'), cb);
};

// Export as main entry point in this module
module.exports = Bitly;