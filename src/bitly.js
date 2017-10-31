const { doRequest, sortUrlsAndHash, generateUrl } = require('./lib');

/**
 * This is the main Bitly module that returns an object of methods.  You need to pass in your
 * OAuth access token, as well as an optional config object. You are returned several helper
 * methods, as well as access to a method to pass any bitly api request to
 * @module node-bitly
 * @param {string} accessToken The access token, this from an OAuth session
 * @param {object=} config Optional config object
 * @returns {Bitly}
 */
module.exports = (accessToken, config) => {
  /**
    * Request to get clicks by day for a single short url, short hash or mixed array or items
    * @param  {String|Array} items  The string or array of short urls and/or hashes to expand
    * @return {Promise}
    */
  const info = async items =>
    await doRequest({
      accessToken,
      method: 'info',
      config,
      data: sortUrlsAndHash(items),
    });
  /**
   * Request to shorten one long url
   * @param  {String} longUrl The URL to be shortened
   * @param  {String=} domain The domain to use (optional)
   * @return {Promise}
   */
  const shorten = async longUrl =>
    await doRequest({ accessToken, method: 'shorten', config, data: { longUrl } });

  /**
   * Request to expand a single short url, short hash or mixed array or items
   * @param  {String|Array} items  The string or array of short urls and/or hashes to expand
   * @return {Promise}
   */
  const expand = async items =>
    await doRequest({ accessToken, method: 'expand', config, data: sortUrlsAndHash(items) });

  /**
       * Request to get clicks for a single short url, short hash or mixed array or items
       * @param  {String|Array} items  The string or array of short urls and/or hashes to expand
       * @return {Promise}
       */
  const clicks = async items =>
    await doRequest({ accessToken, method: 'clicks', config, data: sortUrlsAndHash(items) });

  /**
    * Request to get clicks by minute for a single short url, short hash or mixed array or items
    * @param  {String|Array} items  The string or array of short urls and/or hashes to expand
    * @return {Promise}
    */
  const clicksByMinute = async items =>
    await doRequest({
      accessToken,
      method: 'clicks_by_minute',
      config,
      data: sortUrlsAndHash(items),
    });

  /**
    * Request to get clicks by day for a single short url, short hash or mixed array or items
    * @param  {String|Array} items  The string or array of short urls and/or hashes to expand
    * @return {Promise}
    */
  const clicksByDay = async items =>
    await doRequest({
      accessToken,
      method: 'clicks_by_day',
      config,
      data: sortUrlsAndHash(items),
    });

  /**
    * Request to get look up an existing bitly link for a long url or array of urls
    * @param  {String|Array} links  The string or array of long urls
    * @return {Promise}
    */
  const lookup = async items =>
    await doRequest({
      accessToken,
      method: 'lookup',
      config,
      data: { url: items },
    });

  /**
    * Request the informations on all referrers for a short url.  This function only
    * accepts one url (as per the limit of the bitly API)
    * @param  {String} link The link be checked
    * @return {Promise}
    */
  const referrers = async item =>
    await doRequest({
      accessToken,
      method: 'referrers',
      config,
      data: sortUrlsAndHash([item]),
    });

  /**
    * Request the informations on all countries for a short url.  This function only
    * accepts one url (as per the limit of the bitly API)
    * @param  {String} link The link be checked
    * @return {Promise}
    */
  const countries = async item =>
    await doRequest({
      accessToken,
      method: 'countries',
      config,
      data: sortUrlsAndHash([item]),
    });

  return {
    shorten,
    expand,
    clicks,
    clicksByMinute,
    clicksByDay,
    lookup,
    info,
    referrers,
    countries,
    doRequest,
    sortUrlsAndHash,
    generateUrl,
  };
};

/**
 * Bitly object definition
 * @typedef {object} Bitly
 * @property {Function} shorten Function that takes a url and shortens it. Accepts valid URL.
 * @property {Function} expends Function that gets long urls for short urls. Accepts string or array of strings.
 * @property {Function} clicks Function that gets the number of clicks of short urls. Accepts string or array of strings.
 * @property {Function} clicksByMinute Function that gets the number of clicks by minute for short urls. Accepts string or array of strings.
 * @property {Function} clicksByDay Function that gets the number of clicks by day for short urls. Accepts string or array of strings.
 * @property {Function} lookup Function that takes a url looks up data. Accepts valid URL.
 * @property {Function} info Function that takes a url and gets info. Accepts valid URL.
 * @property {Function} referrers Function that gets referrers for urls. Accepts valid URL.
 * @property {Function} countries Function that gets click by countries for urls. Accepts valid URL.
 */
