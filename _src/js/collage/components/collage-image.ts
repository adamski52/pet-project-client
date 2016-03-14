import {Directive, Input} from 'angular2/core';
import {ModalService} from "../../modal/services/modal";
import {ICollageImage} from "../interfaces/collage-image";

@Directive({
    selector: '[collage-image]',
    host: {
        '(click)': 'onClick()'
    }
})

export class CollageImage {
    @Input() image: ICollageImage;

    private subscription;

    constructor(private _modalService: ModalService) {}

    onClick() { 
        this._modalService.open(this.image);
    }
}
