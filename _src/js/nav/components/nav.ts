import {Component} from 'angular2/core';
import {Toggler} from "../../toggler/components/toggler";
import {TogglerMenu} from "../../toggler/components/toggler-menu";

@Component({
    selector: "nav",
    templateUrl: "templates/nav.html",
    directives: [Toggler, TogglerMenu]
})

export class NavComponent { }