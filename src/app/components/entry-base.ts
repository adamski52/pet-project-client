import {Component, Attribute} from "angular2/core";
import {FormControl} from "angular2/common";

@Component({
    selector: 'entry',
    inputs: ["label", "control"],
    outputs: ["ngFormControl"],
    template: `
        <div class="input-group sb-entry-group">
            <label class="input-group-addon sb-entry-group-label">{{label}}</label>
            <ng-content></ng-content>
            <span [ngClass]="getClass()">
                <span class="sb-toggle-content icon-{{icon}}">{{message}}</span>
            </span>
        </div>
    `
})

export class EntryBaseComponent {
    private icon:string = "";
    private status:string = "";
    private message:string = "";


    // TODO:  Make this recursive.
    private updateErrors():void {
        if(this.control._parent && this.control._parent.errors) {
            this.icon = "exclamation-triangle";
            this.status = "warning";

            let numErrors = Object.keys(this.control._parent.errors).length;

            if(numErrors > 1) {
                this.message = numErrors;
                return;
            }

            this.icon = "exclamation-triangle";
            this.status = "warning";
            this.message = Object.keys(this.control._parent.errors)[0];
            this.isOpen = true;
            return;
        }

        if(this.control.pristine) {
            if(!this.control.valid) {
                this.icon = "asterisk";
                this.status = "";
                this.message = "Required";
                this.isOpen = true;
                return;
            }

            this.icon = "thumbs-up";
            this.status = "success";
            this.message = "Optional";
            this.isOpen = true;
            return;
        }


        let numErrors = this.control.errors ? Object.keys(this.control.errors).length : 0;

        if(numErrors > 0) {
            this.icon = "exclamation-triangle";
            this.status = "danger";
            this.isOpen = true;
            
            if(numErrors > 1) {
                this.message = numErrors;
                return;
            }

            this.message = Object.keys(this.control.errors)[0];

            return;
        }
    
        this.icon = "thumbs-up";
        this.status = "success";
        this.message = "OK";
        this.isOpen = false;
    }

    getClass() {
        return {
            "sb-toggle-x-off": !this.isOpen,
            "input-group-addon": true,
            "sb-success": this.status == "success",
            "sb-danger": this.status == "danger",
            "sb-info": this.status == "info",
            "sb-warning": this.status == "warning",
            "sb-toggle": true,
            "sb-toggle-x": true
        };
    }

    constructor() {}

    ngOnInit() {
        this.control._parent.valueChanges.subscribe(
            value => this.updateErrors()
        );
        this.updateErrors();

        console.log(this.label, this.control);
    }
}