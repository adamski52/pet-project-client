import {Directive, Attribute} from 'angular2/core';
import {TogglerService} from "../services/toggler";

@Directive({
    selector: "[toggler]",
    host: {
        "(click)": "toggle($event)"
    }
})

export class Toggler {
    private item: string;

    toggle(e) {
        e.preventDefault();

        this._toggle.toggle(this.item);
    }

    set(value:boolean) {
        this._toggle.set(this.item, value);
    }

    constructor(private _toggle: TogglerService, @Attribute("item") item: string) {
        this.item = item;
    }
}