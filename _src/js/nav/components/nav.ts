import {Component, OnInit, ElementRef} from 'angular2/core';
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
        "(window:resize)": "figureNav()",
        "[class.nav-fixed]": "isFixed",
        "[class.is-aware]": "isAware",
        "[class.is-authenticated]": "isAuthenticated"
    },
    directives: [Toggler, TogglerMenu]
})

export class NavComponent {
    private isFixed: boolean = true;
    private isAware: boolean = false;
    private isAuthenticated: boolean = false;
    private _enrollHeight: number = 0;
    private _accountHeight: number = 0;
    private _navHeight: number = 0;
    private _itemHeight: number = 0;

    constructor(private _toggler: TogglerService,
                private _alert:AlertService,
                private _element:ElementRef,
                private _logout:LogoutService,
                private _login:LoginService,
                private _user: UserService,
                private _secure:SecureService) {}

    ngOnInit() {
        this._enrollHeight = document.getElementById("enroll-menu").clientHeight;
        this._accountHeight = document.getElementById("account-menu").clientHeight;
        this._itemHeight = document.getElementById("nav-item").clientHeight;
        this._navHeight = this._element.nativeElement.clientHeight - this._enrollHeight - this._accountHeight + this._itemHeight;

        this._toggler.toggle("enroll-menu");
        this._toggler.toggle("nav-menu");



        this._user.data$.subscribe(
            response => {
                this.isAuthenticated = true;
                this.figureNav();
            }
        );

        this._logout.data$.subscribe(
            response => {
                this.isAuthenticated = false;
                this.figureNav();
            }
        );

        this.figureNav();
        this.isAware = true;
    }

    figureNav() {
        // can't use window height.  mobile counts virtual keyboards, so use a 100% height spy element
        if (this.isAuthenticated) {
            this.isFixed = document.getElementById("height-spy").clientHeight >= this._navHeight + this._accountHeight;
        }
        else {
            this.isFixed = document.getElementById("height-spy").clientHeight >= this._navHeight + this._enrollHeight;
        }
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