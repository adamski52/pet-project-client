import {Injectable} from 'angular2/core';
import {Observable} from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';

@Injectable()
export class NavService {
    private _observer: Observer<Object>;
    private _state:Object = {
        isLeftOpen: false,
        isRightOpen: false,
        isHeroMode: true
    };

    public data$ = new Observable(observer => this._observer = observer).share();

    constructor() {}

    setHero(is:boolean) {
        this._state.isHeroMode = is;
        this._observer.next(this._state);
    }

    setLeft(is:boolean) {
        this._state.isLeftOpen = is;
        if(is) {
            this._state.isRightOpen = false;
        }
        this._observer.next(this._state);
    }

    setRight(is:boolean) {
        this._state.isRightOpen = is;
        if(is) {
            this._state.isLeftOpen = false;
        }
        this._observer.next(this._state);
    }

    toggleLeft() {
        this.setLeft(!this._state.isLeftOpen);
    }

    toggleRight() {
        this.setRight(!this._state.isRightOpen);
    }

    get() {
        this._observer.next(this._state);
    }
}