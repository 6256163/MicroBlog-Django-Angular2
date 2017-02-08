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
require('rxjs/add/operator/toPromise');
var PopinfoService = (function () {
    function PopinfoService(http, resolver) {
        this.http = http;
        this.resolver = resolver;
    }
    PopinfoService.prototype.handleError = function (error) {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    };
    PopinfoService.prototype.createCom = function (viewChild, targetCom, eventTarget) {
        // Create our chat component now we're initialised
        /*
         viewChild: dynamic load the component under viewChild - eg. @ViewChild('popinfo', {read: ViewContainerRef})
         targetCom: The component need to be dynamic loaded.
         eventTarget: MouseEvent, use it to locate the popup dialog.
         */
        if (!this.ref) {
            var $targer = $(eventTarget.currentTarget);
            var componentFactory = this.resolver.resolveComponentFactory(targetCom);
            var componentReference = viewChild.createComponent(componentFactory);
            this.ref = componentReference;
            var left = $targer.offset().left + $targer.outerWidth() / 2 - 150;
            $(componentReference._nativeElement.firstChild).css({
                "top": $targer.offset().top + $targer.outerHeight() + 'px',
                'left': left < 0 ? 0 : left + 'px',
            });
            componentReference.instance.top = $targer.offset().top;
            componentReference.instance.bottom = $(componentReference._nativeElement.firstChild).offset().top +
                $(componentReference._nativeElement.firstChild).outerHeight();
            componentReference.instance.left = $(componentReference._nativeElement.firstChild).offset().left;
            componentReference.instance.right = $(componentReference._nativeElement.firstChild).offset().left +
                $(componentReference._nativeElement.firstChild).outerWidth();
        }
    };
    PopinfoService.prototype.destoryCom = function () {
        if (this.ref) {
            this.ref.destroy();
            this.ref = '';
        }
    };
    PopinfoService = __decorate([
        core_1.Injectable()
    ], PopinfoService);
    return PopinfoService;
}());
exports.PopinfoService = PopinfoService;
