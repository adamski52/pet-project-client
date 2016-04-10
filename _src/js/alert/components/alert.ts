import {Component, OnInit, NgZone} from 'angular2/core';
import {AlertService} from "../services/alert";
import {SecureService} from "../../secure/services/secure";
import {IAlert} from "../interfaces/alert";

@Component({
    selector: "alert",
    templateUrl: "templates/alert.html"
 })

export class AlertComponent {
    private messages: IAlert[] = [];
    private type: string;
    private visibility: string = "";
    private _hideTimeout;
    private _clearTimeout;
    private _prevResponse: boolean = false;

    constructor(private _alert: AlertService,
                private _zone:NgZone,
                private _secure:SecureService) {
    }

    ngOnInit() {
        this._alert.data$.subscribe(alert => this.onAlert(alert));
        this._secure.data$.subscribe(
            response => {
                response = !!response;
                if (response != this._prevResponse) {
                    if (response) {
                        this._alert.info("Switched to Secure Mode.");
                    }
                    else {
                        this._alert.info("Switched to Public Mode.");
                    }
                }
                this._prevResponse = response;
            }
        );
    }

    private onAlert(alert:IAlert): void {
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