import { format as formatURL, parse as parseURL, UrlWithStringQuery } from 'url';
import request from 'request-promise';
import { BitlyConfig, BitlyResponse, BitlyUrlQueryParams } from './types';

const isUri = require('valid-url').isUri;

/**
 * The internal library of node-bitly
 * @module node-bitly.lib
 * @private
 */

const DEFAULT_OPTIONS: BitlyConfig = {
  apiUrl: 'api-ssl.bitly.com',
  apiVersion: 'v4',
  domain: 'bit.ly',
  format: 'json'
};

/**
 * Generates a valid URL for a GET request to the Bit.ly API
 * @param {object} UrlParameters An object of paramters to pass to generate a bit.ly url
 * @param {string} accessToken Your bit.ly access token
 * @param {string} method The method to call
 * @param {object} data a data object specifying bit.ly keys for your method
 * @param {object} config A custom config object to overide values
 * @private
 *
 * @example
 * ```js
 * generateUrl({method: 'shorten', accessKey: 'myaccessKey', data: { longUrl: 'https://github.com/tanepiper/node-bitly' } });
 * ```
 */
export function generateUrl(
    method: string,
    data: BitlyUrlQueryParams = {},
    config: BitlyConfig = {}
): UrlWithStringQuery {
  return parseURL(
      formatURL({
        protocol: 'https',
        hostname: config.apiUrl || DEFAULT_OPTIONS.apiUrl,
        pathname: `/${config.apiVersion || DEFAULT_OPTIONS.apiVersion}/${method}`,
      })
  );
}

/**
 * Method called to generate a url and call the request
 * @param {string} bearer The request accessToken
 * @param {string} method The method to be called on Bitly
 * @param {object} data A data object with key=>value pairs mapped to request parameters
 * @param {config} config A object that overrides the default values for a request
 * @returns {object} The request result object
 */
export async function doRequest(bearer: string, method: string, data: BitlyUrlQueryParams, config: BitlyConfig): Promise<BitlyResponse> {
  const uri = generateUrl(method, data, config);

  const body = Object.assign({
    domain: config.domain || DEFAULT_OPTIONS.domain,
    // format: config.format || DEFAULT_OPTIONS.format,
    long_url: data.long_url
  });
  //console.log(body, uri)

  Object.keys(data || []).forEach((key: any) => (body[key] = data[key]));
  try {
    const req = await request({
      method: 'post',
      uri,
      auth: {
        bearer
      },
      json: body,
    });
    console.log(req);
    return req;
  } catch (error) {
    //console.log(error);
    throw error;
  }
}

/**
 * Function to check through an array of items to check for short urls or hashes
 * If only passed one item, put in array for url checking
 * @param  {Array<string>} unsortedItems The array of items to be checked
 * @param  {object} result The query object
 * @return {object}
 */
export function sortUrlsAndHash(
    unsortedItems: string | string[],
    result: BitlyUrlQueryParams = { shortUrl: [], hash: [] }
): BitlyUrlQueryParams {
  result.shortUrl = result.shortUrl || [];
  result.hash = result.hash || [];
  (Array.isArray(unsortedItems) ? unsortedItems : [unsortedItems]).map(item =>
      isUri(item)
          ? result.shortUrl.push(item)
          : typeof item === 'string' && result.hash.push(item)
  );
  return result;
}
