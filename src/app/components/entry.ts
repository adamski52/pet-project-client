import {Component, Attribute} from "angular2/core";
import {FormControl} from "angular2/common";
import {ValidationService} from "../services/validation";

@Component({
    selector: '[entry]',
    inputs: ["label", "control"],
    outputs: ["ngFormControl"],
    template: `
        <div class="sb-entry-group">
            <label class="sb-entry-group-label">{{label}}</label>
            <span class="sb-entry-group-content">
                <ng-content></ng-content>
            </span>
            <span [ngClass]="getClass()">{{message}}</span>
        </div>
    `
})

export class EntryComponent {
    private status:string = "";
    private message:string = "";
    private _originalMessage:string = "";

    private updateErrors():void {
        this.message = ValidationService.getMessage(this.control);
        this.status = ValidationService.getStatus(this.control);
    }

    getClass() {
        let classList = {
            "sb-entry-group-message": true
        };

        switch(this.status) {
            case "warning":
            case "danger":
                classList["icon-exclamation-triangle"] = true;
                break;
            case "success":
                classList["icon-thumbs-up"] = true;
                break;
            default:
                break;
        }

        classList["sb-" + this.status] = true;

        return classList;
    }

    constructor() {}

    ngOnInit() {
        if(this.control) {
            this.control._parent.valueChanges.subscribe(
                value => this.updateErrors()
            );
            this.updateErrors();
        }
    }
}