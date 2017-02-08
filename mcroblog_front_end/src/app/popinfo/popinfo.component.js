"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * Created by tianzhang on 2016/12/26.
 */
var core_1 = require("@angular/core");
var PopinfoComponent = (function () {
    function PopinfoComponent(popinfoService) {
        this.popinfoService = popinfoService;
    }
    PopinfoComponent.prototype.onMousemove = function (event) {
        if (event.pageY < this.top ||
            event.pageY > this.bottom ||
            event.pageX < this.left ||
            event.pageX > this.right) {
            this.popinfoService.destoryCom();
        }
    };
    __decorate([
        core_1.HostListener('document:mousemove', ['$event'])
    ], PopinfoComponent.prototype, "onMousemove", null);
    PopinfoComponent = __decorate([
        core_1.Component({
            selector: 'popinfo',
            templateUrl: './popinfo.component.html'
        })
    ], PopinfoComponent);
    return PopinfoComponent;
}());
exports.PopinfoComponent = PopinfoComponent;
