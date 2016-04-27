import {Component, OnInit, NgZone} from 'angular2/core';
//import {NgFor} from "angular2/common";
import {AlertService} from "../services/alert";

@Component({
    selector: "[alert]",
    host: {
        "[class.is-visible]": "isVisible"
    },
    template: `<li *ngFor="#msg of messages" class="alert alert-{{msg.type}}">{{msg.message}}</li>`
})

export class AlertComponent {
    public messages: Object[] = [];
    public isVisible: boolean = false;
    private _hideTimeout:number;
    private _clearTimeout:number;

    constructor(private _alert: AlertService) {//,
                //private _zone:NgZone) {

        this._alert.data$.subscribe(alert => this.onAlert(alert));
    }

    private onAlert(alert:Object): void {
        try {
            clearTimeout(this._hideTimeout);
            clearTimeout(this._clearTimeout);
        }
        catch(e){}

        this.messages.push(alert);
        this.isVisible = true;

        //this._zone.run(() => {
            this._hideTimeout = setTimeout(_ => {
                this.isVisible = false;
            }, 2000);
            this._clearTimeout = setTimeout(_ => {
                this.messages = [];
            }, 3000);
        //});
    }
}