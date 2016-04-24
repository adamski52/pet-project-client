import {Directive, ElementRef} from 'angular2/core';

@Directive({
    selector: ".btn",
    host: {
        "(mouseover)": "changeHover()"
        "[class.hover-left]": "rand == 0",
        "[class.hover-right]": "rand == 1"
        // 2 is OK too
    }
})

export class ButtonSliderComponent {
    public rand:number = 0;

    changeHover() {
        this.rand = Math.floor(Math.random() * 3);
    }

    constructor(private _element:ElementRef) {
        this._element.nativeElement.innerHTML += "<div class='btn-slider'>" + this._element.nativeElement.innerHTML + "</div>";
    }
}