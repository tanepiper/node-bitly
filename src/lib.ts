import axios, { AxiosRequestConfig } from 'axios';
import { format as formatURL, parse as parseURL, UrlObject, UrlWithStringQuery } from 'url';
import { BitlyConfig, BitlyQueryParams, BitlyReqMethod, BitlyResponse } from './types';

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
  format: 'json',
  debug: false
};

/**
 * Generates a valid URL for a GET request to the Bit.ly API
 * @param method The method to call
 * @param data a data object specifying bit.ly keys for your method
 * @param config A custom config object to overide values
 * @param reqMethod The HTTP request method
 * @returns parsed generated URL
 * @private
 *
 * @example
 * ```js
 * generateUrl({method: 'shorten', accessKey: 'myaccessKey', data: { longUrl: 'https://github.com/tanepiper/node-bitly' } });
 * ```
 */
export function generateUrl(
    method: string,
    data: BitlyQueryParams = {},
    config: BitlyConfig = {},
    reqMethod: BitlyReqMethod = 'POST'
): UrlWithStringQuery {
  let formatUrlOptions: UrlObject = {
    protocol: "https",
    hostname: config.apiUrl || DEFAULT_OPTIONS.apiUrl,
    pathname: `/${config.apiVersion || DEFAULT_OPTIONS.apiVersion}/${method}`
  };
  if (reqMethod === 'GET') {
    formatUrlOptions.query = data;
  }
  return parseURL(
      formatURL(formatUrlOptions)
  );
}

/**
 * Method called to generate a url and call the request
 * @param bearer The request accessToken
 * @param method The method to be called on Bitly
 * @param data A data object with key=>value pairs mapped to request parameters
 * @param config A object that overrides the default values for a request
 * @param reqMethod The HTTP Method to use
 * @returns The request result object
 */
export async function doRequest(bearer: string, method: string, data: BitlyQueryParams, config: BitlyConfig, reqMethod: BitlyReqMethod = 'POST'): Promise<BitlyResponse> {
  const url = formatURL(generateUrl(method, data, config, reqMethod));

  const requestOptions: AxiosRequestConfig = {
    method: reqMethod,
    url,
    headers: {
      Authorization: bearer
    },
    responseType: 'json'
  };

  if (reqMethod !== 'GET') {
    const body = Object.assign({
      domain: config.domain || DEFAULT_OPTIONS.domain,
      long_url: data.long_url
    });

    Object.keys(data || []).forEach((key: any) => (body[key] = data[key]));
    requestOptions.data = body;
    requestOptions.headers['Content-Type'] = 'application/json';
  }

  try {
    const req = await axios(requestOptions);
    if (config.debug) {
      console.log(req);
    }
    return req.data;
  } catch (error) {
    if (config.debug) {
      console.log(error);
    }
    throw error;
  }
}

/**
 * Function to check through an array of items to check for short urls or hashes
 * If only passed one item, put in array for url checking
 * @param  unsortedItems The array of items to be checked
 * @param  result The query object
 * @return Sorted shortUrls and hashes
 */
export function sortUrlsAndHash(
    unsortedItems: string | string[],
    result: BitlyQueryParams = { shortUrl: [], hash: [] }
): BitlyQueryParams {
  result.shortUrl = result.shortUrl || [];
  result.hash = result.hash || [];
  (Array.isArray(unsortedItems) ? unsortedItems : [unsortedItems]).map(item =>
      isUri(item)
          ? result.shortUrl.push(item)
          : typeof item === 'string' && result.hash.push(item)
  );
  return result;
}

/**
 * Function to force a string that *could* be an old-style hash to the new ID style
 * This is allow backward-compatibility with IDs produced by V3, and perhaps stored in users' DBs
 * @param hashIdOrLink An old style hash, or v4 bitly id (bitlink), or full bitly link
 * @returns Bitlink (domain + hash) formatted ID
 * @private
 */
export function forceToBitlinkId(hashIdOrLink: string) {
  // Old-style hash
  if (/^[A-z0-9]{6,}$/.test(hashIdOrLink)) {
    return `bit.ly/${hashIdOrLink}`;
  }
  // Bit.ly ID, or http/s prefixed bitly
  if (BitlyHashPattern.test(hashIdOrLink)) {
    const hash = BitlyHashPattern.exec(hashIdOrLink)[1];
    return `bit.ly/${hash}`;
  }
  // For everything else, or maybe custom bitlinks
  return hashIdOrLink;
}

export const BitlyIdPattern = /.*bit.ly\/([A-z0-9_-]{6,})$/i;
export const BitlyHashPattern = /\/([A-z0-9_-]{6,})$/;

/**
 * Throw a deprecated error
 * @param methodName Bitly method name
 * @param replacementMethod Method that might be a suitable replacement
 * @param helpUrl URL with more info
 * @private
 */
export function throwDeprecatedErr(methodName: string, replacementMethod?: string, helpUrl?: string) {
  let errMsg = `DEPRECATED: "${methodName}" is no longer supported by the Bitly API.`;
  if (replacementMethod) {
    errMsg += `\nPlease evaluate ${replacementMethod} as a replacement.`
  }
  if (helpUrl) {
    errMsg += `\nFor more info, see ${helpUrl}`;
  }
  throw new Error(errMsg);
}