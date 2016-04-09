import {Component, OnInit, ElementRef} from 'angular2/core';
import {Toggler} from "../../toggler/components/toggler";
import {TogglerMenu} from "../../toggler/components/toggler-menu";
import {TogglerService} from "../../toggler/services/toggler";
import {LoginService} from "../../secure/services/login";
import {AlertService} from "../../alert/services/alert";
import {AuthMenu} from "../../secure/components/auth-menu";
import {LogoutService} from "../../secure/services/logout";


@Component({
    selector: "nav",
    templateUrl: "templates/nav.html",
    host: {
        "(body:scroll)": "figureNav()",
        "(window:resize)": "figureNav()",
        "[class.nav-fixed]": "isFixed"
    },
    directives: [Toggler, TogglerMenu, AuthMenu]
})

export class NavComponent {
    private isFixed: boolean = true;

    constructor(private _toggler: TogglerService, private _alert:AlertService, private _element:ElementRef, private _logout:LogoutService, private _login:LoginService) {}

    ngOnInit() {
        this._toggler.toggle("enroll-menu");
        this._toggler.toggle("account-menu");
        this._toggler.toggle("nav-menu");
        this.figureNav();
    }

    figureNav() {
        // can't use window height.  mobile counts virtual keyboards, so use a 100% height spy element
        let height = this._element.nativeElement.clientHeight;
        let spy = document.getElementById("height-spy");

        this.isFixed = spy.clientHeight >= height;
        console.log("isFixed?", this.isFixed);
    }

    onLogin(e, username, password) {
        e.preventDefault();
        this._login.post({
            username,
            password
        });
    }

    onLogout(e) {
        e.preventDefault();
        this._logout.post();
    }
}