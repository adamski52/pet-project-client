import {Observable} from 'rxjs/Observable';
import {ICollageImage} from "../../collage/interfaces/collage";

import 'rxjs/add/operator/share';

export class ModalService {
    private _observer: Observer;
    public opened$: Observable<string>;

    constructor() {
        this.opened$ = new Observable(observer => this._observer = observer).share();
    }

    public open(image:ICollageImage) {
        this._observer.next(image);
    }
}