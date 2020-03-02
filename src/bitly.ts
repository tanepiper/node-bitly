import { AxiosError } from 'axios';
import { doRequest, forceToBitlinkId, throwDeprecatedErr } from './lib';
import {
  BitlyConfig,
  BitlyExpandResponse,
  BitlyQueryParams,
  BitlyReqMethod,
  BitlyLink,
  BitlyMetricsByCountryRes,
  BitlyErrorResponse,
  BitlyMetricsByReferrers,
  BitlyClickMetricsRes,
  BitlyTimeUnit,
  BitlySuccess
} from './types';

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
 * @param accessToken The access token, this from an OAuth session
 * @param config Optional config object
 * @returns A given Bitly response
 * @example
 * ```js
 *  const BitlyClient = require('bitly').BitlyClient;
 *  const bitly = new BitlyClient('<accessToken>');
 *  const myFunc = async(uri = 'https://github.com/tanepiper/node-bitly') => {
 *    try {
 *      return await bitly.shorten(uri);
 *   } catch(e) {
 *      throw e;
 *    }
 *  }
 * ```
 */
export class BitlyClient {
  constructor(private accessToken: string, private config: BitlyConfig = {}) {
  }

  /**
   * This is used to get the summary of info about a given bitlink
   * Ref: https://dev.bitly.com/v4/#operation/getBitlink
   * @param  item ID, short Url, or hash
   * @return Summarized info about a given bitlink
   */
  async getBitlink(item: string): Promise<BitlyLink> {
    return await this.bitlyRequest(`bitlinks/${forceToBitlinkId(item)}`, {}, 'GET');
  }

  /**
   * This is used to get the summary of info about a given bitlink
   * Legacy wrapper around getBitlink
   * @param item ID, short Url, or hash
   * @return Summarized info about a given bitlink
   */
  async info(item: string): Promise<BitlyLink> {
    return await this.getBitlink(item);
  }

  /**
   * Used to shorten a url
   * @param  longUrl The URL to be shortened
   * @return Shorten results
   */
  async shorten(longUrl: string): Promise<BitlyLink> {
    return await this.bitlyRequest('bitlinks', { long_url: longUrl });
  }

  /**
   * Request to expand urls and hashes
   * @param item ID, short Url, or hash
   * @return The results of the request
   */
  async expand(item: string): Promise<BitlyExpandResponse> {
    return await this.bitlyRequest('expand', { bitlink_id: forceToBitlinkId(item) });
  }

  /**
   * Request to get clicks for urls and hashes
   * Defaults are per docs, and are the same result as if you call endpoint with no args
   * @param item ID, short Url, or hash
   * @param unit The unit of time for which to pull click stats
   * @param units The time units to pull data for
   * @param size How many results to limit the response to
   * @param unit_reference Optional - ISO-8601 timestamp, indicating the most recent time to pull stats for
   * @return The results of the request
   */
  async clicks(item: string, unit: BitlyTimeUnit = 'day', units: number = -1, size: number = 50, unit_reference?: string): Promise<BitlyClickMetricsRes> {
    return await this.bitlyRequest(`bitlinks/${forceToBitlinkId(item)}/clicks`, {
      unit,
      units,
      size,
      unit_reference
    }, 'GET');
  }

  /**
   * Request to get clicks by minute for urls and hashes
   * @param item ID, short Url, or hash
   * @return Clicks by minute stats
   */
  async clicksByMinute(item: string): Promise<BitlyClickMetricsRes | BitlyErrorResponse> {
    return await this.clicks(item, 'minute');
  }

  /**
   * Request to get clicks by day for urls and hashes
   * @param item ID, short Url, or hash
   * @return clicks by day stats
   */
  async clicksByDay(item: string): Promise<BitlyClickMetricsRes | BitlyErrorResponse> {
    return await this.clicks(item, 'day');
  }

  /**
   * Lookup a single url
   * DEPRECATED
   * @param url The url to look up
   * @return Deprecated Error
   */
  async lookup(url: string): Promise<void> {
    return throwDeprecatedErr('lookup', 'getBitlink');
  }

  /**
   * Request referrers for a single url
   * @param item ID, short Url, or hash
   * @return Metrics by referrers
   */
  async referrers(item: string): Promise<BitlyMetricsByReferrers> {
    return await this.bitlyRequest(`bitlinks/${forceToBitlinkId(item)}/referrers`, {}, 'GET');
  }

  /**
   * Request countries for a single url
   * @param item ID, short Url, or hash
   * @returns Stats by countries
   */
  async countries(item: string): Promise<BitlyMetricsByCountryRes> {
    return await this.bitlyRequest(`bitlinks/${forceToBitlinkId(item)}/countries`, {}, 'GET');
  }

  /**
   * Perform any bitly API request using a method name and passed data object
   * @param method The method name to be called on the API. Not to be confused with reques method (aka HTTP verb)
   * @param data The data object to be passed. Keys should be query or body parameters.
   * @param reqMethod The HTTP request method to be used (aka *HTTP Verb*)
   * @typeparam ResponseType - The expected response type
   * @return The bitly request return data
   */
  async bitlyRequest<ResponseType extends BitlySuccess>(method: string, data: BitlyQueryParams | {[index:string]: any}, reqMethod: BitlyReqMethod = 'POST'): Promise<ResponseType> {
    try {
      return await doRequest(
          this.accessToken,
          method,
          data,
          this.config,
          reqMethod
      ) as ResponseType;
    } catch (e) {
      const err: AxiosError = e;
      if (err.response) {
        throw err.response.data as unknown as BitlyErrorResponse;
      }
      throw err;
    }
  }
}

/**
 * Bitly object definition
 * @typedef {object} Bitly
 * @property {Function} getBitlink Function that is used to get the summary of info about a given bitlink.
 * @property {Function} shorten Function that takes a url and shortens it. Accepts valid URL.
 * @property {Function} expand Function that gets long urls for short urls. Accepts valid Bitlink.
 * @property {Function} clicks Function that gets the number of clicks of short urls. Accepts valid Bitlink.
 * @property {Function} clicksByMinute Function that gets the number of clicks by minute for short urls. Accepts valid Bitlink.
 * @property {Function} clicksByDay Function that gets the number of clicks by day for short urls. Accepts valid Bitlink.
 * @property {Function} lookup !!! - DEPRECATED --- !!! Function that takes a url looks up data. Accepts valid URL.
 * @property {Function} info Function that takes a url and gets info. Accepts valid Bitlink.
 * @property {Function} referrers Function that gets referrers for urls. Accepts valid Bitlink.
 * @property {Function} countries Function that gets click by countries for urls. Accepts valid Bitlink.
 * @property {Function} bitlyRequest Function that allows you to to any bitly request
 */
