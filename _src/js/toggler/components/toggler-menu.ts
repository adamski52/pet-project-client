import {Directive, Attribute} from 'angular2/core';
import {TogglerService} from "../services/toggler";

@Directive({
    selector: "[togglerMenu]",
    host: {
        "[class.toggler-open]": "isOpen",
    }
})

export class TogglerMenuComponent {
    private isOpen: boolean = true;
    private item: string;

    toggle(item) {
        if (item == this.item) {
            this.isOpen = !this.isOpen;    
        }
    }

    set(item, value:boolean) {
        if(item == this.item) {
            this.isOpen = value;
        }
    }

    constructor(private _toggler: TogglerService, @Attribute("item") item: string) {
        this.item = item;
        this._toggler.data$.subscribe(
            obj => {
                if (obj.value == "toggle") {
                    this.toggle(obj.item);
                }
                else {
                    this.set(obj.item, obj.value);
                }
            }
        );
    }
}