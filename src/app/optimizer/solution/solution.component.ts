import { ResultService } from './../services/result.service';
import { ProblemService } from '../services/problem.service';
import { Router } from '@angular/router';
import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';

import { ChartType } from 'angular-google-charts';

@Component({
  selector: 'app-solution',
  templateUrl: './solution.component.html',
  styleUrls: ['./solution.component.css'],
})
export class SolutionComponent {

  chartType: ChartType;
  myData: any;
  myFormatters: any;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private problemService: ProblemService,
    private router: Router,
    private resultService: ResultService,
    public dialog: MatDialog
  ) {
    this.chartType = ChartType.Timeline;

    this.myData = [
      ['London', 1, 3],
      ['New York', 1, 3],
      ['Paris', 1, 3],
      ['Berlin', 1, 3],
      ['Kairo', 1, 3],
    ];

  }

}
