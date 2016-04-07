import {Component} from 'angular2/core';
import {ICollageImage} from "../interfaces/collage-image";
import {CollageImage} from "./collage-image";
import {AlertService} from "../../alert/services/alert";
import {CONSTANTS} from "../../constants";
import {CollageService} from "../services/collage";
import 'rxjs/add/operator/map';


@Component({
    selector: 'collage',
    directives: [CollageImage],
    templateUrl: "templates/collage.html"
})

export class CollageComponent {
    public images:ICollageImage[] = [];

    constructor(private _alert: AlertService, private _collage: CollageService) {
        this._collage.fetch().subscribe(
            data => {
                data.forEach(d => this.images.push(d));

                this._alert.success("Great success.");
            },
            error => {
                this._alert.error("eh boy it broke.");
            }
        );
    }
}
