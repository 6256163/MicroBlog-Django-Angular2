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
var BlogService = (function () {
    function BlogService() {
    }
    BlogService.prototype.getBlogs = function () {
        return [
            {
                id: 1,
                images: ['media_for_dev/web1.png'],
                content: "content1",
                user: "user1",
                pub_date: new Date().getDate(),
            },
            {
                id: 2,
                images: ['media_for_dev/web1.png'],
                content: "content2",
                user: "user2",
                pub_date: new Date().getDate(),
            },
            {
                id: 3,
                images: ['media_for_dev/web1.png'],
                content: "content3",
                user: "user3",
                pub_date: new Date().getDate(),
            },
        ];
    };
    BlogService = __decorate([
        core_1.Inject({})
    ], BlogService);
    return BlogService;
}());
exports.BlogService = BlogService;
