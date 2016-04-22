import {Component, OnInit} from 'angular2/core';
import {MainBaseComponent} from './main-base-component';
import {NavService} from "../services/nav";

@Component({
    selector: "[forgot-password]",
    templateUrl: "templates/forgot-password.html"
})

export class ForgotPasswordComponent extends MainBaseComponent {
    constructor(private _nav:NavService) {
        super(_nav);
    }
}