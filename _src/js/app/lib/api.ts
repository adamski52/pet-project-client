import {Http, Headers, Response, RequestOptionsArgs} from 'angular2/http';
import {CONSTANTS} from "../../constants";
import {Injectable} from 'angular2/core';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class API {
    private getHeaders(args?: RequestOptionsArgs): RequestOptionsArgs {
        if (args === null || args === undefined) {
            return {
                headers: new Headers({
                    "Content-Type": "application/json"
                })
            };
        }

        if (!args.hasOwnProperty("headers")) {
            args.headers = new Headers();
        }

        if(!args.headers.has("Content-Type")) {
            args.headers.set("Content-Type", "application/json");
        }

        return args;
    }

    private getBody(body?:Object) {
        if (body === null || body === undefined) {
            return {};
        }

        return body;
    }

    constructor(private _http: Http) {}

    get(name: string, unique:boolean = false, headers?: RequestOptionsArgs): Observable<Response> {
        headers = this.getHeaders(headers);

        return this._http.get(CONSTANTS.getURL(name) + (unique ? "?" + new Date().getTime() : ""), headers).map(response => {
            return response.json();
        });
    }

    post(name: string, body?: Object, headers?: RequestOptionsArgs): Observable<Response> {
        body = this.getBody(body);
        headers = this.getHeaders(headers);

        return this._http.post(CONSTANTS.getURL(name), JSON.stringify(body), headers);
        /*.map(response => {
            return response.json();
        });*/
    }

    put(name: string, body?: Object, headers?: RequestOptionsArgs): Observable<Response> {
        body = this.getBody(body);
        headers = this.getHeaders(headers);

        return this._http.put(CONSTANTS.getURL(name), JSON.stringify(body), headers).map(response => {
            return response.json();
        });
    }

    delete(name: string, headers?: RequestOptionsArgs): Observable<Response> {
        headers = this.getHeaders(headers);

        return this._http.delete(CONSTANTS.getURL(name), headers).map(response => {
            return response.json();
        });
    } 
}