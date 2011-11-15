var url = require('url'),
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
    _generateNiceUrl: function(query, method) {
        var result = url.parse(url.format({
            protocol: 'http',
            hostname: this.config.api_url,
            pathname: '/' + this.config.api_version + '/' + method,
            query: query
        }));

    return result;
    },

    _doRequest: function(request_query, cb) {
        var scope = this;

        // Pass the requested URL as an object to the get request
        http.get(request_query, function(res) {
            var data = [];
            res
            .on('data', function(chunk) {
                data.push(chunk);
            })
            .on('end', function() {
                var urldata = data.join('');
                var result = JSON.parse(urldata);
                return cb(null, result);
            });
        })
        .on('error', function(e) {
            console.log("Got http get error: " + e.message);
            callback(e);
        });
    },

    _urlCheck: function(str) {
        var v = new RegExp();
        v.compile("^[A-Za-z]+://[A-Za-z0-9-_]+\\.[A-Za-z0-9-_%&\?\/.=]+$");
        if (!v.test(str)) return false;
        return true;
    },

    shorten: function(longUrl, cb) {
        var query = {
            login: this.config.login,
            apiKey: this.config.api_key,
            format: this.config.format,
            longUrl: longUrl,
            domain: this.config.domain
        };

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
        var query = {
            login: this.config.login,
            apiKey: this.config.api_key,
            format: this.config.format,
            shortUrl: shortUrl,
            hash: hash,
            domain: this.config.domain
        };

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
        var query = {
            login: this.config.login,
            apiKey: this.config.api_key,
            format: this.config.format,
            shortUrl: shortUrl,
            hash: hash,
            domain: this.config.domain
        };
        var request_query = this._generateNiceUrl(query, 'clicks');
        this._doRequest(request_query, cb);
    },

    lookup: function(links, cb) {
        var query = {
            login: this.config.login,
            apiKey: this.config.api_key,
            format: this.config.format,
            url: links,
            domain: this.config.domain
        };

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
        var query = {
            login: this.config.login,
            apiKey: this.config.api_key,
            format: this.config.format,
            shortUrl: shortUrl,
            hash: hash,
            domain: this.config.domain
        };

        var request_query = this._generateNiceUrl(query, 'info');
        this._doRequest(request_query, cb);
    },

    bitlyProDomain: function(domain, cb) {
        var query = {
            login: this.config.login,
            apiKey: this.config.api_key,
            format: this.config.format,
            domain: domain
        };

        var request_query = this._generateNiceUrl(query, 'bitly_pro_domain');
        this._doRequest(request_query, cb);
    },

    authenticate: function(x_login, x_password, cb) {
        var query = {
            login: this.config.login,
            apiKey: this.config.api_key,
            format: this.config.format,
            x_login: x_login,
            x_password: x_password
        };

        var request_query = this._generateNiceUrl(query, 'authenticate');
        this._doRequest(request_query, cb);
    }
};

module.exports = Bitly;