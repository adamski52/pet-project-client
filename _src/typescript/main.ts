/// <reference path="../../node_modules/angular2/typings/browser.d.ts" />

import {HTTP_PROVIDERS, BrowserXhr} from "angular2/http";
import {bootstrap} from "angular2/platform/browser";
import "rxjs/Rx";
import {Component, provide} from "angular2/core";
import {RouteConfig, RouterLink, AsyncRoute, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from "angular2/router";

// lazy
import {ComponentHelper} from "./lib/component-helper";

// app-wide services
import {AlertService} from "./services/alert";
import {LoginService} from "./services/login";
import {LogoutService} from "./services/logout";
import {UserService} from "./services/user";

import {HomeComponent} from "./components/home";

// app-wide libs
import {API} from "./lib/api";
import {Cookie} from "./lib/cookie";
import {CORSBrowserXHR} from "./lib/cors-browser-xhr";


// main app component
@Component({
    selector: "[storybook]",
    templateUrl: "templates/app.html",
    directives: [
        ROUTER_DIRECTIVES
    ]
})


@RouteConfig(
    [
        {
            path: "/",
            name: "Home",
            component: HomeComponent,
            useAsDefault: true
        },
        new AsyncRoute({
            path: '/about-us',
            name: "AboutUs",
            loader: () => ComponentHelper.LoadComponentAsync('AboutUsComponent','./js/components/about-us')
        }),
        new AsyncRoute({
            path: '/sign-up',
            name: "SignUp",
            loader: () => ComponentHelper.LoadComponentAsync('SignUpComponent','./js/components/sign-up')
        }),
        new AsyncRoute({
            path: '/contact-us',
            name: "ContactUs",
            loader: () => ComponentHelper.LoadComponentAsync('ContactUsComponent','./js/components/contact-us')
        })
    ]
)

export class AppComponent {
    constructor() {
        console.log("APP READY");
    }
}

bootstrap(AppComponent, [
    HTTP_PROVIDERS,
    ROUTER_PROVIDERS,
    provide(BrowserXhr, {
        useClass: CORSBrowserXHR
    }),
    API,
    Cookie,
    AlertService,
    LoginService,
    LogoutService,
    UserService
]);
