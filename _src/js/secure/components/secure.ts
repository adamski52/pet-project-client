import {Component} from 'angular2/core';
import {LoginService} from "../../secure/services/login";
import {LogoutService} from "../../secure/services/logout";
import {UserService} from "../../secure/services/user";
import {Cookie} from "../../app/lib/cookie";

@Component({
    selector: "secure",
    templateUrl: "templates/secure.html",
    host: {
        "[class.is-visible]": "isAuthenticated"
    }
})

export class SecureComponent {
    private isAuthenticated:boolean = false;
    constructor(private _logout: LogoutService,
                private _login: LoginService,
                private _user: UserService) {
    }

    ngOnInit() {
        this._login.data$.subscribe(
            response => {
                //this._user.get();
                console.log("SECURE SUBSCRIBE", response);
                this.isAuthenticated = true;
            }
        );

        this._logout.data$.subscribe(
            response => {
                this.isAuthenticated = false;
            }
        );

        /*this._user.data$.subscribe(
            response => {
                console.log("USERS", response);
                this.isAuthenticated = true;
            }
        );*/

        if (Cookie.getCookie("token")) {
            this._login.renew();
        }
    }
}