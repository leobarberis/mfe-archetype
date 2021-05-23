import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { PageComponent } from './page/page.component';
import { RoutingService } from './services/routing.service';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { APP_BASE_HREF } from '@angular/common';

@NgModule({
  declarations: [AppComponent, PageComponent, HomeComponent],
  imports: [
    BrowserAnimationsModule,
    AppRoutingModule,
    CollapseModule.forRoot(),
    FormsModule,
  ],
  providers: [RoutingService, { provide: APP_BASE_HREF, useValue: '/obe/' }],
  bootstrap: [],
})
export class AppModule {
  ngDoBootstrap() {}
}
