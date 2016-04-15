import {Injectable} from 'angular2/core';
import {API} from "../../app/lib/api";
import {AlertService} from "../../alert/services/alert";
import {Observable} from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';
import {Response} from 'angular2/http';
import {LogoutService} from "../../secure/services/logout";

@Injectable()
export class UserService {
    private _observer: Observer<Response>;
    public user:Object = {};
    public data$ = new Observable(observer => this._observer = observer).share();

    constructor(private _api: API,
                private _alert:AlertService,
                private _logout:LogoutService) {
        
        this._logout.data$.subscribe(
            response => {
                this.user = {};
            }
        )
    }

    isAuthenticated() {
        let auth:boolean = Object.keys(this.user).length > 0;
        console.log(this.user, Object.keys(this.user).length);
        if(!auth) {
            this._logout.post();
        }

        return auth;
    }

    get() {
        this._api.get("whoami").subscribe(
            response => {
                if (response.length > 0) {
                    this.user = response[0];
                    console.log("USER SET TO", this.user);
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