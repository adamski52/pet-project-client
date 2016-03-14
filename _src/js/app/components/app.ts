import {Component} from 'angular2/core';
import {AboutComponent} from "../../about/components/about";
import {CollageComponent} from "../../collage/components/collage";
import {ContactComponent} from "../../contact/components/contact";
import {EnrollComponent} from "../../enroll/components/enroll";
import {IntroComponent} from "../../intro/components/intro";
import {ScheduleComponent} from "../../schedule/components/schedule";
import {ServicesComponent} from "../../services/components/services";
import {WatchComponent} from "../../watch/components/watch";
import {ModalComponent} from "../../modal/components/modal";
import {ModalService} from "../../modal/services/modal";

@Component({
    selector: "storybook",
    templateUrl: "templates/app.html",
    directives: [
        AboutComponent,
        CollageComponent,
        ContactComponent,
        EnrollComponent,
        IntroComponent,
        ScheduleComponent,
        ServicesComponent,
        WatchComponent,
        ModalComponent
    ],
    providers: [ModalService]
})

export class AppComponent {}