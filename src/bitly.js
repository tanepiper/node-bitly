'use strict';

import * as url from 'url';
import * as https from 'https';
import * as validUrl from 'valid-url';

class Bitly {

  /**
   * The main Bitly constructor, takes the users login, api key and additional options
   * @constructor
   * @param {String} accessToken OAuth access token
   * @param {Object=} config Optional config object
   * @returns {Bitly}
   */
  constructor (accessToken, config) {

    // Set up the config for requests being made with the instance of this
    this.config = Object.assign({ access_token: accessToken }, config, {
      format: 'json',
      api_url: 'api-ssl.bitly.com',
      api_version: 'v3',
      domain: 'bit.ly'
    });
  }


  /**
   * Generates the URL object to be passed to the HTTP request for a specific
   * API method call
   * @param  {Object} query  The query object
   * @param  {String} method The Bit.ly method to call with the request
   * @return {Object} The URL object for this request
   */
  generateNiceUrl (query, method) {
    // Make sure the access_token gets sent with every query
    query['access_token'] = this.config.access_token;

    return url.parse(url.format({
      protocol: 'https',
      hostname: this.config.api_url,
      pathname: '/' + this.config.api_version + '/' + method,
      query: query
    }));
  }

  /**
   * Function to check if a passed string is a valid URL
   * @param  {String} str The URL string to be checked
   * @return {Boolean}
   */
  urlCheck (str) {
    return !!validUrl.isUri(str);
  }

  /**
   * Function to do a HTTP Get request with the current query
   * @param  {Object} request_query The current query object
   * @return {Promise}
   */
  doRequest (request_query) {

    return new Promise((resolve, reject) => {
      // Pass the requested URL as an object to the get request
      https.get(request_query, (res) => {
        var data = [];

        res
          .on('data', (chunk) => { data.push(chunk.toString()); })
          .on('end', () => {
            var urlData = data.join('').trim();
            var result;
            try {
              result = JSON.parse(urlData);
            } catch (exp) {
              result = { 'status_code': 500, 'status_text': 'JSON Parse Failed' };
            }

            if (result.status_code !== 200) {
              var error = new Error(result.status_txt);
              error.code = result.status_code;
              return reject(error);
            }
            return resolve(result);
          });
        })
        .on('error', (error) => { return reject(error); });
    });
  }

  /**
   * Function to check through an array of items to check for short urls or hashes
   * @param  {Array} items The array of items to be checked
   * @param  {Object} query The query object
   * @return {void}
  */
  sortUrlsAndHash (items, query) {
    var shortUrl = [];
    var hash = [];
    items.forEach((item) => {
      this.urlCheck(item) ? shortUrl.push(item) : hash.push(item);
    });

    if (shortUrl.length > 0) {
      query.shortUrl = shortUrl;
    }
    if (hash.length > 0) {
      query.hash = hash;
    }
  }

  /**
   * Request to shorten one long url
   * @param  {String} longUrl The URL to be shortened
   * @param  {String=} domain The domain to use (optional)
   * @return {Promise|void}
   */
  shorten (longUrl, domain) {
    var query = {
      format: this.config.format,
      longUrl: longUrl,
      domain: domain ? domain : this.config.domain
    };

    return this.doRequest(this.generateNiceUrl(query, 'shorten'));
  }

  /**
   * Request to expand a single short url, short hash or mixed array or items
   * @param  {String|Array} items  The string or array of short urls and/or hashes to expand
   * @return {Promise|void}
   */
  expand (items) {
    var query = {
      format: this.config.format,
      domain: this.config.domain
    };

    if (typeof items === 'string') {
      query[this.urlCheck(items) ? 'shortUrl' : 'hash'] = items;
    } else {
      this.sortUrlsAndHash(items, query);
    }

    return this.doRequest(this.generateNiceUrl(query, 'expand'));
  }

  /**
   * Request to get clicks for a single short url, short hash or mixed array or items
   * @param  {String|Array} items  The string or array of short urls and/or hashes to expand
   * @return {Promise|void}
   */
  clicks (items) {
    var query = {
      format: this.config.format,
      domain: this.config.domain
    };

    if (typeof items === 'string') {
      query[this.urlCheck(items) ? 'shortUrl' : 'hash'] = items;
    } else {
      this.sortUrlsAndHash(items, query);
    }

    return this.doRequest(this.generateNiceUrl(query, 'clicks'));
  }

