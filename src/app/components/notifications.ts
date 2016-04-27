import {Component} from 'angular2/core';
import {MainBaseComponent} from './main-base-component';
import {NavService} from "../services/nav";

@Component({
    selector: "[notifications]",
    templateUrl: "templates/notifications.html"
})

export class NotificationsComponent extends MainBaseComponent {
    constructor(private _nav:NavService) {
        super(_nav);
    }
}