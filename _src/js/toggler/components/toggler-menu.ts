import {Directive, Attribute} from 'angular2/core';
import {TogglerService} from "../services/toggler";

@Directive({
    selector: "[togglerMenu]",
    host: {
        "[class.toggler-open]": "isOpen",
    }
})

export class TogglerMenu {
    private isOpen: Boolean = true;
    private subscription;
    private item: string;

    toggle(item) {
        console.log("TOGGLE HEARD", item, this.item);
        if (item == this.item) {
            this.isOpen = !this.isOpen;    
        }
    }

    constructor(private _service: TogglerService, @Attribute("item") item: string) {
        this.item = item;
        this.subscription = this._service.toggled$.subscribe((item) => this.toggle(item));
    }
}