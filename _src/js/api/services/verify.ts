import {Observable} from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';
import {Http} from 'angular2/http';
import {Injectable} from 'angular2/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/share';
import {CONSTANTS} from "../../constants";

@Injectable()
export class VerifyService {
    private fetch$:Observable;
    constructor(private http: Http) {
        this.fetch$ = this.http.get(CONSTANTS.apiBaseURL).map(response => {
            // TODO:  Could transpose in to proper object types
            return response;
        }).share();
    }

    fetch() {
        return this.fetch$;
    }
}