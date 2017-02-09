/**
 * Created by tianzhang on 2016/12/19.
 */
import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ExploreComponent} from "./explore/explore.component";
import {FollowComponent} from "./follow/follow.component";
import {LikesComponent} from "./likes/likes.component";
import {HomeComponent} from "./home/home.component";
import {LoginFormComponent} from "./login/login-form.component";
import {RegisterFormComponent} from "./register/register-form.component";
import {BrowserModule} from "@angular/platform-browser";


const appRoutes: Routes = [
  {
    path: 'explore',
    component: ExploreComponent,
  },

  {
    path:'home',
    component:HomeComponent,

  },

  {
    path:'follow',
    component:FollowComponent,

  },

  {
    path:'likes',
    component:LikesComponent,

  },

  { path: 'login',
    component:LoginFormComponent,
  },
  { path: 'register',
    component:RegisterFormComponent,
  },

  { path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
];
@NgModule({
  imports: [ BrowserModule,RouterModule.forRoot(appRoutes, { useHash: true }) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
