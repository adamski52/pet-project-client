/// <reference path="../../node_modules/angular2/typings/browser.d.ts" />
import {HTTP_PROVIDERS, BrowserXhr} from "angular2/http";
import {bootstrap} from "angular2/platform/browser";
import "rxjs/Rx";
import {Component, provide} from "angular2/core";
import {RouteConfig, RouterLink, AsyncRoute, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from "angular2/router";

// app-wide services
import {AlertService} from "./services/alert";
import {LoginService} from "./services/login";
import {LogoutService} from "./services/logout";
import {UserService} from "./services/user";
import {NavService} from "./services/nav";

import {AppComponent} from "./components/app";

// app-wide libs
import {API} from "./lib/api";
import {Cookie} from "./lib/cookie";
import {CORSBrowserXHR} from "./lib/cors-browser-xhr";




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
    UserService,
    NavService
]);
