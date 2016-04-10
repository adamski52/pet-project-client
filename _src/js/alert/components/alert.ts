import {Component, OnInit, NgZone} from 'angular2/core';
import {AlertService} from "../services/alert";
import {IAlert} from "../interfaces/alert";

@Component({
    selector: "alert",
    templateUrl: "templates/alert.html"
 })

export class AlertComponent {
    private message: string;
    private type: string;
    private visibility: string = "";

    constructor(private _service: AlertService, private _zone:NgZone) {
    }

    ngOnInit() {
        this._service.alert$.subscribe(alert => this.onAlert(alert));
    }

    private onAlert(alert:IAlert): void {
        console.log("ALERT >>", alert.type, alert.message);
        this.message = alert.message;
        this.type = alert.type;
        this.visibility = "visible";
        this._zone.run(() => {
            setTimeout(_ => this.visibility = "", 2000);
        });
        
    }
}