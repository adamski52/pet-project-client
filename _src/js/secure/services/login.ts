import {Injectable} from 'angular2/core';
import {ILogin} from "../interfaces/login";
import {API} from "../../app/lib/api";
import {AlertService} from "../../alert/services/alert";
import {SecureService} from "../../secure/services/secure";
import {Observable} from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';
import {Response} from 'angular2/http';
import {CONSTANTS} from "../../constants";

@Injectable()
export class LoginService {
    private _observer: Observer<Response>;
    public data$ = new Observable(observer => this._observer = observer).share();
    public userid: number;

    constructor(private _api: API,
                private _alert:AlertService,
                private _secure:SecureService) {}

    private onAuthenticate(response) {
        this.userid = response.id;

        this._observer.next(response);
        this._secure.open();
    }

    post(credentials:ILogin) {
        this._api.post("login", credentials).subscribe(
            response => this.onAuthenticate(response),
            error => this._alert.error("Invalid Username/Password.")
        );
    }
}