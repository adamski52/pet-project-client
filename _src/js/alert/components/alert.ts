import {Component} from 'angular2/core';
import {AlertService} from "../services/alert";
import {IAlert} from "../interfaces/alert";

@Component({
    selector: "alert",
    templateUrl: "templates/alert.html"
 })

export class AlertComponent {
    private subscription;
    private message: string;
    private type: string;
    private visibility: string;

    constructor(private _service: AlertService) {
        this.subscription = this._service.alert$.subscribe(alert => this.onAlert(alert));
    }

    private onAlert(alert:IAlert): void {
        this.message = alert.message;
        this.type = alert.type;
        this.visibility = "visible";
        setTimeout(_ => this.visibility = "", 2000);          
    }
}