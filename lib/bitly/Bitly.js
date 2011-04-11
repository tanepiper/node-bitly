var url = require('url'),
    querystring = require('querystring'),
    http = require('http');

var Bitly = function(login, api_key, options) {
    options = options || {
        format: 'json',
        api_url: 'api.bit.ly',
        api_version: 'v3',
        domain: 'bit.ly'
    };
    this.config = {
        login: login,
        api_key: api_key,
        format: options.format,
        api_url: options.api_url,
        api_version: options.api_version,
        domain: options.domain
    };
};

Bitly.prototype = {

    _parseChunks: function(chunks) {
        return chunks.join('');
    },
    _generateNiceUrl: function(query, method) {
        var pathname = this.config.api_version + '/' + method;
        return url.parse('http://'+  this.config.api_url + '/'+ pathname+'?'+ query);
    },
    _doRequest: function(request_query, cb) {
        var scope = this;
        var options = {
            host: request_query.hostname,
            port: 80,
            path: request_query.pathname + request_query.search,
            method: 'GET'
        };
        var request = http.request(options, function(response) {
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
        request.end();
    },
    _urlCheck: function(str) {
        var v = new RegExp();
        v.compile("^[A-Za-z]+://[A-Za-z0-9-_]+\\.[A-Za-z0-9-_%&\?\/.=]+$");
        if (!v.test(str)) return false;
        return true;
    },
    shorten: function(longUrl, cb) {
        var query = querystring.stringify({
            login: this.config.login,
            apiKey: this.config.api_key,
            format: this.config.format,
            longUrl: longUrl,
            domain: this.config.domain
        },
        '&', '=', false);
        var request_query = this._generateNiceUrl(query, 'shorten');
        this._doRequest(request_query, cb);
    },
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
    }
};

exports.Bitly = Bitly;