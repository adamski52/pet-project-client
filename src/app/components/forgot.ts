import {Component, OnInit} from 'angular2/core';
import {RouterLink} from "angular2/router";
import {MainBaseComponent} from './main-base-component';
import {NavService} from "../services/nav";

@Component({
    selector: "[forgot]",
    templateUrl: "templates/forgot.html",
    directives: [
        RouterLink
    ]
})

export class ForgotComponent extends MainBaseComponent {
    public questions:Object[] = [];
    public isSecurityQuestions:boolean = false;

    constructor(private _nav:NavService) {
        super(_nav);
        
        this.questions.push({
            text: "Mother's maiden name?",
            answer: ""
        });

        this.questions.push({
            text: "First pet's name?",
            answer: ""
        });
    }

    onVerifyUsername(e) {
        if(e) {
            e.preventDefault();
        }

        this.isSecurityQuestions = true;
    }

    onVerifyQuestions(e) {
        if(e) {
            e.preventDefault();
        }

        console.log(this.questions);
    }
}