import {Injectable} from 'angular2/core';

@Injectable()
export class MainBaseComponent {
    constructor(_nav) {
        _nav.setHero(false);
    }
}