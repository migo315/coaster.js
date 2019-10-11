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
const { baseUrl } = require('../config');
const { buildQuery } = require('./build-query');

module.exports = {

    // Get parks list by optional config or null on failure
    async getParks(config = {}) {
        let result = null;

        try {
            let response = await Axios.get(baseUrl + '/parks' + buildQuery(config));
            result = response.data;
        } catch (error) {
            console.error(error);
        }

        return result;
    },

    // Get specific park by uuid or null on failure
    async getPark(uuid, config = {}) {
        let result = null;

        try {
            let response = await Axios.get(baseUrl + '/parks/' + uuid + buildQuery(config));
            result = response.data;
        } catch (error) {
            console.error(error);
        }

        return result;
    },

    // Get waiting times for specific park by uuid or null on failure
    async getWaitingTimes(uuid, config = {}) {
        let result = null;

        try {
            let response = await Axios.get(
                baseUrl + '/parks/' + uuid + '/waiting-times' + buildQuery(config)
            );
            result = response.data;
        } catch (error) {
            console.error(error);
        }

        return result;
    },

    // Get attractions list by optional config or null on failure
    async getAttractions(config = {}) {
        let result = null;
        let url = null;

        if (config.hasOwnProperty('park') && config.park) {
            url = baseUrl + '/parks/' + config.park + '/attractions';
        } else {
            url = baseUrl + '/attractions';
        }

        try {
            let response = await Axios.get(url + buildQuery(config));
            result = response.data;
        } catch (error) {
            console.error(error);
        }

        return result;
    },

    // Get specific attraction by uuid or null on failure
    async getAttraction(uuid, config = {}) {
        let result = null;

        try {
            let response = await Axios.get(baseUrl + '/attractions/' + uuid + buildQuery(config));
            result = response.data;
        } catch (error) {
            console.error(error);
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
            await Axios.post(baseUrl + '/parks/' + park + '/waiting-times', queues, config);
            result = true;
        } catch (error) {
            console.error(error);
        }

        return result;
    },
};
