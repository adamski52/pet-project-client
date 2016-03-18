import {Observable} from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';
import {Injectable} from 'angular2/core';
import {IAlert} from "../../alert/interfaces/alert";

import 'rxjs/add/operator/share';

@Injectable()
export class AlertService {
    private _observer: Observer<IAlert>;
    public alert$: Observable<IAlert>;

    constructor() {
        this.alert$ = new Observable(observer => this._observer = observer).share();
    }

    public open(alert:IAlert) {
        this._observer.next(alert);
    }
}