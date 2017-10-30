        /**
    * Request to get clicks by day for a single short url, short hash or mixed array or items
    * @param  {String|Array} items  The string or array of short urls and/or hashes to expand
    * @return {Promise}
    */
        const clicksByDay = async items => {
            var query = {
                format: this.config.format,
                domain: this.config.domain,
                access_token: this.config.accessToken
            };

            this.sortUrlsAndHash(items, query);

            return await doRequest(generateNiceUrl({ query, method: 'clicks_by_day' }));
        };

        /**
    * Request to get look up an existing bitly link for a long url or array of urls
    * @param  {String|Array} links  The string or array of long urls
    * @return {Promise}
    */
        const lookup = async links => {
            var query = {
                format: this.config.format,
                url: links,
                domain: this.config.domain,
                access_token: this.config.accessToken
            };

            return await doRequest(generateNiceUrl({ query, method: 'lookup' }));
        };

        /**
    * Request to get clicks by day for a single short url, short hash or mixed array or items
    * @param  {String|Array} items  The string or array of short urls and/or hashes to expand
    * @return {Promise}
    */
        const info = async items => {
            var query = {
                format: this.config.format,
                domain: this.config.domain,
                access_token: this.config.accessToken
            };

            this.sortUrlsAndHash(items, query);

            return await doRequest(generateNiceUrl({ query, method: 'info' }));
        };

        /**
    * Request the informations on all referrers for a short url.  This function only
    * accepts one url (as per the limit of the bitly API)
    * @param  {String} link The link be checked
    * @return {Promise}
    */
        const referrers = async link => {
            var query = {
                format: this.config.format,
                domain: this.config.domain,
                access_token: this.config.accessToken
            };

            query[isUri(link) ? 'shortUrl' : 'hash'] = link;

            return await doRequest(generateNiceUrl({ query, method: 'referrers' }));
        };

        /**
    * Request the information on all countries for a short url.  This function only
    * accepts one url (as per the limit of the bitly API)
    * @return {Promise}
    */
        const countries = async link => {
            var query = {
                format: this.config.format,
                domain: this.config.domain,
                access_token: this.config.accessToken
            };

            query[isUri(link) ? 'shortUrl' : 'hash'] = link;

            return await doRequest(generateNiceUrl({ query, method: 'countries' }));
        };

        /**
    * Request to confirm a pro-domain it set up with bitly
    * @param  {String} domain The domain to be checked
    * @return {Promise}
    */
        const bitlyProDomain = async domain => {
            var query = {
                format: this.config.format,
                domain: domain,
                access_token: this.config.accessToken
            };

            return await doRequest(generateNiceUrl({ query, method: 'bitly_pro_domain' }));
        };

        /**
    * Request entries from a user's link history in reverse chronological order
    * @return {Promise}
    */
        const history = async () => {
            var query = {
                // @todo Implement optional parameters:
                //   http://dev.bitly.com/user_info.html#v3_user_link_history
            };

            return await doRequest(generateNiceUrl({ query, method: 'user/link_history' }));
        };

        /**
    * Edit an existing link's metadata
    * @param {String|Array} metadata_field Metadata field to edit (title, note, private, user_ts or archived). To edit
    * multiple fields, pass an array of field names as strings, e.g. ['title', 'note']
    * @param {String} link The Bitlink to be edited (requires protocol, i.e "example.com" won't work but
    *   "http://example.com" will)
    * @param {String|Array} new_value The new value for the edited metadata. If you pass an array to metadata_field, you
    * have to pass an array to new_value. The index have to match those in metadata_field, e.g. metadata_field[0] will
    *   be
    * changed to new_value[0] etc.
    * @return {Promise}
    */
        const linkEdit = async (metadata_field, link, new_value) => {
            var query = {
                link: link
            };

            // We can use an array of fields and matching values to edit multiple metadata fields or strings to edit only a
            // single one
            if (Array.isArray(metadata_field) && Array.isArray(new_value)) {
                query['edit'] = metadata_field.join(',');
                metadata_field.forEach((field, index) => {
                    query[field] = new_value[index];
                });
            } else {
                query['edit'] = metadata_field;
                query[metadata_field] = new_value;
            }

            return await doRequest(generateNiceUrl({ query, method: 'user/link_edit' }));
        };
