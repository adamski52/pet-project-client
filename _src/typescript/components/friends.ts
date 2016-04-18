import {Component, OnInit} from 'angular2/core';
import {UserService} from "../services/user";

@Component({
    selector: "[friends]",
    templateUrl: "templates/secure/friends.html"
})

export class FriendsComponent {
    private user: Object;

    constructor(private _user: UserService) { }

    ngOnInit() {
        if (!this._user.isAuthenticated()) {
            return;
        }

        this.user = this._user.user;

        console.log("FRIENDS");
    }
}