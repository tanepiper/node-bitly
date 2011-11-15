(function() {
  var http, https, qs, url, _;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  _ = require('underscore');
  qs = require('querystring');
  url = require('url');
  http = require('http');
  https = require('https');
  exports.Bitly = (function() {
    function Bitly(options, secure) {
      if (!options.login) {
        throw new Error('Bit.ly Login Required');
      }
      if (!options.api_key) {
        throw new Error('Bit.ly API Key Required');
      }
      this.config = _.defaults(options, {
        format: 'json',
        api_url: 'api.bit.ly',
        api_version: 'v3',
        domain: 'bit.ly'
      });
      this.requester = secure ? http : https;
    }
    Bitly.prototype._parseChunks = function(chunks) {
      return chunks.join('');
    };
    Bitly.prototype._niceUrl = function(query, method) {
      return url.parse("http://" + this.config.api_url + "/" + this.config.api_version + "/" + method + "?" + query);
    };
    Bitly.prototype._doRequest = function(host, path, cb) {
      return this.requester.get({
        host: host,
        path: path
      }, __bind(function(res) {
        var data;
        data = [];
        res.on('data', function(chunk) {
          return data.push(chunk);
        });
        return res.on('end', __bind(function() {
          try {
            return cb(null, JSON.parse(data.join('')));
          } catch (exp) {
            return cb(exp);
          }
        }, this));
      }, this)).on('error', function(err) {
        return cb(err);
      });
    };
    Bitly.prototype._urlCheck = function(str) {
      var v;
      v = new RegExp;
      v.compile("^[A-Za-z]+://[A-Za-z0-9-_]+\\.[A-Za-z0-9-_%&\?\/.=]+$");
      return v.test(str);
    };
    Bitly.prototype.shorten = function(longUrl, cb) {
      var options, query, request_query;
      options = _.extend(this.config, {
        longUrl: longUrl
      });
      query = qs.stringify(options, '&', '=', false);
      request_query = this._niceUrl(query, 'shorten');
      return this._doRequest(request_query, cb);
    };
    /*
        expand: function(items, cb) {
            var shortUrl = [];
            var hash = [];
            while (items.length > 0) {
                var item_to_check = items.pop();
                if (this._urlCheck(item_to_check)) {
                    shortUrl.push(item_to_check);
                } else {
                    hash.push(item_to_check);
                }
            }
            var query = querystring.stringify({
                login: this.config.login,
                apiKey: this.config.api_key,
                format: this.config.format,
                shortUrl: shortUrl,
                hash: hash,
                domain: this.config.domain
            },
            '&', '=', false);
            var request_query = this._generateNiceUrl(query, 'expand');
            this._doRequest(request_query, cb);
        },
        clicks: function(items, cb) {
            var shortUrl = [];
            var hash = [];
            while (items.length > 0) {
                var item_to_check = items.pop();
                if (this._urlCheck(item_to_check)) {
                    shortUrl.push(item_to_check);
                } else {
                    hash.push(item_to_check);
                }
            }
            var query = querystring.stringify({
                login: this.config.login,
                apiKey: this.config.api_key,
                format: this.config.format,
                shortUrl: shortUrl,
                hash: hash,
                domain: this.config.domain
            },
            '&', '=', false);
            var request_query = this._generateNiceUrl(query, 'clicks');
            this._doRequest(request_query, cb);
        },
        lookup: function(links, cb) {
            var query = querystring.stringify({
                login: this.config.login,
                apiKey: this.config.api_key,
                format: this.config.format,
                url: links,
                domain: this.config.domain
            },
            '&', '=', false);
            var request_query = this._generateNiceUrl(query, 'lookup');
            this._doRequest(request_query, cb);
        },
        info: function(items, cb) {
            var shortUrl = [];
            var hash = [];
            while (items.length > 0) {
                var item_to_check = items.pop();
                if (this._urlCheck(item_to_check)) {
                    shortUrl.push(item_to_check);
                } else {
                    hash.push(item_to_check);
                }
            }
            var query = querystring.stringify({
                login: this.config.login,
                apiKey: this.config.api_key,
                format: this.config.format,
                shortUrl: shortUrl,
                hash: hash,
                domain: this.config.domain
            },
            '&', '=', false);
            var request_query = this._generateNiceUrl(query, 'info');
            this._doRequest(request_query, cb);
        },
        bitlyProDomain: function(domain, cb) {
            var query = querystring.stringify({
                login: this.config.login,
                apiKey: this.config.api_key,
                format: this.config.format,
                domain: domain
            },
            '&', '=', false);
            var request_query = this._generateNiceUrl(query, 'bitly_pro_domain');
            this._doRequest(request_query, cb);
        },
        authenticate: function(x_login, x_password, cb) {
            var query = querystring.stringify({
                login: this.config.login,
                apiKey: this.config.api_key,
                format: this.config.format,
                x_login: x_login,
                x_password: x_password
            },
            '&', '=', false);
            var request_query = this._generateNiceUrl(query, 'authenticate');
            this._doRequest(request_query, cb);
        }*/
    return Bitly;
  })();
}).call(this);
