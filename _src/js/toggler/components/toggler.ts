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

        this._service.toggle(this.item);
    }

    constructor(private _service: TogglerService, @Attribute("item") item: string) {
        this.item = item;
    }
}