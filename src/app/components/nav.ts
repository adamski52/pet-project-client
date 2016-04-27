import {Component} from 'angular2/core';
import {RouterLink} from "angular2/router";
import {LoginService} from "../services/login";
import {LogoutService} from "../services/logout";
import {UserService} from "../services/user";
import {AlertService} from "../services/alert";
import {NavService} from "../services/nav";

@Component({
    selector: "[nav]",
    templateUrl: "templates/nav.html",
    host: {
        "[class.nav-hero]": "_state.isHeroMode",
        "[class.nav-main]": "!_state.isHeroMode",
        "[class.offscreen-left-visible]": "_state.isLeftOpen",
        "[class.offscreen-right-visible]": "_state.isRightOpen"
    },
    directives: [
        RouterLink
    ]
})

export class NavComponent {
    private isAuthenticated: boolean = false;
    private _state:Object;

    constructor(private _alert:AlertService,
                private _logout:LogoutService,
                private _login:LoginService,
                private _user: UserService,
                private _nav:NavService) {

        this._user.data$.subscribe(
            response => {
                this.isAuthenticated = true;
            }
        );

        this._logout.data$.subscribe(
            response => {
                this.isAuthenticated = false;
            }
        );

        this._nav.data$.subscribe(
            response => {
                this._state = response;
            }
        );

        this._nav.get();
    }

    setLeft(isOpen:boolean) {
        this._nav.setLeft(isOpen);        
    }

    setRight(isOpen:boolean) {
        this._nav.setRight(isOpen);
    }

    toggleLeft(e) {
        if (e) {
            e.preventDefault();
        }

        this._nav.toggleLeft();
    }

    toggleRight(e) {
        if (e) {
            e.preventDefault();
        }

        this._nav.toggleRight();
    }

    onLogin(username:string, password:string, e?:Event) {
        if (e) {
            e.preventDefault();
        }

        console.log(username, password);

        this._login.post({
            username,
            password
        });
    }
}