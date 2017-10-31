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
module.exports = accessToken => {
    /**
    * Request to get clicks by day for a single short url, short hash or mixed array or items
    * @param  {String|Array} items  The string or array of short urls and/or hashes to expand
    * @return {Promise}
    */
    const info = async (items, ...args) =>
        await doRequest({
            method: 'info',
            accessToken,
            data: sortUrlsAndHash(items),
            query: generateQuery(args)
        });
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

    /**
       * Request to get clicks for a single short url, short hash or mixed array or items
       * @param  {String|Array} items  The string or array of short urls and/or hashes to expand
       * @return {Promise}
       */
    const clicks = async (items, ...args) =>
        await doRequest({ method: 'clicks', accessToken, data: sortUrlsAndHash(items), query: generateQuery(args) });

    /**
    * Request to get clicks by minute for a single short url, short hash or mixed array or items
    * @param  {String|Array} items  The string or array of short urls and/or hashes to expand
    * @return {Promise}
    */
    const clicksByMinute = async (items, ...args) =>
        await doRequest({
            method: 'clicks_by_minute',
            accessToken,
            data: sortUrlsAndHash(items),
            query: generateQuery(args)
        });

    /**
    * Request to get clicks by day for a single short url, short hash or mixed array or items
    * @param  {String|Array} items  The string or array of short urls and/or hashes to expand
    * @return {Promise}
    */
    const clicksByDay = async (items, ...args) =>
        await doRequest({
            method: 'clicks_by_day',
            accessToken,
            data: sortUrlsAndHash(items),
            query: generateQuery(args)
        });

    /**
    * Request to get look up an existing bitly link for a long url or array of urls
    * @param  {String|Array} links  The string or array of long urls
    * @return {Promise}
    */
    const lookup = async (items, ...args) =>
        await doRequest({
            method: 'lookup',
            accessToken,
            data: { url: items },
            query: generateQuery(args)
        });

    /**
    * Request the informations on all referrers for a short url.  This function only
    * accepts one url (as per the limit of the bitly API)
    * @param  {String} link The link be checked
    * @return {Promise}
    */
    const referrers = async (item, ...args) =>
        await doRequest({
            method: 'referrers',
            accessToken,
            data: sortUrlsAndHash([item]),
            query: generateQuery(args)
        });

    /**
    * Request the informations on all countries for a short url.  This function only
    * accepts one url (as per the limit of the bitly API)
    * @param  {String} link The link be checked
    * @return {Promise}
    */
    const countries = async (item, ...args) =>
        await doRequest({
            method: 'countries',
            accessToken,
            data: sortUrlsAndHash([item]),
            query: generateQuery(args)
        });

    return {
        shorten,
        expand,
        clicks,
        clicksByMinute,
        clicksByDay,
        lookup,
        info,
        referrers,
        countries
    };
};
