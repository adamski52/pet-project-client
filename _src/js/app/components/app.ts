import {Component} from 'angular2/core';
import {NavComponent} from "../../nav/components/nav";
import {AboutComponent} from "../../about/components/about";
import {CollageComponent} from "../../collage/components/collage";
import {ContactComponent} from "../../contact/components/contact";
import {EnrollComponent} from "../../enroll/components/enroll";
import {IntroComponent} from "../../intro/components/intro";
import {ScheduleComponent} from "../../schedule/components/schedule";
import {ServicesComponent} from "../../services/components/services";
import {LivestreamComponent} from "../../livestream/components/livestream";
import {ModalComponent} from "../../modal/components/modal";
import {AlertComponent} from "../../alert/components/alert";
import {Toggler} from "../../toggler/components/toggler";
import {TogglerMenu} from "../../toggler/components/toggler-menu";
import {FriendsComponent} from "../../secure/components/friends";
import {MyselfComponent} from "../../secure/components/myself";
import {DogsComponent} from "../../secure/components/dogs";

import {API} from "../../app/lib/api";
import {Cookie} from "../../app/lib/cookie";

import {ModalService} from "../../modal/services/modal";
import {AlertService} from "../../alert/services/alert";
import {TogglerService} from "../../toggler/services/toggler";
import {CollageService} from "../../collage/services/collage";
import {LoginService} from "../../secure/services/login";
import {LogoutService} from "../../secure/services/logout";
import {UserService} from "../../secure/services/user";
import {SecureService} from "../../secure/services/secure";

import {CONSTANTS} from "../../constants";

@Component({
    selector: "storybook",
    templateUrl: "templates/app.html",
    directives: [
        NavComponent,
        AboutComponent,
        CollageComponent,
        ContactComponent,
        EnrollComponent,
        IntroComponent,
        ScheduleComponent,
        ServicesComponent,
        LivestreamComponent,
        ModalComponent,
        AlertComponent,
        Toggler,
        TogglerMenu,
        MyselfComponent,
        DogsComponent,
        FriendsComponent
    ],
    providers: [
        ModalService,
        AlertService,
        TogglerService,
        CollageService,
        LoginService,
        LogoutService,
        UserService,
        SecureService,
        
        API,
        Cookie
    ]
})

export class AppComponent {
    private showSecure: boolean = false;

    constructor(private _user:UserService,
                private _secure:SecureService,
                private _login: LoginService,
                private _logout: LogoutService,
                private _alert: AlertService) { }

    ngOnInit() {
        setTimeout(() => document.getElementById("initial-loader").classList.remove("is-visible"), 2000);
        setTimeout(() => document.getElementById("initial-loader").remove(), 3000);


        this._secure.data$.subscribe(
            response => {
                this.showSecure = !!response;
            }
        );

        // if the user logged in, this will capture it, and then gather the rest of their profile using _user
        this._login.data$.subscribe(
            response => {
                this._user.get();
            }
        );

        this._logout.data$.subscribe(
            response => {
                this._secure.close();
                this._alert.success("Logout successful.");
            }
        );

        // if the user is already loged in, the response from this should be other than [].
        this._user.data$.subscribe(
            response => {
                //this._zone.run(() => {
                    this._alert.success("Login successful.");
                    this._secure.open();
                //});
            }
        );

        this._secure.close();



        this._user.get();
    }
}