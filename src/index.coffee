_       = require 'underscore'
qs      = require 'querystring'
url     = require 'url'
http    = require 'http'
https   = require 'https'

class exports.Bitly
    constructor: (options, secure) ->
        if not options.login
            throw new Error 'Bit.ly Login Required'
        if not options.api_key
            throw new Error 'Bit.ly API Key Required'
            
        @config = _.defaults options, {
            format      : 'json'
            api_url     : 'api.bit.ly'
            api_version : 'v3'
            domain      : 'bit.ly'
        }
        
        @requester = if secure then http else https
        
    _parseChunks: (chunks) ->
        chunks.join ''
    
    _niceUrl: (query, method) ->
        url.parse "http://#{@config.api_url}/#{@config.api_version}/#{method}?#{query}"
        
    _doRequest: (host, path, cb) ->
        @requester.get {host, path}, (res) =>
            data = []
            res.on 'data', (chunk) ->
                data.push chunk
            res.on 'end', =>
                try
                    cb null, JSON.parse data.join ''
                catch exp
                    cb exp
        .on 'error', (err) ->
            cb err
    
    _urlCheck: (str) ->
        v = new RegExp
        v.compile("^[A-Za-z]+://[A-Za-z0-9-_]+\\.[A-Za-z0-9-_%&\?\/.=]+$");
        v.test(str)
        
    shorten: (longUrl, cb) ->
        options = _.extend @config, {longUrl}
        
        query = qs.stringify options ,'&', '=', false
        request_query = @_niceUrl query, 'shorten'
        @_doRequest request_query, cb
        
        
    ###
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