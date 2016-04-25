import {Component} from "angular2/core";
import {RouteConfig, RouterLink, Router, AsyncRoute} from "angular2/router";
import {ComponentHelper} from "../lib/component-helper";
import {NavComponent} from "./nav";
import {AlertComponent} from "./alert";
import {UserService} from "../services/user";
import {LoginService} from "../services/login";
import {AuthRouterComponent} from "./auth-router";


@Component({
    selector: "[storybook]",
    templateUrl: "templates/app.html",
    directives: [
        RouterLink,
        NavComponent,
        AlertComponent,
        AuthRouterComponent
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
            path: '/login',
            name: "Login",
            loader: () => ComponentHelper.LoadComponentAsync('LoginComponent','./js/components/login')
        }),
        new AsyncRoute({
            path: '/logout',
            name: "Logout",
            loader: () => ComponentHelper.LoadComponentAsync('LogoutComponent','./js/components/logout')
        }),
        new AsyncRoute({
            path: '/about-us',
            name: "About",
            loader: () => ComponentHelper.LoadComponentAsync('AboutComponent','./js/components/about')
        }),
        new AsyncRoute({
            path: '/account/my-profile',
            name: "MyProfile",
            loader: () => ComponentHelper.LoadComponentAsync('ProfileComponent','./js/components/profile')
        }),
        new AsyncRoute({
            path: '/account/my-dogs',
            name: "MyDogs",
            loader: () => ComponentHelper.LoadComponentAsync('DogsComponent','./js/components/dogs')
        }),
        new AsyncRoute({
            path: '/account/my-alerts',
            name: "MyAlerts",
            loader: () => ComponentHelper.LoadComponentAsync('NotificationsComponent','./js/components/notifications')
        }),
        new AsyncRoute({
            path: '/account/my-appointments',
            name: "MyAppointments",
            loader: () => ComponentHelper.LoadComponentAsync('AppointmentsComponent','./js/components/appointments')
        }),
        new AsyncRoute({
            path: '/account/my-settings',
            name: "MySettings",
            loader: () => ComponentHelper.LoadComponentAsync('SettingsComponent','./js/components/settings')
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
        }),
        new AsyncRoute({
            path: '/forgot',
            name: "ForgotPassword",
            loader: () => ComponentHelper.LoadComponentAsync('ForgotComponent','./js/components/forgot')
        })
    ]
)

export class AppComponent {
    constructor(private _user:UserService,
                private _login:LoginService,
                private _router:Router) {

        this._login.data$.subscribe(
            response => {
                this._user.get();
            }
        );

        this._user.get();
    }
}