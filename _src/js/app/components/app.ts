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
import {ModalService} from "../../modal/services/modal";
import {AlertService} from "../../alert/services/alert";
import {Toggler} from "../../toggler/components/toggler";
import {TogglerMenu} from "../../toggler/components/toggler-menu";
import {TogglerService} from "../../toggler/services/toggler";

import {CONSTANTS} from "../../constants";
import {APIService} from "../../api/services/api";

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
        TogglerMenu
    ],
    providers: [
        ModalService,
        AlertService,
        TogglerService,
        APIService
    ]
})

export class AppComponent {
    constructor(private _api: APIService) {
        this._api.get$.subscribe(response => this.onGet(response));
        this._api.fetch("http://localhost:8000/api/fake");
    }

    private onGet(response) {
        console.log("ON GET!!!!", response);
    }
}