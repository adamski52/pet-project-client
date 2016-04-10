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
import {SecureComponent} from "../../secure/components/secure";

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
        SecureComponent
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
    constructor() {
        
    }
}