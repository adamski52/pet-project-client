import {Component} from 'angular2/core';
import {ROUTER_DIRECTIVES} from "angular2/router";
import {HeroBaseComponent} from './hero-base-component';
import {NavService} from "../services/nav";

@Component({
    selector: "[home]",
    templateUrl: "templates/home.html",
    directives: [
        ROUTER_DIRECTIVES
    ]
})

export class HomeComponent extends HeroBaseComponent {
    constructor(private _nav:NavService) {
        super(_nav);
    }
}