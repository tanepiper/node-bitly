const url = require('url');
const request = require('request-promise');
const isUri = require('valid-url').isUri;

/**
 * The internal library of node-bitly
 * @module node-bitly.lib
 * @private
 */

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
 * generateUrl({method: 'shorten', accessKey: 'myaccessKey', data: { longUrl: 'https://github.com/tanepiper/node-bitly' } });
 */
const generateUrl = (
  accessToken,
  method,
  data,
  { apiUrl = 'api-ssl.bitly.com', apiVersion = 'v3', domain = 'bit.ly', format = 'json' } = {},
) => {
  const newQuery = Object.assign({
    access_token: accessToken,
    domain,
    format,
  });

  Object.keys(data || []).forEach(key => (newQuery[key] = data[key]));

  return url.parse(
    url.format({
      protocol: 'https',
      hostname: apiUrl,
      pathname: `/${apiVersion}/${method}`,
      query: newQuery,
    }),
  );
};

/**
 * Method called to generate a url and call the request
 * @param {object} options The options object
 * @param {string} options.accessToken The request accessToken
 * @param {string} options.method The method to be called on Bitly
 * @param {object} options.data A data object with key=>value pairs mapped to request parameters
 * @param {config} options.config A object that overrides the default values for a request
 * @returns {object} The request result object
 */
const doRequest = async ({ accessToken, method, data, config }) => {
  const uri = generateUrl(accessToken, method, data, config);
  try {
    const req = await request({ uri });
    return JSON.parse(req);
  } catch (error) {
    throw error;
  }
};

/**
* Function to check through an array of items to check for short urls or hashes
* If only passed one item, put in array for url checking
* @param  {Array<string>} unsortedItems The array of items to be checked
* @param  {object} query The query object
* @return {object}
*/
const sortUrlsAndHash = (unsortedItems, result = { shortUrl: [], hash: [] }) => {
  (Array.isArray(unsortedItems) ? unsortedItems : [unsortedItems]).map(
    item =>
      isUri(item) ? result.shortUrl.push(item) : typeof item === 'string' && result.hash.push(item),
  );
  return result;
};

module.exports = {
  generateUrl,
  doRequest,
  sortUrlsAndHash,
};
