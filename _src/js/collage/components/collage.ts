import {Component} from 'angular2/core';
import {ICollageImage} from "../interfaces/collage-image";
import {OnInit} from 'angular2/core';
import {CollageImage} from "./collage-image";
import {AlertService} from "../../alert/services/alert";
import {Http, Headers} from 'angular2/http';
import {CONSTANTS} from "../../constants";
import 'rxjs/add/operator/map';


@Component({
    selector: 'collage',
    directives: [CollageImage],
    templateUrl: "templates/collage.html"
})

export class CollageComponent {
    public images:ICollageImage[];

    constructor(private http: Http, private _alert: AlertService) {
        http.get(CONSTANTS.apiBaseURL + "collages" + CONSTANTS.forceUnique()).map((response) => {
            return response.json();
        }).subscribe(
            data => {
                this.images = data;

                this._alert.open({
                    type: "success",
                    message: "Great success."
                });
            },
            error => {
                this._alert.open({
                    type: "error",
                    message: "eh boy it broke."
                });

            }
        );
    }
}
