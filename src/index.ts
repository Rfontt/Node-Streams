import HttpRequest from "./entities/http-request";
import { OptionsI } from "./interfaces/options.interface";

const httpRequest = new HttpRequest();

async function getUserDetails(options: OptionsI) {
    const userDatails = await httpRequest.httpGet(options);

    return userDatails;
}

;(async () => {
    const options = {
        method: "GET",
        hostname: "api.github.com",
        port: null,
        path: "/users/rfontt",
        headers: {
          "Content-Length": "0"
        }
    };

    console.log(await getUserDetails(options));
})()
