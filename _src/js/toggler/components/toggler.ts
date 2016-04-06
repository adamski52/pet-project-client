import {Directive, Attribute} from 'angular2/core';
import {TogglerService} from "../services/toggler";
import {VerifyService} from "../../api/services/verify";

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

    constructor(private _service: TogglerService, private _verify: VerifyService, @Attribute("item") item: string) {
        this.item = item;
    }
}