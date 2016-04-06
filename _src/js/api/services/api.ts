import {Observable} from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';
import {Http} from 'angular2/http';
import {Injectable} from 'angular2/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/share';

@Injectable()
export class APIService {
    private _get: Observer<any>;
    private _post: Observer<any>;
    private _delete: Observer<any>;
    private _update: Observer<any>;
    public get$: Observable<any>;
    public post$: Observable<any>;
    public delete$: Observable<any>;
    public update$: Observable<any>;

    // fetch, etc should return a new Observable.share().
    // each implementor component then just .subscribe()

    constructor(private http: Http) {
        this.get$ = new Observable(observer => this._get = observer).share();
        this.post$ = new Observable(observer => this._post = observer).share();
        this.delete$ = new Observable(observer => this._delete = observer).share();
        this.update$ = new Observable(observer => this._update = observer).share();
    }

    public fetch(url: string) {
        return this.http.get(url).map((response) => {
            return response.json();
        }).subscribe(
            data => {
                this._get.next(data);
            },
            error => {
                this._get.error(error);
            }
        );
    }

    public save(url: string, params: Object) {
        this.http.post(url, JSON.stringify(params)).map((response) => {
            return response.json();
        }).subscribe(
            data => {
                this._post.next(data);
            },
            error => {
                this._post.next(error);
            }
         );
    }

    public destroy(url: string) {
        this.http.delete(url).map((response) => {
            return response.json();
        }).subscribe(
            data => {
                this._delete.next(data);
            },
            error => {
                this._delete.next(error);
            }
        );
    }

    public update(url:string, params:Object) {
        this.http.put(url, JSON.stringify(params)).map((response) => {
            return response.json();
        }).subscribe(
            data => {
                this._update.next(data);
            },
            error => {
                this._update.next(error);
            }
        );
    }
}