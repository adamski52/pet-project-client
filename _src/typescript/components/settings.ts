import {Component} from 'angular2/core';
import {MainBaseComponent} from './main-base-component';
import {NavService} from "../services/nav";

@Component({
    selector: "[settings]",
    templateUrl: "templates/settings.html"
})

export class SettingsComponent extends MainBaseComponent {
    constructor(private _nav:NavService) {
        super(_nav);
    }
}