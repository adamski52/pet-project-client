import {Component} from 'angular2/core';
import {RouterLink} from 'angular2/router';

@Component({
    selector: "[intro]",
    templateUrl: "templates/intro.html",
    directives: [
        RouterLink
    ]
})

export class IntroComponent {
}