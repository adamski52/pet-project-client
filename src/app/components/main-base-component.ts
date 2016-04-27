import {Injectable} from 'angular2/core';
import {NavService} from "../services/nav";

@Injectable()
export class MainBaseComponent {
    constructor(_nav:NavService) {
        _nav.setHero(false);
    }
}