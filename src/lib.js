const url = require('url');
const http = require('http');

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
const generateNiceUrl = ({ accessToken, apiUrl, apiVersion, method, query }) =>
    url.parse(
        url.format({
            protocol: 'https',
            hostname: apiUrl,
            pathname: `/${apiVersion}/${method}`,
            query: { access_token: accessToken, ...query }
        })
    );

const doRequest = async ({ url }) => {
    try {
        const res = await http.get(url);
        const { statusCode } = res;
        console.log(statusCode);
    } catch (e) {
        console.log('Request Failed');
        throw e;
    }
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

const bitly = async (
    { accessToken, domain, format } = {
        format: 'json',
        domain: 'bit.ly',
        apiUrl: 'api-ssl.bitly.com',
        apiVersion: 'v3'
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