  /**
   * Request to get clicks by minute for a single short url, short hash or mixed array or items
   * @param  {String|Array} items  The string or array of short urls and/or hashes to expand
   * @return {Promise|void}
   */
  clicksByMinute (items) {
    var query = {
      format: this.config.format,
      domain: this.config.domain
    };

    if (typeof items === 'string') {
      query[this.urlCheck(items) ? 'shortUrl' : 'hash'] = items;
    } else {
      this.sortUrlsAndHash(items, query);
    }

    return this.doRequest(this.generateNiceUrl(query, 'clicks_by_minute'));

  }

  /**
   * Request to get clicks by day for a single short url, short hash or mixed array or items
   * @param  {String|Array} items  The string or array of short urls and/or hashes to expand
   * @return {Promise|void}
   */
  clicksByDay (items) {
    var query = {
      format: this.config.format,
      domain: this.config.domain
    };

    if (typeof items === 'string') {
      query[this.urlCheck(items) ? 'shortUrl' : 'hash'] = items;
    } else {
      this.sortUrlsAndHash(items, query);
    }

    return this.doRequest(this.generateNiceUrl(query, 'clicks_by_day'));
  }

  /**
   * Request to get look up an existing bitly link for a long url or array of urls
   * @param  {String|Array} links  The string or array of long urls
   * @return {Promise|void}
   */
  lookup (links) {
    var query = {
      format: this.config.format,
      url: links,
      domain: this.config.domain
    };

    return this.doRequest(this.generateNiceUrl(query, 'lookup'));

  }

  /**
   * Request to get clicks by day for a single short url, short hash or mixed array or items
   * @param  {String|Array} items  The string or array of short urls and/or hashes to expand
   * @return {Promise|void}
   */
  info (items) {
    var query = {
      format: this.config.format,
      domain: this.config.domain
    };

    if (typeof items === 'string') {
      query[this.urlCheck(items) ? 'shortUrl' : 'hash'] = items;
    } else {
      this.sortUrlsAndHash(items, query);
    }

    return this.doRequest(this.generateNiceUrl(query, 'info'));
  }


  /**
   * Request the informations on all referrers for a short url.  This function only
   * accepts one url (as per the limit of the bitly API)
   * @param  {String} link The link be checked
   * @return {Promise|void}
   */
  referrers (link) {
    var query = {
      format: this.config.format,
      domain: this.config.domain
    };

    query[this.urlCheck(link) ? 'shortUrl' : 'hash'] = link;

    return this.doRequest(this.generateNiceUrl(query, 'referrers'));
  }

  /**
   * Request the information on all countries for a short url.  This function only
   * accepts one url (as per the limit of the bitly API)
   * @return {Promise|void}
   */
  countries (link) {
    var query = {
      format: this.config.format,
      domain: this.config.domain
    };

    query[this.urlCheck(link) ? 'shortUrl' : 'hash'] = link;

    return this.doRequest(this.generateNiceUrl(query, 'countries'));
  }

  /**
   * Request to confirm a pro-domain it set up with bitly
   * @param  {String} domain The domain to be checked
   * @return {Promise|void}
   */
  bitlyProDomain (domain) {
    var query = {
      format: this.config.format,
      domain: domain
    };

    return this.doRequest(this.generateNiceUrl(query, 'bitly_pro_domain'));
  }

  /**
   * Request entries from a user's link history in reverse chronological order
   * @return {Promise|void}
   */
  history () {
    var query = {
      // @todo Implement optional parameters:
      //   http://dev.bitly.com/user_info.html#v3_user_link_history
    };

    return this.doRequest(this.generateNiceUrl(query, 'user/link_history'));
  }

  /**
   * Edit an existing link's metadata
   * @param {String|Array} metadata_field Metadata field to edit (title, note, private, user_ts or archived). To edit
   * multiple fields, pass an array of field names as strings, e.g. ['title', 'note']
   * @param {String} link The Bitlink to be edited (requires protocol, i.e "example.com" won't work but
   *   "http://example.com" will)
   * @param {String|Array} new_value The new value for the edited metadata. If you pass an array to metadata_field, you
   * have to pass an array to new_value. The index have to match those in metadata_field, e.g. metadata_field[0] will
   *   be
   * changed to new_value[0] etc.
   * @return {Promise|void}
   */
  linkEdit (metadata_field, link, new_value) {
    var query = {
      link: link
    };

    // We can use an array of fields and matching values to edit multiple metadata fields or strings to edit only a
    // single one
    if (Array.isArray(metadata_field) && Array.isArray(new_value)) {
      query['edit'] = metadata_field.join(',');
      metadata_field.forEach((field, index) => {
        query[field] = new_value[index];
      });
    } else {
      query['edit'] = metadata_field;
      query[metadata_field] = new_value;
    }

    return this.doRequest(this.generateNiceUrl(query, 'user/link_edit'));
  }
}

export default Bitly;
