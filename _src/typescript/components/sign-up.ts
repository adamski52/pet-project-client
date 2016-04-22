import {Component} from 'angular2/core';
import {MainBaseComponent} from './main-base-component';

import {LoginService} from "../services/login";
import {AlertService} from "../services/alert";
import {NavService} from "../services/nav";

@Component({
    selector: "[enroll]",
    templateUrl: "templates/sign-up.html"
})

export class SignUpComponent extends MainBaseComponent {
    constructor(private _alert: AlertService,
                private _login: LoginService,
                private _nav: NavService) {
        super(_nav);
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
}