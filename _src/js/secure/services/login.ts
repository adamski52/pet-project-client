import {Injectable} from 'angular2/core';
import {ILogin} from "../interfaces/login";
import {API} from "../../app/lib/api";
import {AlertService} from "../../alert/services/alert";
import {Observable} from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';
import {Response} from 'angular2/http';
import {Cookie} from "../../app/lib/cookie";
import {CONSTANTS} from "../../constants";

@Injectable()
export class LoginService {
    private _observer: Observer<Response>;
    public data$ = new Observable(observer => this._observer = observer).share();
    public userid: number;

    constructor(private _api: API,
                private _alert:AlertService) {}

    private onAuthenticate(response) {
        this.userid = response.id;

        //Cookie.setCookie(CONSTANTS.TOKEN_NAME, response[CONSTANTS.TOKEN_NAME]);
        this._alert.success("Login successful.");

        this._observer.next(response);
    }

    post(credentials:ILogin) {
        Cookie.deleteCookie(CONSTANTS.CSRF_NAME);
        Cookie.deleteCookie(CONSTANTS.TOKEN_NAME);

        this._api.post("login", credentials).subscribe(
            response => this.onAuthenticate(response),
            error => this._alert.error("Invalid Username/Password.")
        );
    }
}