import {Component} from 'angular2/core';
import {ROUTER_DIRECTIVES} from "angular2/router";
import {MainBaseComponent} from './main-base-component';
import {NavService} from "../services/nav";
import {LogoutService} from "../services/logout";

@Component({
    selector: "[logout]",
    templateUrl: "templates/login.html",
    directives: [
        ROUTER_DIRECTIVES
    ]
})

export class LoginComponent extends MainBaseComponent {
    constructor(private _nav:NavService,
                private _logout:LogoutService) {
        super(_nav);
        this._logout.post();
    }
}