import {Component} from "angular2/core";
import {RouteConfig, RouterLink, Router, AsyncRoute} from "angular2/router";
import {ComponentHelper} from "../lib/component-helper";
import {NavComponent} from "./nav";
import {AlertComponent} from "./alert";
import {UserService} from "../services/user";
import {LoginService} from "../services/login";
import {AlertService} from "../services/alert";
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
            loader: () => ComponentHelper.LoadComponentAsync('HomeComponent','./app/components/home')
        }),
        new AsyncRoute({
            path: '/login',
            name: "Login",
            loader: () => ComponentHelper.LoadComponentAsync('LoginComponent','./app/components/login')
        }),
        new AsyncRoute({
            path: '/logout',
            name: "Logout",
            loader: () => ComponentHelper.LoadComponentAsync('LogoutComponent','./app/components/logout')
        }),
        new AsyncRoute({
            path: '/about-us',
            name: "About",
            loader: () => ComponentHelper.LoadComponentAsync('AboutComponent','./app/components/about')
        }),
        new AsyncRoute({
            path: '/account/my-profile',
            name: "MyProfile",
            loader: () => ComponentHelper.LoadComponentAsync('ProfileComponent','./app/components/profile')
        }),
        new AsyncRoute({
            path: '/account/my-dogs',
            name: "MyDogs",
            loader: () => ComponentHelper.LoadComponentAsync('DogsComponent','./app/components/dogs')
        }),
        new AsyncRoute({
            path: '/account/my-alerts',
            name: "MyAlerts",
            loader: () => ComponentHelper.LoadComponentAsync('NotificationsComponent','./app/components/notifications')
        }),
        new AsyncRoute({
            path: '/account/my-appointments',
            name: "MyAppointments",
            loader: () => ComponentHelper.LoadComponentAsync('AppointmentsComponent','./app/components/appointments')
        }),
        new AsyncRoute({
            path: '/account/my-settings',
            name: "MySettings",
            loader: () => ComponentHelper.LoadComponentAsync('SettingsComponent','./app/components/settings')
        }),
        new AsyncRoute({
            path: '/contact-us',
            name: "Contact",
            loader: () => ComponentHelper.LoadComponentAsync('ContactComponent','./app/components/contact')
        }),
        new AsyncRoute({
            path: '/our-services',
            name: "Services",
            loader: () => ComponentHelper.LoadComponentAsync('ServicesComponent','./app/components/services')
        }),
        new AsyncRoute({
            path: '/forgot-password',
            name: "ForgotPassword",
            loader: () => ComponentHelper.LoadComponentAsync('ForgotPasswordComponent','./app/components/forgot-password')
        }),
        new AsyncRoute({
            path: '/sign-up',
            name: "SignUp",
            loader: () => ComponentHelper.LoadComponentAsync('SignUpComponent','./app/components/sign-up')
        }),
        new AsyncRoute({
            path: '/forgot',
            name: "ForgotPassword",
            loader: () => ComponentHelper.LoadComponentAsync('ForgotComponent','./app/components/forgot')
        })
    ]
)

export class AppComponent {
    constructor(private _user:UserService,
                private _login:LoginService,
                private _router:Router,
                private _alert:AlertService) {

        this._login.data$.subscribe(
            response => {
                this._user.get();
            }
        );

        this._user.data$.subscribe(
            response => {
                this._alert.success("Login successful.");
                this._router.navigate(["MyProfile"]);
            }
        );

        this._user.get();
    }
}