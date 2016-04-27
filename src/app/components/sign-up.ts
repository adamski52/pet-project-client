import {Component} from 'angular2/core';
import {FORM_DIRECTIVES, FormBuilder, Validators} from 'angular2/common';
import {MainBaseComponent} from './main-base-component';

import {LoginService} from "../services/login";
import {AlertService} from "../services/alert";
import {NavService} from "../services/nav";
import {ValidationService} from "../services/validation";

@Component({
    selector: "[enroll]",
    templateUrl: "templates/sign-up.html",
    directives: [
        FORM_DIRECTIVES
    ]
})

export class SignUpComponent extends MainBaseComponent {
    private rForm;
    constructor(private _alert: AlertService,
                private _login: LoginService,
                private _nav: NavService,
                private _formBuilder: FormBuilder) {
        super(_nav);
    }

    ngOnInit() {
      this.rForm = this._formBuilder.group({
            account: this._formBuilder.group({
                username: ["", Validators.required],
                passwords: this._formBuilder.group({
                    password: ["", Validators.required],
                    password2: ["", Validators.required]
                }, {
                    validator: ValidationService.allMatch
                }),
                email: ["", Validators.compose([Validators.required, ValidationService.email])]
            }),
            personal: this._formBuilder.group({
                firstName: ["", Validators.required],
                lastName: ["", Validators.required],
                gender: ["", Validators.required],
                dob: ["", Validators.required]
            }),
            location: this._formBuilder.group({
                address: ["", Validators.required],
                address2: ["", Validators.required],
                city: ["", Validators.required],
                state: ["", Validators.required],
                zip: ["", Validators.compose([Validators.required, ValidationService.zipCode])]
            }),
            phones: this._formBuilder.group({
                homePhone: ["", ValidationService.phoneNumber],
                cellPhone: ["", ValidationService.phoneNumber]
            }, {
                validator: ValidationService.atLeastOne
            })
        });

        this.rForm.valueChanges.subscribe(data => this.validateForm(data));
    }

    validateForm(data) {
      if(!this.rForm.controls.account.controls.passwords.valid) {

      }
    }

    onRegister(e?:Event) {
        if(e) {
            e.preventDefault();
        }

        console.log(this.rForm.value);
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