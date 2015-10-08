/**
 * node-bitly - A node module for calling the bitly API
 * See http://code.google.com/p/bitly-api/wiki/ApiDocumentation for details
 * about the API requests and responses
 * Copyright (c) 2011 Tane Piper
 * MIT Licence
 */

var q = require('q');
var url = require('url');
var https = require('https');

/**
 * The main Bitly constructor, takes the users login, api key and additional options
 * @param {String} login   The user login
 * @param {String} api_key The users API key
 * @param {Object} options Optional options
 */
var Bitly = function(access_token, options) {
  // Set default options
  options = options || {
    format: 'json',
    api_url: 'api-ssl.bitly.com',
    api_version: 'v3',
    domain: 'bit.ly'
  };

  // Set up the config for requests being made with the instance of this
  this.config = {
    access_token: access_token,
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
  // Make sure the access_token gets sent with every query
  query['access_token'] = this.config.access_token;

  var result = url.parse(url.format({
    protocol: 'https',
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
 * @param  {Function=} cb The callback function for the returned data
 * @return {Promise|void}
 */
Bitly.prototype._doRequest = function(request_query, cb) {

  var deferred;

  if (!cb || typeof !cb === 'function') {
    deferred = q.defer();
  }

  // Pass the requested URL as an object to the get request
  https.get(request_query, function(res) {
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

        if (result.status_code !== 200) {
          var error = new Error(result.status_txt);
          error.code = result.status_code;
          return deferred ? deferred.reject(error) : cb(error);
        }
        return deferred ? deferred.resolve(result) : cb(null, result);

      });
  })
  .on('error', function(e) {
    if (deferred) {
      return deferred.reject(e);
    }
    return cb(e);
  });

  if (deferred) {
    return deferred.promise;
  }
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
 * @param  {String=} domain The domain to use (optional)
 * @param  {Function=} cb The callback function with the results
 * @return {Promise|void}
 */
Bitly.prototype.shorten = function(longUrl, domain, cb) {
  if (typeof(domain) == 'function') {
    cb = domain;
    domain = null;
  }
  var query = {
    format: this.config.format,
    longUrl: longUrl,
    domain: this.config.domain
  };

  if (domain) {
    query.domain = domain;
  }

  return this._doRequest(this._generateNiceUrl(query, 'shorten'), cb);
};

/**
 * Request to expand a single short url, short hash or mixed array or items
 * @param  {String|Array} items  The string or array of short urls and/or hashes to expand
 * @param  {Function=} cb The callback function with the results
 * @return {Promise|void}
 */
Bitly.prototype.expand = function(items, cb) {
  var query = {
    format: this.config.format,
    domain: this.config.domain
  };

  if (typeof items === 'string') {
    var type = (this._urlCheck(items)) ? 'shortUrl' : 'hash';
    query[type] = items;
  } else {
    this._sortUrlsAndHash(items, query);
  }

  return this._doRequest(this._generateNiceUrl(query, 'expand'), cb);
};

/**
 * Request to get clicks for a single short url, short hash or mixed array or items
 * @param  {String|Array} items  The string or array of short urls and/or hashes to expand
 * @param  {Function=} cb The callback function
 * @return {Promise|void}
 */
Bitly.prototype.clicks = function(items, cb) {
  var query = {
    format: this.config.format,
    domain: this.config.domain
  };

  if (typeof items === 'string') {
    var type = (this._urlCheck(items)) ? 'shortUrl' : 'hash';
    query[type] = items;
  } else {
    this._sortUrlsAndHash(items, query);
  }

  return this._doRequest(this._generateNiceUrl(query, 'clicks'), cb);
};

/**
 * Request to get clicks by minute for a single short url, short hash or mixed array or items
 * @param  {String|Array} items  The string or array of short urls and/or hashes to expand
 * @param  {Function=} cb The callback function
 * @return {Promise|void}
 */
Bitly.prototype.clicksByMinute = function(items, cb) {
  var query = {
    format: this.config.format,
    domain: this.config.domain
  };

  if (typeof items === 'string') {
    var type = (this._urlCheck(items)) ? 'shortUrl' : 'hash';
    query[type] = items;
  } else {
    this._sortUrlsAndHash(items, query);
  }

  return this._doRequest(this._generateNiceUrl(query, 'clicks_by_minute'), cb);

};

/**
 * Request to get clicks by day for a single short url, short hash or mixed array or items
 * @param  {String|Array} items  The string or array of short urls and/or hashes to expand
 * @param  {Function=} cb The callback function
 * @return {Promise|void}
 */
Bitly.prototype.clicksByDay = function(items, cb) {
  var query = {
    format: this.config.format,
    domain: this.config.domain
  };

  if (typeof items === 'string') {
    var type = (this._urlCheck(items)) ? 'shortUrl' : 'hash';
    query[type] = items;
  } else {
    this._sortUrlsAndHash(items, query);
  }

  return this._doRequest(this._generateNiceUrl(query, 'clicks_by_day'), cb);
};

/**
 * Request to get look up an existing bitly link for a long url or array of urls
 * @param  {String|Array} links  The string or array of long urls
 * @param  {Function=} cb The callback function
 * @return {Promise|void}
 */
Bitly.prototype.lookup = function(links, cb) {
  var query = {
    format: this.config.format,
    url: links,
    domain: this.config.domain
  };

  return this._doRequest(this._generateNiceUrl(query, 'lookup'), cb);

};

/**
 * Request to get clicks by day for a single short url, short hash or mixed array or items
 * @param  {String|Array} items  The string or array of short urls and/or hashes to expand
 * @param  {Function=} cb The callback function
 * @return {Promise|void}
 */
Bitly.prototype.info = function(items, cb) {
  var query = {
    format: this.config.format,
    domain: this.config.domain
  };

  if (typeof items === 'string') {
    var type = (this._urlCheck(items)) ? 'shortUrl' : 'hash';
    query[type] = items;
  } else {
    this._sortUrlsAndHash(items, query);
  }

  return this._doRequest(this._generateNiceUrl(query, 'info'), cb);
};



/**
 * Request the informations on all referrers for a short url.  This function only
 * accepts one url (as per the limit of the bitly API)
 * @param  {String} link The link be checked
 * @param  {Function=} cb The callback function
 * @return {Promise|void}
 */
Bitly.prototype.referrers = function(link, cb) {
  var query = {
    format: this.config.format,
    domain: this.config.domain
  };

  query[(this._urlCheck(link)) ? 'shortUrl' : 'hash'] = link;

  return this._doRequest(this._generateNiceUrl(query, 'referrers'), cb);
};

/**
 * Request the information on all countries for a short url.  This function only
 * accepts one url (as per the limit of the bitly API)
 * @param  {Function=} cb The callback function
 * @return {Promise|void}
 */
Bitly.prototype.countries = function(link, cb) {
  var query = {
    format: this.config.format,
    domain: this.config.domain
  };

  query[(this._urlCheck(link)) ? 'shortUrl' : 'hash'] = link;

  return this._doRequest(this._generateNiceUrl(query, 'countries'), cb);
};

/**
 * Request to confirm a pro-domain it set up with bitly
 * @param  {String} domain The domain to be checked
 * @param  {Function=} cb The callback function
 * @return {Promise|void}
 */
Bitly.prototype.bitlyProDomain = function(domain, cb) {
  var query = {
    format: this.config.format,
    domain: domain
  };

  return this._doRequest(this._generateNiceUrl(query, 'bitly_pro_domain'), cb);
};

/**
 * Request entries from a user's link history in reverse chronological order
 * @param  {Function=} cb The callback function
 * @return {Promise|void}
 */
Bitly.prototype.history = function(cb) {
  var query = {
    // @todo Implement optional parameters:
    //   http://dev.bitly.com/user_info.html#v3_user_link_history
  };

  return this._doRequest(this._generateNiceUrl(query, 'user/link_history'), cb);
};

/**
 * Edit an existing link's metadata
 * @param {String|Array} metadata_field Metadata field to edit (title, note, private, user_ts or archived). To edit
 * multiple fields, pass an array of field names as strings, e.g. ['title', 'note']
 * @param {String} link The Bitlink to be edited (requires protocol, i.e "example.com" won't work but "http://example.com"
 * will)
 * @param {String|Array} new_value The new value for the edited metadata. If you pass an array to metadata_field, you
 * have to pass an array to new_value. The index have to match those in metadata_field, e.g. metadata_field[0] will be
 * changed to new_value[0] etc.
 * @param {Function=} cb The callback
 * @return {Promise|void}
 */
Bitly.prototype.linkEdit = function(metadata_field, link, new_value, cb) {
  var query = {
    link: link
  };

  // We can use an array of fields and matching values to edit multiple metadata fields or strings to edit only a
  // single one
  if(Array.isArray(metadata_field) && Array.isArray(new_value)) {
    query['edit'] = metadata_field.join(',');
    metadata_field.forEach(function mapMetadataToValue(field, index) {
      query[field] = new_value[index];
    });
  } else {
    query['edit'] = metadata_field;
    query[metadata_field] = new_value;
  }

  return this._doRequest(this._generateNiceUrl(query, 'user/link_edit'), cb);
};

// Export as main entry point in this module
module.exports = Bitly;
