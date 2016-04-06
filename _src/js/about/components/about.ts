import {Component} from 'angular2/core';
import {VerifyService} from "../../api/services/verify";

@Component({
    selector: "about",
    templateUrl: "templates/about.html"
})

export class AboutComponent {
    constructor(private _verify: VerifyService) {
        this._verify.fetch().subscribe(
            response => console.log("SECOND GET", response),
            error => console.log("SECOND GET", error)
        );
    }
}