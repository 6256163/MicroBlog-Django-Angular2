"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * Created by tianzhang on 2016/12/22.
 */
var core_1 = require('@angular/core');
var NavbarComponent = (function () {
    function NavbarComponent() {
        this.hideChat = true;
        this.hideActivity = true;
        this.hideAccount = true;
        this.fold = false;
    }
    NavbarComponent.prototype.chatShowHide = function (event) {
        this.hideActivity = true;
        this.hideAccount = true;
        this.hideChat = !this.hideChat;
    };
    NavbarComponent.prototype.avtivityShowHide = function (event) {
        this.hideChat = true;
        this.hideAccount = true;
        this.hideActivity = !this.hideActivity;
    };
    NavbarComponent.prototype.accountShowHide = function (event) {
        this.hideChat = true;
        this.hideActivity = true;
        this.hideAccount = !this.hideAccount;
    };
    NavbarComponent.prototype.mouseOver = function (event) {
        event.currentTarget.className = 'active';
    };
    NavbarComponent.prototype.mouseOut = function (event) {
        event.currentTarget.className = '';
    };
    NavbarComponent = __decorate([
        core_1.Component({
            selector: 'nav-bar',
            templateUrl: './navbar.component.html',
            animations: [
                core_1.trigger('flyInOut', [
                    core_1.transition('void => *', [
                        core_1.style({ transform: 'translateY(-10px)' }),
                        core_1.animate(100)
                    ]),
                    core_1.transition('* => void', [
                        core_1.animate(100, core_1.style({ transform: 'translateY(-20px)' }))
                    ])
                ])
            ]
        })
    ], NavbarComponent);
    return NavbarComponent;
}());
exports.NavbarComponent = NavbarComponent;
