/*
 * This file is part of coaster-platform.org.
 *
 * (c) Michel Chowanski <michel@chowanski.de>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

// Imports
import Axios from 'axios';
import _ from 'lodash';

// Constants
const BASE_URL = 'https://coaster-platform.org/api';

module.export = {
    // Get parks list by optional config or null on failure
    async getParks(config = {}) {
        let result = null;

        // Set default config
        config = _.merge(
            {
                page: 1,
                itemsPerPage: 12,
                searchTerm: null,
                filters: [],
                facets: [],
                regulation: {
                    size: null,
                    age: null
                }
            },
            config
        );

        try {
            let response = await Axios.get(BASE_URL + '/parks' + '?' + this.buildQuery(config).join('&'));
            result = response.data;
        } catch (error) {
            console.error(error)
        }

        return result;
    },

    // Get specific park by uuid or null on failure
    async getPark(uuid) {
        let result = null;

        try {
            let response = await Axios.get(BASE_URL + '/parks/' + uuid);
            result = response.data;
        } catch (error) {
            console.error(error)
        }

        return result;
    },

    // Get attractions list by optional config or null on failure
    async getAttractions(config = {}) {
        let result = null;

        // Set default config
        config = _.merge(
            {
                page: 1,
                itemsPerPage: 12,
                searchTerm: null,
                filters: [],
                facets: [],
                regulation: {
                    size: null,
                    age: null
                }
            },
            config
        );

        try {
            let response = await Axios.get(BASE_URL + '/attractions' + '?' + this.buildQuery(config).join('&'));
            result = response.data;
        } catch (error) {
            console.error(error)
        }

        return result;
    },

    // Get specific attraction by uuid or null on failure
    async getAttraction(uuid) {
        let result = null;

        try {
            let response = await Axios.get(BASE_URL + '/attractions/' + uuid);
            result = response.data;
        } catch (error) {
            console.error(error)
        }

        return result;
    },


    // Get audit logs list by optional config or null on failure
    async getLogs(config = {}) {
        let result = null;

        // Set default config
        config = _.merge(
            {
                page: 1,
                itemsPerPage: 12,
                reference: null,
                contributor: null,
                order: null,
            },
            config
        );

        let query = [];
        query.push('page=' + encodeURIComponent(config.page));
        query.push('itemsPerPage=' + encodeURIComponent(config.itemsPerPage));

        if (config.reference) {
            query.push('reference=' + encodeURIComponent(config.reference));
        }

        if (config.contributor) {
            query.push('contributor=' + encodeURIComponent(config.contributor));
        }

        if (config.order) {
            query.push('order=' + encodeURIComponent(config.order));
        }

        try {
            let response = await Axios.get(BASE_URL + '/logs' + '?' + query.join('&'));
            result = response.data;
        } catch (error) {
            console.error(error)
        }

        return result;
    },

    // Build query
    buildQuery(config) {
        let query = [];
        query.push('page=' + encodeURIComponent(config.page));
        query.push('itemsPerPage=' + encodeURIComponent(config.itemsPerPage));

        if (config.searchTerm) {
            query.push('search=' + encodeURIComponent(config.searchTerm));
        }

        if (config.regulation.size !== null || config.regulation.age !== null) {
            let size = (/^\d+$/.test(config.regulation.size)) ? config.regulation.size : 'null';
            let age = (/^\d+$/.test(config.regulation.age)) ? config.regulation.age : 'null';

            query.push('filter[]=' + encodeURIComponent(`regulation(${size},${age})`));
        }

        config.facets.forEach(function (facet) {
            query.push('facet[]=' + encodeURIComponent(facet));
        });

        config.filters.forEach(function (filter) {
            query.push('filter[]=' + encodeURIComponent(filter));
        });

        return query;
    }
};