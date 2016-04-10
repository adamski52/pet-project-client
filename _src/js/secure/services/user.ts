import {Injectable} from 'angular2/core';
import {API} from "../../app/lib/api";
import {AlertService} from "../../alert/services/alert";
import {Observable} from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';
import {Response} from 'angular2/http';

@Injectable()
export class UserService {
    private _observer: Observer<Response>;
    public user;
    public data$ = new Observable(observer => this._observer = observer).share();

    constructor(private _api: API,
                private _alert:AlertService) {}

    get() {
        this._api.get("whoami").subscribe(
            response => {
                if (response.length > 0) {
                    this._observer.next(response[0]);
                }
            },
            error => { }
        );   
    }

    getAll() {
        this._api.get("users").subscribe(
            response => {
                this._observer.next(response);
            },
            error => {}
        );
    }
}