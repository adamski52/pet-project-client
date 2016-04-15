import {Observable} from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';
import 'rxjs/add/operator/share';

export class TogglerService {
    private _observer: Observer<Object>;
    public data$: Observable<Object>;

    constructor() {
        this.data$ = new Observable(observer => this._observer = observer).share();
    }

    public toggle(item) {
        this._observer.next({
            item: item,
            value: "toggle"
        });
    }

    public set(item, value) {
        this._observer.next({
            item: item,
            value: value
        });
    }
}