import {Component, OnInit} from 'angular2/core';
import {UserService} from "../services/user";

@Component({
    selector: "[dogs]",
    templateUrl: "templates/secure/dogs.html"
})

export class DogsComponent {
    private user: Object;

    constructor(private _user: UserService) { }

    ngOnInit() {
        if (!this._user.isAuthenticated()) {
            return;
        }

        this.user = this._user.user;

        console.log("DOGS");
    }
}