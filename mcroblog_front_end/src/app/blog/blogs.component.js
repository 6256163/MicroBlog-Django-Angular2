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
var core_1 = require("@angular/core");
var blog_service_1 = require("../service/http/blog.service");
var popinfo_component_1 = require("../popinfo/popinfo.component");
var BlogComponent = (function () {
    function BlogComponent(blogService, popinfoService) {
        this.blogService = blogService;
        this.popinfoService = popinfoService;
        this.scoreMove = 0;
    }
    BlogComponent.prototype.ngOnInit = function () {
        this.blogs = this.blogService.getBlogs();
    };
    BlogComponent.prototype.showPopinfo = function (eventTarget) {
        this.popinfoService.createCom(this.popinfo, popinfo_component_1.PopinfoComponent, eventTarget);
    };
    BlogComponent.prototype.holdHeadImg = function (event) {
        if (Math.abs(this.scoreMove - $(window).scrollTop())) {
            this.scoreMove = $(window).scrollTop();
            var $targets = $(event.currentTarget.document).find('.headimg');
            $targets.each(function (index, value) {
                if ($(value).offset().top >= $(value).parent().offset().top && $(value).offset().top - $(window).scrollTop() <= 81) {
                    var left = $(value).offset().left;
                    $(value).css({
                        'position': 'fixed',
                        'top': '81px',
                        'left': left + 'px'
                    });
                    if ($(value).offset().top + $(value).outerHeight() >= $(value).parent().offset().top + $(value).parent().outerHeight()) {
                        $(value).css({
                            'position': 'absolute',
                            'top': $(value).parent().offset().top + $(value).parent().outerHeight() - $(value).outerHeight() + 'px',
                            'left': left + 'px'
                        });
                    }
                }
                else {
                    $(value).css({
                        'position': 'static',
                        'top': '',
                        'left': ''
                    });
                }
            });
        }
    };
    __decorate([
        core_1.ViewChild('popinfo', { read: core_1.ViewContainerRef })
    ], BlogComponent.prototype, "popinfo", void 0);
    __decorate([
        core_1.HostListener('window:scroll', ['$event'])
    ], BlogComponent.prototype, "holdHeadImg", null);
    BlogComponent = __decorate([
        core_1.Component({
            selector: 'blogs-list',
            templateUrl: './blogs.component.html',
            providers: [blog_service_1.BlogService],
        })
    ], BlogComponent);
    return BlogComponent;
}());
exports.BlogComponent = BlogComponent;
