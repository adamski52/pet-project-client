import {Observable} from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';
import {ICollageImage} from "../../collage/interfaces/collage-image";

import 'rxjs/add/operator/share';

export class ModalService {
    private _observer: Observer<ICollageImage>;
    public opened$: Observable<ICollageImage>;

    constructor() {
        this.opened$ = new Observable(observer => this._observer = observer).share();
    }

    public open(image:ICollageImage) {
        this._observer.next(image);
    }
}