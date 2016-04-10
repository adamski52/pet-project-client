import {Component} from 'angular2/core';


@Component({
    selector: "friends",
    templateUrl: "templates/friends.html"
})

export class FriendsComponent {
    constructor() { 
        console.log("FRIENDS");
    }
}