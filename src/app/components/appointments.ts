import {Component} from 'angular2/core';
import {MainBaseComponent} from './main-base-component';
import {NavService} from "../services/nav";

@Component({
    selector: "[appointments]",
    templateUrl: "templates/appointments.html"
})

export class AppointmentsComponent extends MainBaseComponent {
    constructor(private _nav:NavService) {
        super(_nav);
    }
}