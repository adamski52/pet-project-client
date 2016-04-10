import {Injectable} from 'angular2/core';
import {Observable} from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';

@Injectable()
export class SecureService {
    private _observer: Observer<boolean>;
    private _isOpen: boolean = false;
    public data$ = new Observable(observer => this._observer = observer).share();

    constructor() {}

    open() {
        this._isOpen = true;
        this._observer.next(this._isOpen);
    }

    close() {
        this._isOpen = false;
        this._observer.next(this._isOpen);
    }

    toggle() {
        this._isOpen = !this._isOpen;
        this._observer.next(this._isOpen);
    }
}