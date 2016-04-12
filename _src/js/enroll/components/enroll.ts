import {Component} from 'angular2/core';
import {LoginService} from "../../secure/services/login";
import {AlertService} from "../../alert/services/alert";
@Component({
    selector: "enroll",
    templateUrl: "templates/enroll.html"
})

export class EnrollComponent {
    constructor(private _alert: AlertService,
                private _login: LoginService) {
        this._login.data$.subscribe(
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
}