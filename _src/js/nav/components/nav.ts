import {Component, OnInit, ElementRef} from 'angular2/core';
import {Toggler} from "../../toggler/components/toggler";
import {TogglerMenu} from "../../toggler/components/toggler-menu";
import {TogglerService} from "../../toggler/services/toggler";

@Component({
    selector: "nav",
    templateUrl: "templates/nav.html",
    host: {
        "(body:scroll)": "figureNav()",
        "(window:resize)": "figureNav()",
        "[class.nav-fixed]": "isFixed",
    },
    directives: [Toggler, TogglerMenu],
    providers: [TogglerService]
})

export class NavComponent {
    private height: number = 0;
    private isFixed: boolean = true;
    constructor(private _service: TogglerService, private _element:ElementRef) { }

    ngOnInit() {
        this.height = this._element.nativeElement.clientHeight;
        this._service.toggle("enroll-menu");
        this._service.toggle("account-menu");
        this._service.toggle("nav-menu");
        this.figureNav();
    }

    figureNav() {
        this.isFixed = window.innerHeight >= this.height;
    }
}