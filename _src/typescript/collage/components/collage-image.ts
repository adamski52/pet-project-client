import {Directive, Input} from 'angular2/core';
import {ModalService} from "../../modal/services/modal";

@Directive({
    selector: '[collage-image]',
    host: {
        '(click)': 'onClick()'
    }
})

export class CollageImage {
    @Input() image: Object;

    private subscription;

    constructor(private _modal: ModalService) {}

    onClick() { 
        this._modal.open(this.image);
    }
}
