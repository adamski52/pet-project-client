import {Component, NgZone} from 'angular2/core';
import {LoginService} from "../../secure/services/login";
import {LogoutService} from "../../secure/services/logout";
import {UserService} from "../../secure/services/user";
import {SecureService} from "../../secure/services/secure";
import {AlertService} from "../../alert/services/alert";
import {CONSTANTS} from "../../constants";

@Component({
    selector: "secure",
    templateUrl: "templates/secure.html",
    host: {
        "[class.is-visible]": "_showSecure"
    }
})

export class SecureComponent {
    private _isAuthenticated:boolean = false;
    private _showSecure: boolean = false;
    constructor(private _logout: LogoutService,
                private _login: LoginService,
                private _user: UserService,
                private _secure: SecureService,
                private _alert:AlertService,
                private _zone: NgZone) { }

    ngOnInit() {
        this._secure.data$.subscribe(
            response => {
                this._showSecure = !!response;
            },
            error => { }
        );

        // if the user logged in, this will capture it, and then gather the rest of their profile using _user
        this._login.data$.subscribe(
            response => {
                this._user.get();
            }
        );

        this._logout.data$.subscribe(
            response => {
                this._isAuthenticated = false;
                this._secure.close();
                this._alert.success("Logout successful.");
            }
        );

        // if the user is already loged in, the response from this should be other than [].
        this._user.data$.subscribe(
            response => {
                console.log("USERS", response);
                if (response.length > 0) {
                    this._zone.run(() => {
                        this._alert.success("Login successful.");
                        this._isAuthenticated = true;
                        this._secure.open();
                    });
                }
                else {
                    this._secure.close();
                }
            }
        );

        this._secure.close();
    }
}