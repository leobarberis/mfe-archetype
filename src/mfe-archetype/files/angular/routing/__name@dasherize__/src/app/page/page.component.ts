import { Component, OnInit } from '@angular/core';
import { RoutingService } from '../services/routing.service';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
})
export class PageComponent implements OnInit {
  constructor(private routingService: RoutingService) {}

  public navigate(path: string): void {
    this.routingService.navigate(path);
  }

  ngOnInit(): void {}
}
