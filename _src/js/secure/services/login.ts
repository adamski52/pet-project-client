import {Injectable} from 'angular2/core';
import {ILogin} from "../interfaces/login";
import {API} from "../../app/lib/api";
import {AlertService} from "../../alert/services/alert";
import {Observable} from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';
import {Response} from 'angular2/http';

@Injectable()
export class LoginService {
    private _observer: Observer<Response>;
    data$ = new Observable(observer => this._observer = observer).share();

    constructor(private _api: API, private _alert:AlertService) {}

    post(credentials:ILogin) {
        this._api.post("login", credentials).map(
            response => response.json()
        ).subscribe(
            response => {
                this._observer.next(response);
            },
            error => this._alert.error("Invalid Username/Password.")
        );
    }
}