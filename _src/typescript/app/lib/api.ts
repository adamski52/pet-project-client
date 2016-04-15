import {Http, Response, Headers} from 'angular2/http';
import {CONSTANTS} from "../../constants";
import {Injectable} from 'angular2/core';
import {Observable} from 'rxjs/Observable';
import {Cookie} from "../../app/lib/cookie";

@Injectable()
export class API {
    private getBody(body?:Object):Object {
        body = body || {};

        return body;
    }

    private getHeaders(useToken:boolean = true):Headers {
        let headers = new Headers({
            "Content-Type": "application/json",
            "X-Requested-With": "XMLHttpRequest",
        });

        if (useToken) {
            let token = Cookie.getCookie(CONSTANTS.CSRF_NAME);
            if (token) {
                headers.set("X-CSRFToken", token);
            }
        }

        return headers;
    }

    constructor(private _http: Http) {}

    get(name: string, unique:boolean = false, requiresToken:boolean = true): Observable<Response> {
        let headers: Headers = new Headers();
        headers = this.getHeaders(requiresToken);

        return this._http.get(CONSTANTS.getURL(name) + (unique ? "?" + new Date().getTime() : ""), {
            headers: headers
        }).map(response => {
            return response.json();
        });
    }

    post(name: string, body?: Object): Observable<Response> {
        body = this.getBody(body);

        return this._http.post(CONSTANTS.getURL(name), JSON.stringify(body), {
            headers: this.getHeaders()
        }).map(response => {
            return response.json();
        });
    }

    put(name: string, body?: Object): Observable<Response> {
        body = this.getBody(body);

        return this._http.put(CONSTANTS.getURL(name), JSON.stringify(body), {
            headers: this.getHeaders()
        }).map(response => {
            return response.json();
        });
    }

    delete(name: string): Observable<Response> {
        return this._http.delete(CONSTANTS.getURL(name), {
            headers: this.getHeaders()
        }).map(response => {
            return response.json();
        });
    } 
}