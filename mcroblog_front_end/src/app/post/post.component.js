"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var blog_1 = require("../model/blog");
/**
 * Created by tianzhang on 2016/12/30.
 */
var PostComponent = (function () {
    function PostComponent() {
        this.blog = new blog_1.Blog();
        this.textPost = false;
        this.photoPost = false;
        this.linkPost = false;
        this.chatPost = false;
        this.audioPost = false;
        this.vedioPost = false;
        this.postMess = false;
    }
    PostComponent.prototype.onSubmit = function () {
        this.blog;
    };
    PostComponent.prototype.hidePost = function () {
        this.postMess = false;
    };
    PostComponent.prototype.showTextPost = function () {
        this.postMess = true;
        this.textPost = true;
        this.photoPost = false;
        this.linkPost = false;
        this.chatPost = false;
        this.audioPost = false;
        this.vedioPost = false;
    };
    PostComponent.prototype.showPhotoPost = function () {
        this.postMess = true;
        this.textPost = false;
        this.photoPost = true;
        this.linkPost = false;
        this.chatPost = false;
        this.audioPost = false;
        this.vedioPost = false;
    };
    PostComponent.prototype.showLinkPost = function () {
        this.postMess = true;
        this.textPost = false;
        this.photoPost = false;
        this.linkPost = true;
        this.chatPost = false;
        this.audioPost = false;
        this.vedioPost = false;
    };
    PostComponent.prototype.showChatPost = function () {
        this.postMess = true;
        this.textPost = false;
        this.photoPost = false;
        this.linkPost = false;
        this.chatPost = true;
        this.audioPost = false;
        this.vedioPost = false;
    };
    PostComponent.prototype.showAudioPost = function () {
        this.postMess = true;
        this.textPost = false;
        this.photoPost = false;
        this.linkPost = false;
        this.chatPost = false;
        this.audioPost = true;
        this.vedioPost = false;
    };
    PostComponent.prototype.showVedioPost = function () {
        this.postMess = true;
        this.textPost = false;
        this.photoPost = false;
        this.linkPost = false;
        this.chatPost = false;
        this.audioPost = false;
        this.vedioPost = true;
    };
    PostComponent = __decorate([
        core_1.Component({
            selector: 'post',
            templateUrl: './post.component.html',
            styleUrls: ['./post.component.css'],
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
    ], PostComponent);
    return PostComponent;
}());
exports.PostComponent = PostComponent;
