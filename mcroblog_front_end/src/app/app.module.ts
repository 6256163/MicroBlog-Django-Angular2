import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule, XSRFStrategy, CookieXSRFStrategy} from '@angular/http';
import {AppComponent} from './app.component';
import {BlogComponent} from "./blog/blogs.component";
import {NavbarComponent} from "./navbar/navbar.component";
import {ExploreComponent} from "./explore/explore.component";
import {AppRoutingModule} from "./app-routing.module";
import {RecommendComponent} from "./recommend/recommend.component";
import {ChatComponent} from "./chat/chat.component";
import {ActivityComponent} from "./activity/activity.component";
import {AccountComponent} from "./account/account.component";
import {FollowComponent} from "./follow/follow.component";
import {PopinfoComponent} from "./popinfo/popinfo.component";
import {PopinfoService} from "./popinfo/popinfo.service";
import {PostComponent} from "./post/post.component";
import {MaterialModule} from "@angular/material";
import {LikesComponent} from "./likes/likes.component";
import {HomeComponent} from "./home/home.component";
import {LoginFormComponent} from "./login/login-form.component";
import {AuthenticationService} from "./service/http/authentication.service";
import {UserService} from "./service/http/user.service";
import {BlogService} from "./service/http/blog.service";
import {FileUploadService} from "./service/http/file.upload.service";
import {TextComponent} from "./post/text/text.component";
import {PhotoComponent} from "./post/photo/photo.component";
import {LinkComponent} from "./post/link/link.component";
import {AudioComponent} from "./post/audio/audio.component";
import {VideoComponent} from "./post/video/video.component";
import {ContenteditableModelDirective} from "./Directive/ContenteditableModel.directive";
import {RichTextComponent} from "./post/richtext/richtext.component";
import {CameraComponent} from "./post/camera/camera.component";
import {DecodeService} from "./service/decode/decode.service";
import {UserBlogComponent} from "./blog/userblog.component";
import {FollowService} from "./service/http/follow.service";
import {RegisterFormComponent} from "./register/register-form.component";
import {EqualValidator} from "./register/forbiden-validator.directive";
import {LikeService} from "./service/http/like.service";

export function getXSRF() {
  return new CookieXSRFStrategy('csrftoken', 'X-CSRFToken');
}


@NgModule({
  declarations: [
    AppComponent,
    BlogComponent,
    NavbarComponent,
    ExploreComponent,
    RecommendComponent,
    ChatComponent,
    ActivityComponent,
    AccountComponent,
    FollowComponent,
    PopinfoComponent,
    PostComponent,
    LikesComponent,
    HomeComponent,
    LoginFormComponent,
    RegisterFormComponent,
    TextComponent,
    PhotoComponent,
    LinkComponent,
    AudioComponent,
    VideoComponent,
    ContenteditableModelDirective,
    RichTextComponent,
    CameraComponent,
    UserBlogComponent,
    EqualValidator,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    MaterialModule.forRoot(),
    ReactiveFormsModule,
  ],

  //declare dynamical component in entryComponents
  entryComponents: [
    PopinfoComponent,
  ],
  providers: [
    PopinfoService,
    AuthenticationService,
    UserService,
    BlogService,
    FileUploadService,
    DecodeService,
    FollowService,
    NavbarComponent,
    LikeService,
    {
      provide: XSRFStrategy,
      useFactory: getXSRF,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}


