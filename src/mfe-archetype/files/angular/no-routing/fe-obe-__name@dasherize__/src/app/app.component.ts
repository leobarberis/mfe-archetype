import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoadStyleService } from './services/load-style.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  constructor(private loadStyleService: LoadStyleService) {}

  panelOpenState = false;

  ngOnDestroy(): void {
    this.loadStyleService.unLoadStyle();
  }

  ngOnInit(): void {
    this.loadStyleService.loadStyle('styles.css');
  }
}
