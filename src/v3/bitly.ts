import { doRequest, sortUrlsAndHash, generateUrl } from '../lib';
import { BitlyConfig, BitlyResponse, BitlyError, BitlyUrlQueryParams, BitlyResponseData } from '../index.d';

/**
 *
 * This is the main Bitly module that returns an object of methods.  You need to pass in your
 * OAuth access token, as well as an optional config object. You are returned several helper
 * methods, as well as access to a method to pass any bitly api request to.
 *
 * For information on the data returned from the API, see the docs at
 * https://dev.bitly.com/api.html
 *
 */
export class BitlyClientV3 {
  constructor(private accessToken: string, private config: Partial<BitlyConfig> = { apiVersion: 'v3' }) {}
  /**
   * This is used to return the page title for a given Bitlink.
   */
  async info(items: string | string[]): Promise<BitlyResponseData> {
    return await this.bitlyRequest('info', sortUrlsAndHash(items));
  }

  /**
   * Used to shorted a url
   */
  async shorten(longUrl: string): Promise<BitlyResponseData> {
    return await this.bitlyRequest('shorten', { longUrl });
  }

  /**
   * Request to expand urls and hashes
   */
  async expand(items: string | string[]): Promise<BitlyResponseData> {
    return await this.bitlyRequest('expand', sortUrlsAndHash(items));
  }

  /**
   * Request to get clicks for urls and hashes
   */
  async clicks(items: string | string[]): Promise<BitlyResponseData> {
    return await this.bitlyRequest('clicks', sortUrlsAndHash(items));
  }

  /**
   * Request to get clicks by minute for urls and hashes
   */
  async clicksByMinute(items: string | string[]): Promise<BitlyResponseData> {
    return await this.bitlyRequest('clicks_by_minute', sortUrlsAndHash(items));
  }

  /**
   * Request to get clicks by day for urls and hashes
   */
  async clicksByDay(items: string | string[]): Promise<BitlyResponseData> {
    return await this.bitlyRequest('clicks_by_day', sortUrlsAndHash(items));
  }

  /**
   * Lookup a single url
   */
  async lookup(url: string): Promise<BitlyResponseData> {
    return await this.bitlyRequest('lookup', { url });
  }

  /**
   * Request referrers for a single url
   */
  async referrers(item: string): Promise<BitlyResponseData> {
    return await this.bitlyRequest('referrers', sortUrlsAndHash([item]));
  }

  /**
   * Request countries for a single url
   */
  async countries(item: string): Promise<BitlyResponseData> {
    return await this.bitlyRequest('countries', sortUrlsAndHash([item]));
  }

  /**
   * Perform any bitly API request using a method name and passed data object
   */
  async bitlyRequest(method: string, data: Partial<BitlyUrlQueryParams>): Promise<BitlyResponseData> {
    try {
      const result: BitlyResponse = await doRequest(this.accessToken, method, data, this.config);

      if (result.status_code >= 200 && result.status_code < 400) {
        return result.data;
      }

      const err: BitlyError = <BitlyError>new Error(`[node-bitly] Request returned ${result.status_code}: ${result.status_txt}`);
      err.statusCode = result.status_code;
      err.data = result.data;
      throw err;
    } catch (e) {
      throw e;
    }
  }
}
