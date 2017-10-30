const url = require('url');
const http = require('https');
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
    return new Promise(async (resolve, reject) => {
        try {
            const req = await http.get(uri);
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

// const doMethod = async ({ method, accessToken, data, domain, format }) => {
//     return await doRequest(generateUrl({ query, method }));
// };

// /**
// * Function to check through an array of items to check for short urls or hashes
// * @param  {Array} items The array of items to be checked
// * @param  {Object} query The query object
// * @return {void}
// */
// const sortUrlsAndHash = ({ items = [], query: {} }) => {
//     const shortUrl = [];
//     const hash = [];

//     // If only passed one item, put in array for url checking
//     if (typeof items === 'string') {
//         items = [items];
//     }
//     items.forEach(item => (isUri(item) ? shortUrl.push(item) : hash.push(item)));

//     if (shortUrl.length > 0) query.shortUrl = shortUrl;
//     if (hash.length > 0) query.hash = hash;
// };

// const bitly = async (
//     { accessToken, domain, format } = {
//         format: 'json',
//         domain: 'bit.ly'
//     }
// ) => {
//     const bitlyInstance = { accessToken, domain, format };
// };

/**
 * @module node-bitly.lib
 * @exports { generateUrl }
 */

module.exports = {
    generateUrl,
    doRequest,
};
