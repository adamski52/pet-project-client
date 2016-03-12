import {Component} from 'angular2/core';

@Component({
    selector: "contact",
    template: `
        <section class="section contact" id="contact" name="contact"></section>
        <iframe class="map" src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d2944.3430791116007!2d-83.38243304955127!3d42.44171593783247!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sus!4v1457323062569" frameborder="0"></iframe>
    `
})

export class ContactComponent { }