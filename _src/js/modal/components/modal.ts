import {Component} from 'angular2/core';
import {ModalService} from "../services/modal";
import {ICollageImage} from "../../collage/interfaces/collage-image";

@Component({
    selector: "modal",
    templateUrl: "templates/modal.html",
    host: {
        "(click)": "onClosed()"
    }
 })

export class ModalComponent {
    private url: string;
    private subscription;
    public isOpen: boolean;

    constructor(private _service: ModalService) {
        this.subscription = this._service.opened$.subscribe(image => this.onOpened(image));
        this.isOpen = false;
    }

    private onOpened(image:ICollageImage): void {
        this.url = image.full;
        this.isOpen = true;
    }

    private onClosed(): void {
        this.isOpen = false;
    }
}