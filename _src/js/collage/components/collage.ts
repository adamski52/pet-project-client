import {Component, ElementRef, NgZone} from 'angular2/core';
import {CollageImage} from "./collage-image";
import {AlertService} from "../../alert/services/alert";
import {CollageService} from "../services/collage";
import 'rxjs/add/operator/map';

@Component({
    selector: 'collage',
    directives: [CollageImage],
    templateUrl: "templates/collage.html",
    host: {
        "(window:resize)": "figureDisplay()"
    }
})

export class CollageComponent {
    private _isInitialized: boolean = false;
    public images: Object[] = [];

    constructor(private _collage: CollageService,
                private _alert: AlertService,
                private _element: ElementRef,
                private _zone: NgZone) { }

    ngOnInit() {
        this.figureDisplay();
    }

    figureDisplay() {
        if(this._isInitialized) {
            return;
        }

        if (this._element.nativeElement.clientWidth > 0) {
            this._collage.get().subscribe(
                response => {
                    this._zone.run(() => {
                        console.log("COLLAGE FOR EACH");
                        response.forEach(image => this.images.push(image));
                    });
                },
                error => this._alert.error("Failed to load collages.")
            );
            this._isInitialized = true;
        }
    }
}
