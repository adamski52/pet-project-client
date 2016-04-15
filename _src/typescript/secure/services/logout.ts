import {Injectable} from 'angular2/core';
import {API} from "../../app/lib/api";
import {AlertService} from "../../alert/services/alert";
import {Observable} from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';
import {Response} from 'angular2/http';
import {CONSTANTS} from "../../constants";

@Injectable()
export class LogoutService {
    private _observer: Observer<Response>;
    public data$ = new Observable(observer => this._observer = observer).share();

    constructor(private _api: API,
                private _alert:AlertService) {}

    post() {
        this._api.post("logout").subscribe(
            response => {
                this._observer.next(response);
            },
            error => this._alert.error("Failed to logout.")
        );
    }
}