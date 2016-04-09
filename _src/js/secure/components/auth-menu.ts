import {Directive, Attribute} from 'angular2/core';
import {LoginService} from "../../secure/services/login";
import {LogoutService} from "../../secure/services/logout";
import {TogglerService} from "../../toggler/services/toggler";

@Directive({
    selector: "[authMenu]",
    host: {
        "[class.is-hidden]": "isHidden",
    }
})

export class AuthMenu {
    private isHidden: Boolean = false;
    private initial: string;

    constructor(private _login: LoginService,
                private _logout:LogoutService,
                private _toggler:TogglerService,
                @Attribute("initial") initial: string) {
        // we don't need to worry about re-checking the nav height.  scroll will do that.
        if(initial == "true") {
            this.isHidden = false;
            this._login.data$.subscribe(
                response => {
                    this._toggler.set("account-menu", false);
                    this._toggler.set("enroll-menu", false);
                    this.isHidden = true;
                }
            );

            this._logout.data$.subscribe(
                response => {
                    this._toggler.set("account-menu", false);
                    this._toggler.set("enroll-menu", false);
                    this.isHidden = false
                }
            );
        }
        else {
            this.isHidden = true;
            this._login.data$.subscribe(
                response => {
                    this._toggler.set("account-menu", false);
                    this._toggler.set("enroll-menu", false);
                    this.isHidden = false
                }
            );
            this._logout.data$.subscribe(
                response => {
                    this._toggler.set("account-menu", false);
                    this._toggler.set("enroll-menu", false);
                    this.isHidden = true
                }
            );
        }
    }
}