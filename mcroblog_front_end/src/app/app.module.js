"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var platform_browser_1 = require('@angular/platform-browser');
var core_1 = require('@angular/core');
var forms_1 = require('@angular/forms');
var http_1 = require('@angular/http');
var app_component_1 = require('./app.component');
var blogs_component_1 = require("./blog/blogs.component");
var navbar_component_1 = require("./navbar/navbar.component");
var explore_component_1 = require("./explore/explore.component");
var app_routing_module_1 = require("./app-routing.module");
var recommend_component_1 = require("./recommend/recommend.component");
var chat_component_1 = require("./chat/chat.component");
var activity_component_1 = require("./activity/activity.component");
var account_component_1 = require("./account/account.component");
var follow_component_1 = require("./follow/follow.component");
var popinfo_component_1 = require("./popinfo/popinfo.component");
var popinfo_service_1 = require("./service/popinfo.service");
var post_component_1 = require("./post/post.component");
var material_1 = require("@angular/material");
require('hammerjs');
var likes_component_1 = require("./likes/likes.component");
var home_component_1 = require("./home/home.component");
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_component_1.AppComponent,
                blogs_component_1.BlogComponent,
                navbar_component_1.NavbarComponent,
                explore_component_1.ExploreComponent,
                recommend_component_1.RecommendComponent,
                chat_component_1.ChatComponent,
                activity_component_1.ActivityComponent,
                account_component_1.AccountComponent,
                follow_component_1.FollowComponent,
                popinfo_component_1.PopinfoComponent,
                post_component_1.PostComponent,
                likes_component_1.LikesComponent,
                home_component_1.HomeComponent,
            ],
            imports: [
                platform_browser_1.BrowserModule,
                forms_1.FormsModule,
                http_1.HttpModule,
                app_routing_module_1.AppRoutingModule,
                material_1.MaterialModule.forRoot(),
            ],
            //declare dynamical component in entryComponents
            entryComponents: [popinfo_component_1.PopinfoComponent],
            providers: [popinfo_service_1.PopinfoService],
            bootstrap: [app_component_1.AppComponent,]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
