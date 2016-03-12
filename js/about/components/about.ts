import {Component} from 'angular2/core';

@Component({
    selector: "about",
    template: `
        <section class="section about" id="about" name="about">
            <p style="padding-top: 200px;">
                <a href="" class="btn icon-paw">Example</a>
                <a href="" class="btn btn-lg icon-paw">Example longer text</a>
                <a href="" class="btn btn-sm icon-paw">Example longer text</a>
            </p>
        </section>
    `
})

export class AboutComponent { }