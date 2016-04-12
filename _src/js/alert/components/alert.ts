import {Component, OnInit, NgZone} from 'angular2/core';
import {AlertService} from "../services/alert";

@Component({
    selector: "alert",
    templateUrl: "templates/alert.html"
 })

export class AlertComponent {
    private messages: Object[] = [];
    private visibility: string = "";
    private _hideTimeout:number;
    private _clearTimeout:number;

    constructor(private _alert: AlertService,
                private _zone:NgZone) {}

    ngOnInit() {
        this._alert.data$.subscribe(alert => this.onAlert(alert));
    }

    private onAlert(alert:Object): void {
        try {
            clearTimeout(this._hideTimeout);
            clearTimeout(this._clearTimeout);
        }
        catch(e){}

        this.messages.push(alert);
        this.visibility = "is-visible";
        this._zone.run(() => {
            this._hideTimeout = setTimeout(_ => {
                this.visibility = "";
            }, 2000);
            this._clearTimeout = setTimeout(_ => {
                this.messages = [];
            }, 3000);
        });
        
    }
}