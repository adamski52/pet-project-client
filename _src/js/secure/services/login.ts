import {Injectable} from 'angular2/core';
import {ILogin} from "../interfaces/login";
import {API} from "../../app/lib/api";
import {AlertService} from "../../alert/services/alert";
import {Observable} from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';
import {Response} from 'angular2/http';
import {Cookie} from "../../app/lib/cookie";

@Injectable()
export class LoginService {
    private _observer: Observer<Response>;
    public data$ = new Observable(observer => this._observer = observer).share();

    constructor(private _api: API,
                private _alert:AlertService) {}

    private onAuthenticate(response) {
        Cookie.setCookie("token", response.token);
        this._alert.success("Login successful.");

        this._observer.next(response);
    }

    renew() {
        this._api.post("renew", {
            token: Cookie.getCookie("token")
        }).subscribe(
            response => this.onAuthenticate(response),
            error => {
                this._alert.error("Failed to renew session.  Please log back in.");
                Cookie.deleteCookie("token");
            }
        );
    }

    post(credentials:ILogin) {
        this._api.post("login", credentials).subscribe(
            response => this.onAuthenticate(response),
            error => this._alert.error("Invalid Username/Password.")
        );
    }
}