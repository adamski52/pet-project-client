import {Component} from 'angular2/core';
import {ModalService} from "../services/modal";

@Component({
    selector: "[modal]",
    templateUrl: "templates/modal.html",
    host: {
        "(click)": "onClosed()"
    }
 })

export class ModalComponent {
    private url: string;
    public isOpen: boolean;

    constructor(private _service: ModalService) {
        this._service.opened$.subscribe(image => this.onOpened(image));
        this.isOpen = false;
    }

    private onOpened(image:Object): void {
        this.url = image.full;
        this.isOpen = true;
    }

    private onClosed(): void {
        this.isOpen = false;
    }
}