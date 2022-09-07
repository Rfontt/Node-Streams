import https from 'https';
import { OptionsI } from '../interfaces/options.interface';

export default class HttpRequest {

    httpGet(options: OptionsI) {
        return new Promise(((resolve, reject) => {
            const request = https.request(options, (response) => {
                response.setEncoding('utf8');

                let data = '';
            
                response.on('data', (chunk) => {
                    data += chunk;
                });
        
                response.on('end', () => {
                  resolve(JSON.parse(data));
                });
        
                response.on('error', (error) => {
                    throw error;
                });
            });
            
            request.end();
        }));
    }
}