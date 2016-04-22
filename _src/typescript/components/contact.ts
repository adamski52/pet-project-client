import {Component} from 'angular2/core';
import {MainBaseComponent} from './main-base-component';
import {NavService} from "../services/nav";

@Component({
    selector: "[contact]",
    templateUrl: "templates/contact.html"
})

export class ContactComponent extends MainBaseComponent {
    constructor(private _nav:NavService) {
        super(_nav);
    }
}