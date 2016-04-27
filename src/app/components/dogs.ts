import {Component} from 'angular2/core';
import {MainBaseComponent} from './main-base-component';
import {NavService} from "../services/nav";

@Component({
    selector: "[dogs]",
    templateUrl: "templates/dogs.html"
})

export class DogsComponent extends MainBaseComponent {
    constructor(private _nav:NavService) {
        super(_nav);
    }
}