/*
 * This file is part of coaster.cloud.
 *
 * (c) Michel Chowanski <michel@chowanski.de>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

// Imports
const Axios = require('axios');
const _ = require('lodash');

module.exports = {
    baseUrl: 'https://api.coaster.cloud',
    withAcl: false,
    language: 'en',

    // Get parks list by optional config or null on failure
    async getParks(config = {}) {
        let result = null;

        try {
            let response = await Axios.get(this.baseUrl + '/parks' + this.buildQuery(config));
            result = response.data;
        } catch (error) {
            console.error(error)
        }

        return result;
    },

    // Get specific park by uuid or null on failure
    async getPark(uuid, config = {}) {
        let result = null;

        try {
            let response = await Axios.get(this.baseUrl + '/parks/' + uuid + this.buildQuery(config));
            result = response.data;
        } catch (error) {
            console.error(error)
        }

        return result;
    },

    // Get waiting times for specific park by uuid or null on failure
    async getWaitingTimes(uuid, config = {}) {
        let result = null;

        try {
            let response = await Axios.get(
                this.baseUrl + '/parks/' + uuid  + '/waiting-times' + this.buildQuery(config)
            );
            result = response.data;
        } catch (error) {
            console.error(error)
        }

        return result;
    },

    // Get attractions list by optional config or null on failure
    async getAttractions(config = {}) {
        let result = null;
        let url = null;

        if (config.hasOwnProperty('park') && config.park) {
            url = this.baseUrl + '/parks/' + config.park + '/attractions';
        } else {
            url = this.baseUrl + '/attractions';
        }

        try {
            let response = await Axios.get(url + this.buildQuery(config));
            result = response.data;
        } catch (error) {
            console.error(error)
        }

        return result;
    },

    // Get specific attraction by uuid or null on failure
    async getAttraction(uuid, config = {}) {
        let result = null;

        try {
            let response = await Axios.get(this.baseUrl + '/attractions/' + uuid + this.buildQuery(config));
            result = response.data;
        } catch (error) {
            console.error(error)
        }

        return result;
    },

    // Add waiting times for a park / return true on success otherwise false
    async addWaitingTimes(token, park, queues) {
        let result = false;
        let config = {
            headers: {
                'X-Auth-Token': token
            }
        };

        try {
            await Axios.post(this.baseUrl + '/parks/' + park + '/waiting-times', queues, config);
            result = true;
        } catch (error) {
            console.error(error)
        }

        return result;
    },

    // Build query
    buildQuery(config) {
        let query = [];

        if (config.hasOwnProperty('page') && config.page) {
            query.push('page=' + encodeURIComponent(config.page));
        }

        if (config.hasOwnProperty('itemsPerPage') && config.itemsPerPage) {
            query.push('itemsPerPage=' + encodeURIComponent(config.itemsPerPage));
        }

        if (config.hasOwnProperty('searchTerm') && config.searchTerm) {
            query.push('search=' + encodeURIComponent(config.searchTerm));
        }

        if (config.hasOwnProperty('language') && config.language) {
            query.push('language=' + encodeURIComponent(config.language));
        } else {
            query.push('language=' + encodeURIComponent(this.language));
        }

        if (config.hasOwnProperty('sort') && config.sort) {
            query.push('sort=' + encodeURIComponent(config.sort));
        }

        if (config.hasOwnProperty('regulation')) {
            let regulation = _.merge(
                {
                    size: null,
                    age: null
                },
                config.regulation
            );

            if (regulation.size !== null || regulation.age !== null) {
                let size = (/^\d+$/.test(regulation.size)) ? regulation.size : 'null';
                let age = (/^\d+$/.test(regulation.age)) ? regulation.age : 'null';

                query.push('filter[]=' + encodeURIComponent(`regulation(${size},${age})`));
            }
        }

        if (config.hasOwnProperty('facets')) {
            config.facets.forEach(function (facet) {
                query.push('facet[]=' + encodeURIComponent(facet));
            });
        }

        if (config.hasOwnProperty('filters')) {
            config.filters.forEach(function (filter) {
                query.push('filter[]=' + encodeURIComponent(filter));
            });
        }

        if (config.hasOwnProperty('founded') && config.founded !== null && (/^\d{4}$/.test(config.founded))) {
            let year = config.founded;
            query.push('filter[]=' + encodeURIComponent(`founded.year:${year}`));
        }

        if (this.withAcl === true) {
            query.push('acl=true');
        }

        return query.length > 0 ? '?' + query.join('&') : '';
    }
};
