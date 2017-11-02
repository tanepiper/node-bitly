const { doRequest, sortUrlsAndHash, generateUrl } = require('./lib');

/**
 *
 * This is the main Bitly module that returns an object of methods.  You need to pass in your
 * OAuth access token, as well as an optional config object. You are returned several helper
 * methods, as well as access to a method to pass any bitly api request to.
 *
 * For information on the data returned from the API, see the docs at
 * https://dev.bitly.com/api.html
 *
 * @module node-bitly
 * @type {function}
 * @param {string} accessToken The access token, this from an OAuth session
 * @param {object=} config Optional config object
 * @returns {Bitly}
 * @example
 *  const BitlyClient = require('bitly');
 *  const bitly = BitleyClient('<accessToken>');
 *  const myFunc = async(uri = 'https://github.com/tanepiper/node-bitly') => {
 *    try {
 *      return await bitly.shorten(uri);
 *   } catch(e) {
 *      throw e;
 *    }
 *  }
 */
module.exports = (accessToken, config) => {
  /**
    * This is used to return the page title for a given Bitlink.
    * @param  {array<string>} items An array of short urls or hashes
    * @return {object} The results of the request
    */
  const info = async (items = []) => {
    try {
      return await doRequest({
        accessToken,
        method: 'info',
        config,
        data: sortUrlsAndHash(items),
      });
    } catch (error) {
      throw error;
    }
  };

  /**
     * Used to shorted a url
     * @param  {string} longUrl The URL to be shortened
     * @return {object} The results of the request
     */
  const shorten = async longUrl => {
    try {
      return await doRequest({ accessToken, method: 'shorten', config, data: { longUrl } });
    } catch (error) {
      throw error;
    }
  };

  /**
     * Request to expand urls and hashes
     * @param  {string|array<string>} items A string or array of strings of short urls and hashes.
     * @return {object} The results of the request
     */
  const expand = async items => {
    try {
      return await doRequest({
        accessToken,
        method: 'expand',
        config,
        data: sortUrlsAndHash(items),
      });
    } catch (error) {
      throw error;
    }
  };

  /**
       * Request to get clicks for urls and hashes
       * @param  {string|array<string>} items A string or array of strings of short urls and hashes.
       * @return {object}
       */
  const clicks = async items => {
    try {
      return await doRequest({
        accessToken,
        method: 'clicks',
        config,
        data: sortUrlsAndHash(items),
      });
    } catch (error) {
      throw error;
    }
  };

  /**
    * Request to get clicks by minute for urls and hashes
    * @param  {string|array<string>} items A string or array of strings of short urls and hashes.
    * @return {object}
    */
  const clicksByMinute = async items => {
    try {
      return await doRequest({
        accessToken,
        method: 'clicks_by_minute',
        config,
        data: sortUrlsAndHash(items),
      });
    } catch (error) {
      throw error;
    }
  };

  /**
    * Request to get clicks by day for urls and hashes
    * @param  {string|array<string>} items A string or array of strings of short urls and hashes.
    * @return {object}
    */
  const clicksByDay = async items => {
    try {
      return await doRequest({
        accessToken,
        method: 'clicks_by_day',
        config,
        data: sortUrlsAndHash(items),
      });
    } catch (error) {
      throw error;
    }
  };

  /**
    * Lookup a single url
    * @param  {string} url The url to look up
    * @return {object}
    */
  const lookup = async url => {
    try {
      return await doRequest({
        accessToken,
        method: 'lookup',
        config,
        data: { url },
      });
    } catch (error) {
      throw error;
    }
  };

  /**
    * Request referrers for a single url
    * @param  {string} uri The uri to look up
    * @return {object}
    */
  const referrers = async item => {
    try {
      return await doRequest({
        accessToken,
        method: 'referrers',
        config,
        data: sortUrlsAndHash([item]),
      });
    } catch (error) {
      throw error;
    }
  };

  /**
    * Request countries for a single url
    * @param  {string} uri The uri to look up
    * @return {object}
    */
  const countries = async item => {
    try {
      return await doRequest({
        accessToken,
        method: 'countries',
        config,
        data: sortUrlsAndHash([item]),
      });
    } catch (error) {
      throw error;
    }
  };

  /**
   * Perform any bitly API request using a method name and passed data object
   * @param {string} method The method name to be called on the API
   * @param {object} data The data object to be passed. Keys should be query paramaters
   * @return {object} The bitly request return data
   */
  const bitlyRequest = async (method, data) => {
    try {
      return await doRequest({
        accessToken,
        method,
        config,
        data,
      });
    } catch (error) {
      throw error;
    }
  };

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
    bitlyRequest,
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
