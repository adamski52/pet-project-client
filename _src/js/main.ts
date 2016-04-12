import {HTTP_PROVIDERS, BrowserXhr, BaseRequestOptions, Headers, RequestOptions} from 'angular2/http';
import {bootstrap} from 'angular2/platform/browser';
import 'rxjs/Rx';
import {provide, Injectable} from 'angular2/core';
import {AppComponent} from './app/components/app';
import {CORSBaseRequestOptions} from "./app/lib/cors-base-request-options";
import {ROUTER_PROVIDERS} from 'angular2/router';

@Injectable()
class CORSBrowserXHR extends BrowserXhr {
    build(): any {
        var xhr: any = super.build();
        xhr.withCredentials = true;
        return xhr;
    }
}

bootstrap(AppComponent, [
    HTTP_PROVIDERS,
    ROUTER_PROVIDERS,
    provide(BrowserXhr, { useClass: CORSBrowserXHR })
]);
