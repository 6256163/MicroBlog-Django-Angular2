"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * Created by tianzhang on 2016/12/23.
 */
var core_1 = require("@angular/core");
var popinfo_component_1 = require("../popinfo/popinfo.component");
var RecommendComponent = (function () {
    function RecommendComponent(popinfoService) {
        this.popinfoService = popinfoService;
    }
    RecommendComponent.prototype.showPopinfo = function (eventTarget) {
        this.popinfoService.createCom(this.popinfo, popinfo_component_1.PopinfoComponent, eventTarget);
    };
    __decorate([
        core_1.ViewChild('popinfo', { read: core_1.ViewContainerRef })
    ], RecommendComponent.prototype, "popinfo", void 0);
    RecommendComponent = __decorate([
        core_1.Component({
            selector: 'recommend',
            templateUrl: './recommend.component.html',
        })
    ], RecommendComponent);
    return RecommendComponent;
}());
exports.RecommendComponent = RecommendComponent;
