import {Component} from 'angular2/core';
import {ROUTER_DIRECTIVES} from "angular2/router";

@Component({
    selector: "[home]",
    templateUrl: "templates/home.html",
    directives: [
        ROUTER_DIRECTIVES
    ]
})

export class HomeComponent {
    constructor() {
        console.log("HOME READY");
    }
}