const url = require('url');
const request = require('request-promise');
const isUri = require('valid-url').isUri;

/**
 *
 * @param {object} UrlParameters An object of paramters to pass to generate a bit.ly url
 * @param {string} accessToken Your bit.ly access token
 * @param {string} method The method to call
 * @param {object} A data object specifying bit.ly keys for your method
 *
 * @example
 * generateUrl({method: 'shorten', accessKey: 'myaccessKey', data: { longUrl: 'https://github.com/tanepiper/node-bitly' } });
 */
const generateUrl = (
  accessToken,
  method,
  data = {},
  { apiUrl = 'api-ssl.bitly.com', apiVersion = 'v3', domain = 'bit.ly', format = 'json' } = {},
) => {
  const newQuery = Object.assign({
    access_token: accessToken,
    domain,
    format,
  });

  Object.keys(data || []).forEach(key => (newQuery[key] = data[key]));
  //console.log(newQuery);

  return url.parse(
    url.format({
      protocol: 'https',
      hostname: apiUrl,
      pathname: `/${apiVersion}/${method}`,
      query: newQuery,
    }),
  );
};

const doRequest = async ({ accessToken, config, method, data }) => {
  const uri = generateUrl(accessToken, method, data, config);
  //console.log(uri);
  try {
    const req = await request({ uri });
    return JSON.parse(req);
  } catch (e) {
    console.log('Request Failed');
    throw e;
  }
};

// const doMethod = async ({ method, accessToken, data, domain, format }) => {
//     return await doRequest(generateUrl({ query, method }));
// };

/**
* Function to check through an array of items to check for short urls or hashes
* If only passed one item, put in array for url checking
* @param  {Array} unsortedItems The array of items to be checked
* @param  {Object} query The query object
* @return {void}
*/
const sortUrlsAndHash = (unsortedItems, result = { shortUrl: [], hash: [] }) => {
  (Array.isArray(unsortedItems) ? unsortedItems : [unsortedItems]).map(
    item =>
      isUri(item) ? result.shortUrl.push(item) : typeof item === 'string' && result.hash.push(item),
  );
  //console.log(result);
  return result;
};

const generateQuery = args => {
  const result = args.reduce((prev, key) => {
    prev[key] = args[key];
    return prev;
  }, {});
  return result;
};

module.exports = {
  generateUrl,
  generateQuery,
  doRequest,
  sortUrlsAndHash,
};
