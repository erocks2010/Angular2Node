import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NavBarMainComponent } from './navigation/nav-bar-main/nav-bar-main.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarMainComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
