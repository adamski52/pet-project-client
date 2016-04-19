import {RouterLink} from 'angular2/router';
import {Directive, ElementRef} from 'angular2/core';
import {LoginService} from "../services/login";
import {LogoutService} from "../services/logout";
import {UserService} from "../services/user";
import {AlertService} from "../services/alert";

@Directive({
    selector: "[nav]"
})

export class NavComponent {
    private isAuthenticated: boolean = false;

    constructor(private _alert:AlertService,
                private _element:ElementRef,
                private _logout:LogoutService,
                private _login:LoginService,
                private _user: UserService) {

        this._user.data$.subscribe(
            response => {
                this.isAuthenticated = true;
                console.log("NAV HEARD", this.isAuthenticated);
            }
        );

        this._logout.data$.subscribe(
            response => {
                this.isAuthenticated = false;
            }
        );
    }

    onLogin(username:string, password:string, e?:Event) {
        if (e) {
            e.preventDefault();
        }

        this._login.post({
            username,
            password
        });
    }

    onLogout(e?:Event) {
        if (e) {
            e.preventDefault();
        }

        this._logout.post();
    }
}