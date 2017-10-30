const url = require('url');
const http = require('http');
const isUri = require('valid-url').isUri;

/**
   * Generates the URL object to be passed to the HTTP request for a specific
   * API method call
   * @param {object} options The options to be passed to the method
   * @param {string} accessToken The access token to be passed
   * @param {string} [apiUrl=api-ssl.bitly.com] The API url to call against
   * @param {string} [apiVersion=v3] apiVersion The API version being called
   * @param {string} method The Bit.ly method to call with the request
   * @param {object} query Query object to pass to the API
   * @return {Object} The URL object for this request
   */
const generateNiceUrl = ({ accessToken, method, apiUrl = 'api-ssl.bitly.com', apiVersion = 'v3', query = {} }) =>
    url.parse(
        url.format({
            protocol: 'https',
            hostname: apiUrl,
            pathname: `/${apiVersion}/${method}`,
            query: { access_token: accessToken, ...query }
        })
    );

const doRequest = async ({ url }) => {
    return new Promise(async (resolve, reject) => {
        try {
            const req = await http.get(url);
            req.on('response', res => {
                resolve(res);
            });

            req.on('error', err => {
                reject(err);
            });
        } catch (e) {
            console.log('Request Failed');
            throw e;
        }
    });
};

const doMethod = async ({ method, accessToken, data, domain, format }) => {
    const keys = Object.keys(data);
    const query = {
        access_token: accessToken,
        domain,
        format
    };
    keys.forEach(key => (query[key] = data[key]));
    return await doRequest(generateNiceUrl({ query, method }));
};

/**
* Function to check through an array of items to check for short urls or hashes
* @param  {Array} items The array of items to be checked
* @param  {Object} query The query object
* @return {void}
*/
const sortUrlsAndHash = ({ items = [], query: {} }) => {
    const shortUrl = [];
    const hash = [];

    // If only passed one item, put in array for url checking
    if (typeof items === 'string') {
        items = [items];
    }
    items.forEach(item => (isUri(item) ? shortUrl.push(item) : hash.push(item)));

    if (shortUrl.length > 0) query.shortUrl = shortUrl;
    if (hash.length > 0) query.hash = hash;
};

const bitly = async (
    { accessToken, domain, format } = {
        format: 'json',
        domain: 'bit.ly'
    }
) => {
    const bitlyInstance = { accessToken, domain, format };
};

/**
 * @module node-bitly.lib
 * @exports { generateNiceUrl }
 */
module.exports = {
    generateNiceUrl,
    doRequest,
    doMethod,
    bitly
};
