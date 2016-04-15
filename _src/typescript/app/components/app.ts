import {Component, OnInit} from 'angular2/core';
import {RouteConfig, Router, RouterLink, RouterOutlet} from 'angular2/router';

import {NavComponent} from "../../nav/components/nav";
import {IntroComponent} from "../../intro/components/intro";
import {AboutComponent} from "../../about/components/about";
import {AccountComponent} from "../../secure/components/account";
import {ContactComponent} from "../../contact/components/contact";
import {EnrollComponent} from "../../enroll/components/enroll";
import {ScheduleComponent} from "../../schedule/components/schedule";
import {ServicesComponent} from "../../services/components/services";
import {LivestreamComponent} from "../../livestream/components/livestream";
import {AlertComponent} from "../../alert/components/alert";
import {FriendsComponent} from "../../secure/components/friends";
import {MyselfComponent} from "../../secure/components/myself";
import {DogsComponent} from "../../secure/components/dogs";
import {ModalComponent} from "../../modal/components/modal";
import {TogglerComponent} from "../../toggler/components/toggler";
import {TogglerMenuComponent} from "../../toggler/components/toggler-menu";

import {ModalService} from "../../modal/services/modal";
import {AlertService} from "../../alert/services/alert";
import {TogglerService} from "../../toggler/services/toggler";
import {LoginService} from "../../secure/services/login";
import {LogoutService} from "../../secure/services/logout";
import {UserService} from "../../secure/services/user";


import {API} from "../../app/lib/api";
import {Cookie} from "../../app/lib/cookie";
import {CONSTANTS} from "../../constants";


@Component({
    selector: "[storybook]",
    templateUrl: "templates/app.html",
    directives: [
        NavComponent,
        IntroComponent,
        AlertComponent,
        ModalComponent,
        TogglerComponent,
        TogglerMenuComponent,
        AboutComponent,
        AccountComponent,
        ContactComponent,
        EnrollComponent,
        ScheduleComponent,
        ServicesComponent,
        LivestreamComponent,
        MyselfComponent,
        DogsComponent,
        FriendsComponent,
        RouterOutlet
    ],
    providers: [
        RouterLink,
        TogglerService,
        ModalService,
        AlertService,
        LoginService,
        LogoutService,
        UserService,
        
        API,
        Cookie
    ]
})

@RouteConfig(
    [
        {
            path: "/",
            name: "Home",
            component: IntroComponent
        }, 
        {
            path: "/about",
            name: "About",
            component: AboutComponent
        },
        {
            path: "/contact",
            name: "Contact",
            component: ContactComponent
        },
        {
            path: "/enroll",
            name: "Enroll",
            component: EnrollComponent
        },
        {
            path: "/livestream",
            name: "Livestream",
            component: LivestreamComponent
        },
        {
            path: "/schedule",
            name: "Schedule",
            component: ScheduleComponent
        },
        {
            path: "/account",
            name: "Account",
            component: AccountComponent
        },
        {
            path: "/account/myself",
            name: "Myself",
            component: MyselfComponent
        },
        {
            path: "/account/my-dogs",
            name: "Dogs",
            component: DogsComponent
        },
        {
            path: "/account/friends-and-family",
            name: "Friends",
            component: FriendsComponent
        },
        {
            path: "/services",
            name: "Services",
            component: ServicesComponent
        }
    ]
)

export class AppComponent {
    constructor(private _user:UserService,
                private _login: LoginService,
                private _logout: LogoutService,
                private _alert: AlertService,
                private _router:Router) {}

    ngOnInit() {

        // if the user logged in, this will capture it, and then gather the rest of their profile using _user
        this._login.data$.subscribe(
            response => {
                this._alert.success("Login successful.");
                this._user.get();
            }
        );

        this._logout.data$.subscribe(
            response => {
                this._alert.success("Logout successful.");
                this._router.navigate(["Home"]);
            }
        );

        // if the user is already logged in, the response from this should be other than [].
        this._user.data$.subscribe(
            response => {
                this._router.navigate(["Account"]);
            }
        );

        this._user.get();
    
        setTimeout(() => document.getElementById("initial-loader").classList.remove("is-visible"), 2000);
        setTimeout(() => document.getElementById("initial-loader").remove(), 3000);
    }
}