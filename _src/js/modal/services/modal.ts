import {Observable} from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';

import 'rxjs/add/operator/share';

export class ModalService {
    private _observer: Observer<Object>;
    public opened$: Observable<Object>;

    constructor() {
        this.opened$ = new Observable(observer => this._observer = observer).share();
    }

    public open(image:Object) {
        this._observer.next(image);
    }
}