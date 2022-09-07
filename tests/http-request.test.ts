import { 
    describe,
    test,
    beforeAll,
    expect
} from '@jest/globals';

import HttpRequest from '../src/entities/http-request';
import { OptionsI } from '../src/interfaces/options.interface';

const mocks = {
    userDetails: require('./mocks/user-details.json'),
    rickandmorty_ep5: require('./mocks/rickandmorty-ep5.json')
}

describe('Http-request receive a url to make request and using stream to communicate with your service.', () => {
    let httpRequest: HttpRequest;

    beforeAll(() => {
        httpRequest = new HttpRequest();
    });

    test('Should return a github user details json in a HTTP GET', async () => {
        const options: OptionsI = {
            method: "GET",
            hostname: "api.github.com",
            port: null,
            path: "/users/rfontt",
            headers: {
                "user-agent": "node.js"
            }
        };

        expect(await httpRequest.httpGet(options)).toStrictEqual(mocks.userDetails);
    })

    test('Should return a rick and morty episodes json in a HTTP GET', async () => {
        const options: OptionsI = {
            "method": "GET",
            "hostname": "rickandmortyapi.com",
            "port": null,
            "path": "/api/episode/5",
            "headers": {
                "user-agent": "node.js"
            }
        };

        expect(await httpRequest.httpGet(options)).toStrictEqual(mocks.rickandmorty_ep5);
    });
});

