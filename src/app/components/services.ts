import {Component} from 'angular2/core';
import {MainBaseComponent} from './main-base-component';
import {NavService} from "../services/nav";

@Component({
    selector: "[services]",
    templateUrl: "templates/services.html"
})

export class ServicesComponent extends MainBaseComponent {
    constructor(private _nav:NavService) {
        super(_nav);
    }
}