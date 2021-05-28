import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `<h1>Hello from <%= name %>!</h1>`,
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class AppComponent {}
