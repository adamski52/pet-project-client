import {Component} from 'angular2/core';
import {ICollageImage} from "../interfaces/collage-image";
import {OnInit} from 'angular2/core';
import {CollageImage} from "./collage-image";
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

    constructor(http:Http) {
        http.get(CONSTANTS.apiBaseURL + "collages").map((response) => {
            console.log(response);
            return response.json();
        }).subscribe((images) => this.images = images);
    }

    /*getImages() {
        
    }

    ngOnInit() {
        this.getImages();
    }*/
}
