import {Observable} from 'rxjs/Observable';
import {Http, Response} from 'angular2/http';
import {Injectable} from 'angular2/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/share';
import {CONSTANTS} from "../../constants";
import {ILogin} from "../interfaces/login";

@Injectable()
export class LoginService {
    private _post: Observable<Response>;

    constructor(private _http: Http) {}

    post(credentials:ILogin) {
        return this._http.post(CONSTANTS.getURL("login"), JSON.stringify(credentials), {
            headers: {
                "Content-Type": "application/json"
            }
        }).map(response => {
            return response.json();
        });
    }
}