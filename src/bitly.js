const { doRequest, sortUrlsAndHash } = require('./lib');

/**
 * The main Bitly constructor, takes the users login, api key and additional options
 * @constructor
 * @module node-bitly
 * @param {String} config,OAuth access token
 * @param {Object=} config Optional config object
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
  };
};
