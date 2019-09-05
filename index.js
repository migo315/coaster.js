/*
 * This file is part of coaster.cloud.
 *
 * (c) Michel Chowanski <michel@chowanski.de>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

// Imports
import Axios from 'axios';
import _ from 'lodash';

export default {
    baseUrl: 'https://api.coaster.cloud',
    withAcl: false,

    // Get parks list by optional config or null on failure
    async getParks(config = {}) {
        let result = null;

        // Set default config
        config = _.merge(
            {
                page: 1,
                itemsPerPage: 12,
                searchTerm: null,
                sort: null,
                filters: [],
                facets: [],
                founded: null,
                regulation: {
                    size: null,
                    age: null
                }
            },
            config
        );

        try {
            let response = await Axios.get(this.baseUrl + '/parks' + '?' + this.buildQuery(config).join('&'));
            result = response.data;
        } catch (error) {
            console.error(error)
        }

        return result;
    },

    // Get specific park by uuid or null on failure
    async getPark(uuid) {
        let result = null;

        let query = [];
        if (this.withAcl === true) {
            query.push('acl=true');
        }

        let params = '';
        if (query.length > 0) {
            params = '?' + query.join('&');
        }

        try {
            let response = await Axios.get(this.baseUrl + '/parks/' + uuid + params);
            result = response.data;
        } catch (error) {
            console.error(error)
        }

        return result;
    },

    // Get waiting times for specific park by uuid or null on failure
    async getWaitingTimes(uuid) {
        let result = null;

        try {
            let response = await Axios.get(this.baseUrl + '/parks/' + uuid  + '/waiting-times');
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
                park: null,
                page: 1,
                itemsPerPage: 12,
                searchTerm: null,
                sort: null,
                filters: [],
                facets: [],
                founded: null,
                regulation: {
                    size: null,
                    age: null
                }
            },
            config
        );

        let url = null;
        if (config.park) {
            url = this.baseUrl + '/parks/' + config.park + '/attractions' + '?' + this.buildQuery(config).join('&');
        } else {
            url = this.baseUrl + '/attractions' + '?' + this.buildQuery(config).join('&');
        }

        try {
            let response = await Axios.get(this.baseUrl + '/attractions' + '?' + this.buildQuery(config).join('&'));
            result = response.data;
        } catch (error) {
            console.error(error)
        }

        return result;
    },

    // Get specific attraction by uuid or null on failure
    async getAttraction(uuid) {
        let result = null;

        let query = [];
        if (this.withAcl === true) {
            query.push('acl=true');
        }

        let params = '';
        if (query.length > 0) {
            params = '?' + query.join('&');
        }

        try {
            let response = await Axios.get(this.baseUrl + '/attractions/' + uuid + params);
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
        query.push('page=' + encodeURIComponent(config.page));
        query.push('itemsPerPage=' + encodeURIComponent(config.itemsPerPage));

        if (config.searchTerm) {
            query.push('search=' + encodeURIComponent(config.searchTerm));
        }

        if (config.sort) {
            query.push('sort=' + encodeURIComponent(config.sort));
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

        if (config.founded !== null && (/^\d{4}$/.test(config.founded))) {
            let year = config.founded;
            query.push('filter[]=' + encodeURIComponent(`founded:${year}0101000000 TO ${year}1231235959`));
        }

        if (this.withAcl === true) {
            query.push('acl=true');
        }

        return query;
    }
};
