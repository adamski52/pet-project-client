import {Component, OnInit, ElementRef, NgZone} from 'angular2/core';
import {Toggler} from "../../toggler/components/toggler";
import {TogglerMenu} from "../../toggler/components/toggler-menu";
import {TogglerService} from "../../toggler/services/toggler";
import {SecureService} from "../../secure/services/secure";
import {LoginService} from "../../secure/services/login";
import {LogoutService} from "../../secure/services/logout";
import {UserService} from "../../secure/services/user";
import {AlertService} from "../../alert/services/alert";

@Component({
    selector: "nav",
    templateUrl: "templates/nav.html",
    host: {
        "(body:scroll)": "figureNav()",
        "(window:resize)": "figureNav()",
        "[class.nav-fixed]": "isFixed",
        "[class.is-authenticated]": "isAuthenticated"
    },
    directives: [Toggler, TogglerMenu]
})

export class NavComponent {
    private isFixed: boolean = true;
    private isAuthenticated: boolean = false;

    constructor(private _toggler: TogglerService,
                private _alert:AlertService,
                private _element:ElementRef,
                private _logout:LogoutService,
                private _login:LoginService,
                private _user: UserService,
                private _secure:SecureService,
                private _zone:NgZone) {}

    ngOnInit() {
        this._toggler.toggle("enroll-menu");
        //this._toggler.toggle("account-menu");
        this._toggler.toggle("nav-menu");
        //this._toggler.toggle("secure-content");

        this._secure.data$.subscribe(
            response => {
                this.isAuthenticated = !!response;
            },
            error => { }
        );

        this.figureNav();

    }

    figureNav() {
        // can't use window height.  mobile counts virtual keyboards, so use a 100% height spy element
        let height = this._element.nativeElement.clientHeight;
        let spy = document.getElementById("height-spy");

        this.isFixed = spy.clientHeight >= height;
    }

    onPublicClick(e?:Event) {
        this._secure.close();
    }

    onSecureClick(e?: Event) {
        this._secure.open();
    }

    onLogin(username:string, password:string, e?:Event) {
        if (e) {
            e.preventDefault();
        }

        this._login.post({
            username,
            password
        });
    }

    onLogout(e?:Event) {
        if (e) {
            e.preventDefault();
        }

        this._logout.post();
    }
}