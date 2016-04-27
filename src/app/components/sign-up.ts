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
    private model:Object = {
        username: "",
        password: "",
        confirmPassword: "",
        firstName: "",
        lastName: "",
        dob: "",
        address: "",
        city: "",
        zipCode: "",
        homePhone: null,
        cellPhone: null,
        address2: null,
        gender: null
    };

    private errors:Object[];
    
    constructor(private _alert: AlertService,
                private _login: LoginService,
                private _nav: NavService) {
        super(_nav);
    }

    onRegister(username:string,
               password:string,
               confirmPassword:string,
               firstName:string,
               lastName:string,
               dob:Date,
               address:string,
               city:string,
               zipCode:string,
               homePhone?:string,
               cellPhone?:string,
               address2?:string,
               gender?:string) {
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