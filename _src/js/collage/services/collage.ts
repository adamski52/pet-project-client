import {Observable} from 'rxjs/Observable';
import {Http, Response} from 'angular2/http';
import {Injectable} from 'angular2/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/share';
import {CONSTANTS} from "../../constants";

@Injectable()
export class CollageService {
    private _fetch: Observable<Response>;

    constructor(private _http: Http) {
        this._fetch = this._http.get(CONSTANTS.getURL("collages", true)).map(response => {
            return response.json();
        }); // don't share this otherwise we won't re-call, which is how we randomize.
    }

    fetch() {
        return this._fetch;
    }
}