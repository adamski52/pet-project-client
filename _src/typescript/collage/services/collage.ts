import {Injectable} from 'angular2/core';
import {API} from "../../app/lib/api";
import {Observable} from 'rxjs/Observable';
import {Response} from 'angular2/http';

@Injectable()
export class CollageService {
    constructor(private _api:API) {}

    get():Observable<Response> {
        return this._api.get("collages", true, false);
    }
}