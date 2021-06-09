import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  providers: [OrderService],
})
export class MainComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
