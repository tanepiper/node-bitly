import { doRequest, sortUrlsAndHash } from './lib';
import { BitlyConfig, BitlyResponse, BitlyError, BitlyUrlQueryParams, BitlyResponseData } from './bitly.types';

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
export class BitlyClient {
  constructor(private accessToken: string, private config: BitlyConfig = {}) {}
  /**
   * This is used to return the page title for a given Bitlink.
   * @param  {array<string>} items An array of short urls or hashes
   * @return {object} The results of the request
   */
  async info(items: string | string[]): Promise<BitlyResponseData> {
    return await this.bitlyRequest('info', sortUrlsAndHash(items));
  }

  /**
   * Used to shorted a url
   * @param  {string} longUrl The URL to be shortened
   * @return {object} The results of the request
   */
  async shorten(longUrl: string): Promise<BitlyResponseData> {
    return await this.bitlyRequest('shorten', { longUrl });
  }

  /**
   * Request to expand urls and hashes
   * @param  {string|array<string>} items A string or array of strings of short urls and hashes.
   * @return {object} The results of the request
   */
  async expand(items: string | string[]): Promise<BitlyResponseData> {
    return await this.bitlyRequest('expand', sortUrlsAndHash(items));
  }

  /**
   * Request to get clicks for urls and hashes
   * @param  {string|array<string>} items A string or array of strings of short urls and hashes.
   * @return {object}
   */
  async clicks(items: string | string[]): Promise<BitlyResponseData> {
    return await this.bitlyRequest('clicks', sortUrlsAndHash(items));
  }

  /**
   * Request to get clicks by minute for urls and hashes
   * @param  {string|array<string>} items A string or array of strings of short urls and hashes.
   * @return {object}
   */
  async clicksByMinute(items: string | string[]): Promise<BitlyResponseData> {
    return await this.bitlyRequest('clicks_by_minute', sortUrlsAndHash(items));
  }

  /**
   * Request to get clicks by day for urls and hashes
   * @param  {string|array<string>} items A string or array of strings of short urls and hashes.
   * @return {object}
   */
  async clicksByDay(items: string | string[]): Promise<BitlyResponseData> {
    return await this.bitlyRequest('clicks_by_day', sortUrlsAndHash(items));
  }

  /**
   * Lookup a single url
   * @param  {string} url The url to look up
   * @return {object}
   */
  async lookup(url: string): Promise<BitlyResponseData> {
    return await this.bitlyRequest('lookup', { url });
  }

  /**
   * Request referrers for a single url
   * @param  {string} uri The uri to look up
   * @return {object}
   */
  async referrers(item: string): Promise<BitlyResponseData> {
    return await this.bitlyRequest('referrers', sortUrlsAndHash([item]));
  }

  /**
   * Request countries for a single url
   * @param  {string} uri The uri to look up
   * @return {object}
   */
  async countries(item: string): Promise<BitlyResponseData> {
    return await this.bitlyRequest('countries', sortUrlsAndHash([item]));
  }

  /**
   * Perform any bitly API request using a method name and passed data object
   * @param {string} method The method name to be called on the API
   * @param {object} data The data object to be passed. Keys should be query paramaters
   * @return {object} The bitly request return data
   */
  async bitlyRequest(method: string, data: BitlyUrlQueryParams | object): Promise<BitlyResponseData> {
    try {
      const result: BitlyResponse = await doRequest(this.accessToken, method, data, this.config);

      if (result.status_code >= 200 && result.status_code < 400) {
        return result.data;
      }

      const err: BitlyError = <BitlyError>(
        new Error(`[node-bitly] Request returned ${result.status_code}: ${result.status_txt}`)
      );
      err.statusCode = result.status_code;
      err.data = result.data;
      throw err;
    } catch (e) {
      throw e;
    }
  }
}

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
 * @property {Function} bitlyRequest Function that allows you to to any bitly request
 */
