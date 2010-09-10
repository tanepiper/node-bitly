var url = require('url'),
    querystring = require('querystring')
    http = require('http');

var Bitly = function(login, api_key, options) {
  options = options || {
    format      : 'json',
    api_url     : 'api.bit.ly',
    api_version : 'v3',
    domain      : 'bit.ly'
  };
  this.config = {
    login       : login,
    api_key     : api_key,
    format      : options.format,
    api_url     : options.api_url,
    api_version : options.api_version,
    domain      : options.domain
  };
};

Bitly.prototype = {
  
  _parseChunks : function(chunks) {
    return chunks.join('');
  },
  _generateNiceUrl  : function(query, method) {
    return url.parse(url.format({
      protocol: 'http',
      hostname: this.config.api_url,
      pathname: '/' + this.config.api_version + '/' + method,
      query: query
    }));
  },
  _doRequest  : function(request_query, cb) {
    var scope = this;
    var client = http.createClient(80, request_query.hostname);
    var request = client.request('GET', request_query.pathname + '?' + request_query.query, {'host' : request_query.hostname});
    request.end();
    request.on('response', function(response){
      var data = [];
      response.on('data', function(chunk) {
        data.push(chunk);
      });
      response.on('end', function() {
        var urldata = scope._parseChunks(data);
        var result = JSON.parse(urldata)
        return cb(result);
      });
    });
  },
  shortenUrl  : function(longUrl, cb) {
    var query = querystring.stringify({
        login  : this.config.login,
        apiKey : this.config.api_key,
        format : this.config.format,
        longUrl: longUrl,
        domain: this.config.domain
    }, '&', '=', false);
    var request_query = this._generateNiceUrl(query, 'shorten');
    this._doRequest(request_query, cb);
  },
  expandUrl : function(shortUrl, cb) {
    var query = querystring.stringify({
        login     : this.config.login,
        apiKey    : this.config.api_key,
        format    : this.config.format,
        shortUrl  : shortUrl,
        domain    : this.config.domain
    }, '&', '=', false);
    var request_query = this._generateNiceUrl(query, 'expand');
    this._doRequest(request_query, cb);
  },
  expandHash  : function(hash, cb) {
    var query = querystring.stringify({
        login     : this.config.login,
        apiKey    : this.config.api_key,
        format    : this.config.format,
        hash      : hash,
        domain    : this.config.domain
    }, '&', '=', false);
    var request_query = this._generateNiceUrl(query, 'expand');
    this._doRequest(request_query, cb);
  },
  expandMixed : function(items, cb) {
    var query_object = {
      login     : this.config.login,
        apiKey    : this.config.api_key,
        format    : this.config.format,
        domain    : this.config.domain
    }
    if (items.shortUrl) {
      query_object.shortUrl = items.shortUrl;
    }
    if (items.hash) {
      query_object.hash = items.hash;
    }
    var query = querystring.stringify(query_object, '&', '=', false);
    var request_query = this._generateNiceUrl(query, 'expand');
    this._doRequest(request_query, cb);
  }
};

exports.Bitly = Bitly;