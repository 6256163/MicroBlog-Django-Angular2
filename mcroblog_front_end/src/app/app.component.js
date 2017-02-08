"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var material_1 = require("@angular/material");
var AppComponent = (function () {
    function AppComponent(mdIconRegistry) {
        this.title = 'app works!';
        mdIconRegistry
            .addSvgIconSetInNamespace('plus', './SVG/267-plus.svg');
    }
    AppComponent = __decorate([
        core_1.Component({
            selector: 'app-root',
            templateUrl: './app.component.html',
            styleUrls: ['./app.component.css'],
            encapsulation: core_1.ViewEncapsulation.None,
            viewProviders: [material_1.MdIconRegistry],
        })
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
