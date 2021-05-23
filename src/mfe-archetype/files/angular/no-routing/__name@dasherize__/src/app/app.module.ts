import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { APP_BASE_HREF } from '@angular/common';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule],
  providers: [{ provide: APP_BASE_HREF, useValue: '/obe/' }],
  bootstrap: [],
})
export class AppModule {
  ngDoBootstrap() {}
}
