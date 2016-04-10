import {BaseRequestOptions, Headers} from 'angular2/http';
import {Injectable} from 'angular2/core';

@Injectable()
export class CORSBaseRequestOptions extends BaseRequestOptions {
    token: string = "";

    headers: Headers = new Headers({
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest",
        "Authorization": "JWT " + this.token
    });

    withCredentials: boolean = true;
}