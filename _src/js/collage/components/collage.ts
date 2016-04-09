import {Component} from 'angular2/core';
import {ICollageImage} from "../interfaces/collage-image";
import {CollageImage} from "./collage-image";
import {AlertService} from "../../alert/services/alert";
import {CollageService} from "../services/collage";
import 'rxjs/add/operator/map';


@Component({
    selector: 'collage',
    directives: [CollageImage],
    templateUrl: "templates/collage.html"
})

export class CollageComponent {
    public images: ICollageImage[] = [];

    constructor(private _collage: CollageService, private _alert: AlertService) {
        this._collage.get().subscribe(
            response => {
                response.forEach(image => this.images.push(image));
            },
            error => this._alert.error("Failed to load collages.")
        )
    }
}
