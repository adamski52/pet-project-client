import {Component} from 'angular2/core';
import {MainBaseComponent} from './main-base-component';
import {NavService} from "../services/nav";

@Component({
    selector: "[about]",
    templateUrl: "templates/about.html",
})

export class AboutComponent extends MainBaseComponent {
    constructor(private _nav:NavService) {
        super(_nav);
    }
}