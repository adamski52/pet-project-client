import {Observable} from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';
import 'rxjs/add/operator/share';

export class TogglerService {
    private _observer: Observer<String>;
    public toggled$: Observable<String>;

    constructor() {
        this.toggled$ = new Observable(observer => this._observer = observer).share();
    }

    public toggle(item) {
        this._observer.next(item);
    }
}