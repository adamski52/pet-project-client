import {Component, OnInit} from 'angular2/core';
import {MainBaseComponent} from './main-base-component';
import {UserService} from "../services/user";
import {NavService} from "../services/nav";

@Component({
    selector: "[account]",
    templateUrl: "templates/account.html"
})

export class AccountComponent extends MainBaseComponent {
    private user: Object;

    constructor(private _user: UserService,
                private _nav:NavService) {
        super(_nav);
    }
    
    ngOnInit() {
        if (!this._user.isAuthenticated()) {
            return;
        }

        this.user = this._user.user;
    }
}