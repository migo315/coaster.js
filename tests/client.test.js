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
const MockAdapter = require('axios-mock-adapter');

let AxiosMock = new MockAdapter(Axios);
const Client = require('../src/client');

test('Test getPark returning api response', async () => {
    AxiosMock
        .onGet('https://api.coaster.cloud/parks/foo?language=en')
        .reply(200, {
            data: {name: 'Phantasialand'}
        });

    let response = await Client.getPark('foo');

    expect(response).toEqual({
        data: {name: 'Phantasialand'}
    })
});