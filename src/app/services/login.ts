import {Injectable} from 'angular2/core';
import {API} from "../lib/api";
import {AlertService} from "../services/alert";
import {Observable} from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';
import {Response} from 'angular2/http';
import {CONSTANTS} from "../lib/constants";

@Injectable()
export class LoginService {
    private _observer: Observer<Response>;
    public data$ = new Observable(observer => this._observer = observer).share();
    public userid: number;

    constructor(private _api: API,
                private _alert:AlertService) {}

    private onAuthenticate(response) {
        this.userid = response.id;

        this._observer.next(response);
    }

    post(credentials:Object) {
        this._api.post("login", credentials).subscribe(
            response => this.onAuthenticate(response),
            error => this._alert.error("Invalid Username/Password.")
        );
    }
}