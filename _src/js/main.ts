import {HTTP_PROVIDERS} from 'angular2/http';
import {bootstrap}    from 'angular2/platform/browser';
import {AppComponent} from './app/components/app';

//bootstrap(AppComponent);
bootstrap(AppComponent, [HTTP_PROVIDERS]);
