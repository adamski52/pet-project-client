import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from 'angular2/router';

import {IntroComponent} from "../../intro/components/intro";
import {AboutComponent} from "../../about/components/about";
import {ServicesComponent} from "../../services/components/services";
import {WatchComponent} from "../../watch/components/watch";
import {EnrollComponent} from "../../enroll/components/enroll";
import {ScheduleComponent} from "../../schedule/components/schedule";
import {ContactComponent} from "../../contact/components/contact";

@Component({
    selector: "storybook",
    template: `
        <nav>
            <a [routerLink]="['About']" class="about icon-paw">About</a>
            <a [routerLink]="['Services']" class="services icon-paw">Services</a>
            <a [routerLink]="['Watch']" class="watch icon-paw">Watch</a>
            <a [routerLink]="['Enroll']" class="enroll icon-paw">Enroll</a>
            <a [routerLink]="['Schedule']" class="schedule icon-paw">Schedule</a>
            <a [routerLink]="['Contact']" class="contact icon-paw">Contact</a>
        </nav>
        <router-outlet></router-outlet>
    `,
    directives: [
        ROUTER_DIRECTIVES
    ],
    providers: [
        ROUTER_PROVIDERS
    ]
})

@RouteConfig([
    { path: '/intro', name: 'Intro', component: IntroComponent, useAsDefault: true },
    { path: '/about', name: 'About', component: AboutComponent },
    { path: '/services', name: 'Services', component: ServicesComponent },
    { path: '/watch', name: 'Watch', component: WatchComponent },
    { path: '/enroll', name: 'Enroll', component: EnrollComponent },
    { path: '/schedule', name: 'Schedule', component: ScheduleComponent },
    { path: '/contact', name: 'Contact', component: ContactComponent }
])
export class AppComponent {}