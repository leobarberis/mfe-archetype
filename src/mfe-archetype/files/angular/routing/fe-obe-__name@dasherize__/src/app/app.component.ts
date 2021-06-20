import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoadStyleService } from './services/load-style.service';

@Component({
  selector: 'app-root',
  template: `<router-outlet></router-outlet>`,
})
export class AppComponent implements OnInit, OnDestroy {

  constructor(private loadStyleService: LoadStyleService) {}

  ngOnDestroy(): void {
    this.loadStyleService.unLoadStyle();
  }

  ngOnInit(): void {
    this.loadStyleService.loadStyle('styles.css');
  }
}
