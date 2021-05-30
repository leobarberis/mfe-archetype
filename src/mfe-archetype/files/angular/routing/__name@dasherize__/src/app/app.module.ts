import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { PageComponent } from './page/page.component';
import { RoutingService } from './services/routing.service';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { APP_BASE_HREF } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [AppComponent, PageComponent, HomeComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    MatCardModule,
  ],
  providers: [RoutingService, { provide: APP_BASE_HREF, useValue: '/obe/' }],
  bootstrap: [],
})
export class AppModule {
  ngDoBootstrap() {}
}
