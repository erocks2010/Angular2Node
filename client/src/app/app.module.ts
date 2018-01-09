import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { NavBarMainComponent } from './navigation/nav-bar-main/nav-bar-main.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpGeneralInterceptor } from './services/interceptors/http-general-interceptor';
import {RouterModule,Route} from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    NavBarMainComponent
  ],
  imports: [
    RouterModule.forRoot(
      [
        {path:'./login',component:NavBarMainComponent},
        {path:'**', redirectTo:"www.google.com" ,pathMatch:"full"}
      ],
    {enableTracing:true}
    )
    BrowserModule,
    HttpClientModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: HttpGeneralInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
