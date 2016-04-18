import {Component} from 'angular2/core';
import {LoginService} from "../services/login";
import {AlertService} from "../services/alert";

@Component({
    selector: "[enroll]",
    templateUrl: "templates/sign-up.html"
})

export class SignUpComponent {
    constructor(private _alert: AlertService,
                private _login: LoginService) {
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