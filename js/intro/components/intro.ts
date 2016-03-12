import {Component} from 'angular2/core';

@Component({
    selector: "intro",
    template: `
        <header class="section intro" id="intro" name="intro">
            <p class="contrast">Storybook Kennels</p>
            <p class="subtle">professional, fun daycare and boarding</p>
            <p class="highlight">individual attention, group play, special accommodations for illnesses and disabilities</p>
            <a href="#" class="button">Join now</a>
        </header>
    `
})

export class IntroComponent { }