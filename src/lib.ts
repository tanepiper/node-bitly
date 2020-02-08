import { format as formatURL, parse as parseURL, UrlWithStringQuery, UrlObject } from 'url';
import request from 'request-promise';
import { BitlyConfig, BitlyResponse, BitlyQueryParams, BitlyReqMethod, RequestPromiseInput } from './types';

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
 * @param {string} bearer The request accessToken
 * @param {string} method The method to be called on Bitly
 * @param {object} data A data object with key=>value pairs mapped to request parameters
 * @param {config} config A object that overrides the default values for a request
 * @returns {object} The request result object
 */
export async function doRequest(bearer: string, method: string, data: BitlyQueryParams, config: BitlyConfig, reqMethod: BitlyReqMethod = 'POST'): Promise<BitlyResponse> {
  const uri = generateUrl(method, data, config, reqMethod);

  const requestOptions: RequestPromiseInput = {
    method: reqMethod,
    uri,
    auth: {
      bearer
    },
    json: true
  };

  if (reqMethod !== 'GET') {
    const body = Object.assign({
      domain: config.domain || DEFAULT_OPTIONS.domain,
      // format: config.format || DEFAULT_OPTIONS.format,
      long_url: data.long_url
    });

    Object.keys(data || []).forEach((key: any) => (body[key] = data[key]));
    requestOptions.body = body;
  }

  try {
    const req = await request(requestOptions);
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
 * @param {string} hashIdOrLink An old style hash, or v4 bitly id (bitlink), or full bitly link
 * @returns {string} Bitlink (domain + hash) formatted ID
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