import {Component} from "angular2/core";
import {RouteConfig, AsyncRoute, ROUTER_DIRECTIVES} from "angular2/router";
import {ComponentHelper} from "../lib/component-helper";
import {NavComponent} from "./nav";
import {NavService} from "../services/nav";

@Component({
    selector: "[storybook]",
    templateUrl: "templates/app.html",
    directives: [
        ROUTER_DIRECTIVES,
        NavComponent
    ]
})


@RouteConfig(
    [
        new AsyncRoute({
            path: '/',
            name: "Home",
            useAsDefault: true,
            loader: () => ComponentHelper.LoadComponentAsync('HomeComponent','./js/components/home')
        }),
        new AsyncRoute({
            path: '/about-us',
            name: "About",
            loader: () => ComponentHelper.LoadComponentAsync('AboutComponent','./js/components/about')
        }),
        new AsyncRoute({
            path: '/my-account',
            name: "Account",
            loader: () => ComponentHelper.LoadComponentAsync('AccountComponent','./js/components/account')
        }),
        new AsyncRoute({
            path: '/contact-us',
            name: "Contact",
            loader: () => ComponentHelper.LoadComponentAsync('ContactComponent','./js/components/contact')
        }),
        new AsyncRoute({
            path: '/our-services',
            name: "Services",
            loader: () => ComponentHelper.LoadComponentAsync('ServicesComponent','./js/components/services')
        }),
        new AsyncRoute({
            path: '/forgot-password',
            name: "ForgotPassword",
            loader: () => ComponentHelper.LoadComponentAsync('ForgotPasswordComponent','./js/components/forgot-password')
        }),
        new AsyncRoute({
            path: '/sign-up',
            name: "SignUp",
            loader: () => ComponentHelper.LoadComponentAsync('SignUpComponent','./js/components/sign-up')
        })
    ]
)

export class AppComponent {
    constructor(private _nav:NavService) {}

    setLeft(isOpen:boolean) {
        this._nav.setLeft(isOpen);        
    }

    setRight(isOpen:boolean) {
        this._nav.setRight(isOpen);
    }

    toggleLeft() {
        this._nav.toggleLeft();
    }

    toggleRight() {
        this._nav.toggleRight();
    }
}