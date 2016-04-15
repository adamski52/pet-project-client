import {RouterLink} from 'angular2/router';
import {Component, OnInit, ElementRef} from 'angular2/core';
import {TogglerComponent} from "../../toggler/components/toggler";
import {TogglerMenuComponent} from "../../toggler/components/toggler-menu";
import {TogglerService} from "../../toggler/services/toggler";
import {LoginService} from "../../secure/services/login";
import {LogoutService} from "../../secure/services/logout";
import {UserService} from "../../secure/services/user";
import {AlertService} from "../../alert/services/alert";

@Component({
    selector: "nav",
    templateUrl: "templates/nav.html",
    host: {
        "[class.is-authenticated]": "isAuthenticated"
    },
    directives: [
        RouterLink,
        TogglerMenuComponent,
        TogglerComponent
    ]
})

export class NavComponent {
    private isAuthenticated: boolean = false;

    constructor(private _toggler: TogglerService,
                private _alert:AlertService,
                private _element:ElementRef,
                private _logout:LogoutService,
                private _login:LoginService,
                private _user: UserService) {

        this._user.data$.subscribe(
            response => {
                this.isAuthenticated = true;
                console.log("NAV HEARD", this.isAuthenticated);
            }
        );

        this._logout.data$.subscribe(
            response => {
                this.isAuthenticated = false;
                this.onNavClick();
            }
        );
    }

    ngOnInit() {
        this._toggler.toggle("enroll-menu");
        this._toggler.toggle("nav-menu");
    }

    onNavClick(e?) {
       if(e) {
           e.preventDefault();
       }

       this._toggler.set("nav-menu", false);
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