import {Component, OnInit} from 'angular2/core';
import {UserService} from "../services/user";

@Component({
    selector: "[account]",
    templateUrl: "templates/account.html"
})

export class AccountComponent {
    private user: Object;

    constructor(private _user: UserService) {}
    
    ngOnInit() {
        if (!this._user.isAuthenticated()) {
            return;
        }

        this.user = this._user.user;
    }
}