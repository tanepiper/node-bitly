const { promisify } = require('util');
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
const generateUrl = ({
    accessToken,
    method,
    data = {},
    apiUrl = 'api-ssl.bitly.com',
    apiVersion = 'v3',
    domain = 'bit.ly',
    format = 'json',
    query = {}
}) => {
    const keys = Object.keys(data);

    const newQuery = Object.assign(
        {
            access_token: accessToken,
            domain,
            format
        },
        query
    );

    keys.forEach(key => (newQuery[key] = data[key]));

    return url.parse(
        url.format({
            protocol: 'https',
            hostname: apiUrl,
            pathname: `/${apiVersion}/${method}`,
            query: newQuery
        })
    );
};

const doRequest = async ({ uri }) => {
    try {
        const req = await request({ uri });
        return req;
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
* @param  {Array} unsortedItems The array of items to be checked
* @param  {Object} query The query object
* @return {void}
*/
const sortUrlsAndHash = unsortedItems => {
    const shortUrl = [];
    const hash = [];
    const result = {};

    // If only passed one item, put in array for url checking
    (Array.isArray(unsortedItems) ? unsortedItems : [unsortedItems]).forEach(
        item => (isUri(item) ? shortUrl.push(item) : hash.push(item))
    );

    return { shortUrl: shortUrl.length > 0 ? shortUrl : [], hash: hash.length > 0 ? hash : [] };
};

module.exports = {
    generateUrl,
    doRequest,
    sortUrlsAndHash
};
