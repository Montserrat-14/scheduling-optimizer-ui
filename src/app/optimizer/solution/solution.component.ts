import { Router } from '@angular/router';
import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';

import { ChartType } from 'angular-google-charts';
import { OrderService } from '../services/order.service';
import { Order } from 'src/app/models/order.model';
//import resultPayload from '../../../result_payload.json';

@Component({
  selector: 'app-solution',
  templateUrl: './solution.component.html',
  styleUrls: ['./solution.component.css'],
})
export class SolutionComponent {

  chartType: ChartType;
  myFormatters: any;

  order: Order;

  solutionsData: Array<Array<Array<any>>>;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private orderService: OrderService,
    private router: Router,
    public dialog: MatDialog
  ) {

    this.order = this.orderService.getOrder();
    if (this.order == null) {
      this.router.navigateByUrl('optimizer/problem');
    }

    this.solutionsData = [];

    this.chartType = ChartType.Timeline;

    this.order.solutions.forEach(solution => {
      const currSolutionData = [];

      solution.stations.forEach(station => {
        station.machines.forEach((machine, index) => {
          machine.operations.forEach(operation => {
            currSolutionData.push([
              station.machines.length > 1 ? machine.name + ' ' + (index + 1) : machine.name,
              operation.job,
              operation.startTime * 1000,
              operation.endTime * 1000
            ]);
          });
        });
      });

      this.solutionsData.push(currSolutionData);
    });

  }

}
