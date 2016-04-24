import {Component} from 'angular2/core';
import {MainBaseComponent} from './main-base-component';
import {NavService} from "../services/nav";

@Component({
    selector: "[profile]",
    templateUrl: "templates/profile.html"
})

export class ProfileComponent extends MainBaseComponent {
    constructor(private _nav:NavService) {
        super(_nav);
    }
}