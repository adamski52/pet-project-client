import {Observable} from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';
import {Injectable} from 'angular2/core';
import {CONSTANTS} from "../lib/constants";
import 'rxjs/add/operator/share';

@Injectable()
export class AlertService {
    private _observer: Observer<Object>;
    public data$: Observable<Object>;

    constructor() {
        this.data$ = new Observable(observer => {
            this._observer = observer
        }).share();
    }

    public success(message:string) {
        this._observer.next({
            type: CONSTANTS.ALERT_TYPES.SUCCESS,
            message: message
        });
    }

    public error(message:string) {
        this._observer.next({
            type: CONSTANTS.ALERT_TYPES.ERROR,
            message: message
        });
    }

    public info(message:string) {
        this._observer.next({
            type: CONSTANTS.ALERT_TYPES.INFO,
            message: message
        });
    }

    public warning(message:string) {
        this._observer.next({
            type: CONSTANTS.ALERT_TYPES.WARNING,
            message: message
        });
    }
}