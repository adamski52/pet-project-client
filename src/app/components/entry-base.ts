import {Component, Attribute} from "angular2/core";
import {FormControl} from "angular2/common";

@Component({
    selector: 'entry',
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

export class EntryBaseComponent {
    private status:string = "";
    private message:string = "";


    // TODO:  Make this recursive.
    private updateErrors():void {
        if(this.control._parent && this.control._parent.errors) {
            this.status = "warning";
            this.message = Object.keys(this.control._parent.errors)[0];

            let numErrors = Object.keys(this.control._parent.errors).length;
            if(numErrors > 1) {
                this.message = numErrors;
            }

            return;
        }

        if(this.control.pristine) {
            this.status = "success";
            this.message = "Optional";

            if(!this.control.valid) {
                this.status = "";
                this.message = "Required";
            }
            
            return;
        }


        let numErrors = this.control.errors ? Object.keys(this.control.errors).length : 0;

        if(numErrors > 0) {
            this.status = "danger";
            this.message = Object.keys(this.control.errors)[0];

            if(numErrors > 1) {
                this.message = numErrors;
            }

            return;
        }
    
        this.status = "success";
        this.message = "OK";
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
        this.control._parent.valueChanges.subscribe(
            value => this.updateErrors()
        );
        this.updateErrors();
    }
}