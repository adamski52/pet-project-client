import {Injectable} from 'angular2/core';

@Injectable()
export class HeroBaseComponent {
    constructor(_nav) {
        _nav.setHero(true);
    }
}