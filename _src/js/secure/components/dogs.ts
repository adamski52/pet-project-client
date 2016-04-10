import {Component} from 'angular2/core';


@Component({
    selector: "dogs",
    templateUrl: "templates/dogs.html"
})

export class DogsComponent {
    constructor() { 
        console.log("DOGS");
    }
}