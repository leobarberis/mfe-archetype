import { Component, OnInit } from '@angular/core';
import { RoutingService } from '../services/routing.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(private routingService: RoutingService) {}

  public navigate(path: string): void {
    this.routingService.navigate(path);
  }

  ngOnInit(): void {}
}
