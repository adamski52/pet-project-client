"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('angular2/core');
var Observable_1 = require('rxjs/Observable');
var NavService = (function () {
    function NavService() {
        var _this = this;
        this.data$ = new Observable_1.Observable(function (observer) { return _this._observer = observer; }).share();
    }
    NavService.prototype.setHero = function (is) {
        this._state.isHeroMode = is;
        this._observer.next(this._state);
    };
    NavService.prototype.setLeft = function (is) {
        this._state.isLeftOpen = is;
        if (is) {
            this._state.isRightOpen = false;
        }
        this._observer.next(this._state);
    };
    NavService.prototype.setRight = function (is) {
        this._state.isRightOpen = is;
        if (is) {
            this._state.isLeftOpen = false;
        }
        this._observer.next(this._state);
    };
    NavService.prototype.toggleLeft = function () {
        this.setLeft(!this._state.isLeftOpen);
    };
    NavService.prototype.toggleRight = function () {
        this.setRight(!this._state.isRightOpen);
    };
    NavService = __decorate([
        core_1.Injectable()
    ], NavService);
    return NavService;
}());
exports.NavService = NavService;
