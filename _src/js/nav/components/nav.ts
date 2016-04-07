import {Component, OnInit, ElementRef} from 'angular2/core';
import {Toggler} from "../../toggler/components/toggler";
import {TogglerMenu} from "../../toggler/components/toggler-menu";
import {TogglerService} from "../../toggler/services/toggler";
import {LoginService} from "../../enroll/services/login";


@Component({
    selector: "nav",
    templateUrl: "templates/nav.html",
    host: {
        "(body:scroll)": "figureNav()",
        "(window:resize)": "figureNav()",
        "[class.nav-fixed]": "isFixed",
    },
    directives: [Toggler, TogglerMenu],
    providers: [TogglerService, LoginService]
})

export class NavComponent {
    private height: number = 0;
    private isFixed: boolean = true;
    private spy;

    constructor(private _toggler: TogglerService, private _element:ElementRef, private _login:LoginService) { }

    ngOnInit() {
        this.height = this._element.nativeElement.clientHeight;
        this.spy = document.getElementById("height-spy");
        this._toggler.toggle("enroll-menu");
        this._toggler.toggle("account-menu");
        this._toggler.toggle("nav-menu");
        this.figureNav();
    }

    figureNav() {
        // can't use window height.  mobile counts virtual keyboards, so use a 100% height spy element
        this.isFixed = this.spy.clientHeight >= this.height;
    }

    onLogin(e, username, password) {
        e.preventDefault();
        this._login.post({
            username,
            password
        }).subscribe(
            response => console.log("HOORAY!", response),
            error => console.log("FAIL FAIL", error)
        );
    }
}