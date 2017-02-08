/**
 * Created by tianzhang on 2016/12/22.
 */
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var $ = require('jquery');
var popinfo_component_1 = require("../popinfo/popinfo.component");
var ExploreComponent = (function () {
    function ExploreComponent(popinfoService) {
        this.popinfoService = popinfoService;
    }
    ExploreComponent.prototype.showPopinfo = function (eventTarget) {
        this.popinfoService.createCom(this.popinfo, popinfo_component_1.PopinfoComponent, eventTarget);
    };
    ExploreComponent.prototype.waterfall = function () {
        var $explore = $('#explore');
        var $main = $('#main');
        var $boxes = $('.box');
        var w = $($boxes[0]).outerWidth();
        var cols = Math.floor(($(window).width() - $('#recommend').outerWidth()) / w);
        $main.width(w * cols + 10);
        $main.height(($(window).height()));
        $explore.width($main.outerWidth() + $('#recommend').outerWidth());
        var h = $boxes.eq(0).outerHeight();
        var lArr = [];
        var tArr = [];
        $main.children().each(function (index, value) {
            if (index < cols) {
                if (index == 0) {
                    lArr[index] = $("#main").offset().left;
                }
                else {
                    lArr[index] = lArr[index - 1] + 300;
                }
                tArr[index] = $('#recommend').offset().top;
            }
            else {
                lArr[cols] = $('#recommend').offset().left;
                tArr[cols] = $('#recommend').offset().top + $('#recommend').outerHeight();
            }
        });
        $main.children().each(function (index, value) {
            var minT = Math.min.apply(null, tArr);
            var minIndex = $.inArray(minT, tArr);
            $(value).css({
                'position': 'absolute',
                'top': tArr[minIndex],
                'left': lArr[minIndex],
            });
            tArr[minIndex] += $(value).outerHeight();
        });
    };
    ExploreComponent.prototype.ngAfterViewInit = function () {
        /*
        let main_w = $('#main').outerWidth();
        let $boxes = $('#main').find('.box');
        let w = $($boxes[0]).outerWidth();
        let cols =  Math.floor(($('#main').outerWidth()-$('#recommend').outerWidth()) / w);
        $('#main').width(w*cols+10);
        $('#explore').width($('#main').outerWidth()+$('#recommend').outerWidth())
        */
        this.waterfall();
    };
    __decorate([
        core_1.ViewChild('popinfo', { read: core_1.ViewContainerRef })
    ], ExploreComponent.prototype, "popinfo", void 0);
    __decorate([
        core_1.ViewChild('main')
    ], ExploreComponent.prototype, "main", void 0);
    ExploreComponent = __decorate([
        core_1.Component({
            selector: 'explore',
            templateUrl: './explore.component.html',
        })
    ], ExploreComponent);
    return ExploreComponent;
}());
exports.ExploreComponent = ExploreComponent;
