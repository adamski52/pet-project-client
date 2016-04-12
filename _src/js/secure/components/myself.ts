import {Component} from 'angular2/core';


@Component({
    selector: "myself",
    templateUrl: "templates/secure/myself.html"
})

export class MyselfComponent {
    constructor() { 
        console.log("MYSELF");
    }
}