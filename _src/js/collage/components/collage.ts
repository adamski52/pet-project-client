import {Component, View} from 'angular2/core';
import {ICollageImage} from "../interfaces/collage-image";
import {CollageService} from "../services/collage";
import {OnInit} from 'angular2/core';
import {CollageImage} from "./collage-image";

@Component({
    selector: 'collage',
    directives: [CollageImage],
    providers: [CollageService],
    templateUrl: "templates/collage.html"
})

export class CollageComponent implements OnInit {
    public images:ICollageImage[];

    constructor(private _collageService:CollageService) {}

    getImages() {
        this._collageService.getImages().then((images) => this.images = images);
    }

    ngOnInit() {
        this.getImages();
    }
}
