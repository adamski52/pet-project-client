import {Component} from 'angular2/core';
import {FORM_DIRECTIVES, FormBuilder, Validators} from 'angular2/common';
import {MainBaseComponent} from './main-base-component';
import {NgFor} from "angular2/common";

import {EntryComponent} from "./entry";
import {EntryGroupComponent} from "./entry-group";
import {LoginService} from "../services/login";
import {AlertService} from "../services/alert";
import {NavService} from "../services/nav";
import {ValidationService} from "../services/validation";
import {DateService} from "../services/date";

@Component({
    selector: "[enroll]",
    templateUrl: "templates/sign-up.html",
    directives: [
        FORM_DIRECTIVES,
        EntryComponent,
        EntryGroupComponent,
        NgFor
    ]
})

export class SignUpComponent extends MainBaseComponent {
    private rForm;
    private dates:number[];
    private months:number[];
    private years:number[];
    private errors:Object[];

    constructor(private _alert: AlertService,
                private _login: LoginService,
                private _nav: NavService,
                private _formBuilder: FormBuilder) {
        super(_nav);
    
        this.rForm = this._formBuilder.group({
            account: this._formBuilder.group({
                username: ["", Validators.required],
                passwords: this._formBuilder.group({
                    password: ["", Validators.required],
                    password2: ["", Validators.required]
                }, {
                    validator: Validators.compose([ValidationService.allMatch, Validators.required])
                }),
                email: ["", Validators.compose([ValidationService.email, Validators.required])]
            }),
            personal: this._formBuilder.group({
                firstName: ["", Validators.required],
                lastName: ["", Validators.required],
                gender: ["", Validators.required],
                dob: this._formBuilder.group({
                  month: ["", Validators.required],
                  date: ["", Validators.required],
                  year: ["", Validators.required]
                }, {
                  validator: ValidationService.allRequired
                })
            }),
            location: this._formBuilder.group({
                address: ["", Validators.required],
                address2: [""],
                city: ["", Validators.required],
                state: ["", Validators.required],
                zip: ["", Validators.compose([ValidationService.zipCode, Validators.required])]
            }),
            phones: this._formBuilder.group({
                homePhone: ["", ValidationService.phoneNumber],
                cellPhone: ["", ValidationService.phoneNumber]
            }, {
                validator: ValidationService.atLeastOne
            })
        });

        this.rForm.valueChanges.subscribe(data => this.validateForm(data));

        this.months = DateService.getMonths();
        this.dates = DateService.getDates();
        this.years = DateService.getYears();
    }

    validateForm(data) {
        if(this.rForm.valid) {
            return;
        }
    }

    onRegister(e?:Event) {
        if(e) {
            e.preventDefault();
        }

        console.log(ValidationService.getControlErrors(this.rForm.controls.location));
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