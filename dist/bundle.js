(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(factory());
}(this, (function () { 'use strict';

'use strict';

const { doRequest, sortUrlsAndHash, generateQuery } = require('./lib');

/**
 * The main Bitly constructor, takes the users login, api key and additional options
 * @constructor
 * @module node-bitly
 * @param {String} accessToken OAuth access token
 * @param {Object=} config Optional config object
 * @returns {Bitly}
 */
module.exports = (accessToken, config) => {
    /**
   * Request to shorten one long url
   * @param  {String} longUrl The URL to be shortened
   * @param  {String=} domain The domain to use (optional)
   * @return {Promise}
   */
    const shorten = async (longUrl, ...args) =>
        await doRequest({ method: 'shorten', accessToken, data: { longUrl }, query: generateQuery(args) });

    /**
   * Request to expand a single short url, short hash or mixed array or items
   * @param  {String|Array} items  The string or array of short urls and/or hashes to expand
   * @return {Promise}
   */
    const expand = async (items, ...args) =>
        await doRequest({ method: 'expand', accessToken, data: sortUrlsAndHash(items), query: generateQuery(args) });

    return {
        shorten,
        expand
    };
};

})));
