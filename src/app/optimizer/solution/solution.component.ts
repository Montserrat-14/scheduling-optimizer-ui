import { ResultService } from './../services/result.service';
import { ProblemService } from '../services/problem.service';
import { Router } from '@angular/router';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Problem } from 'src/app/models/problem.model';
import { Result } from 'src/app/models/result.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { LoadingDialogComponent } from '../loading-dialog/loading-dialog.component';

import * as fileSaver from 'file-saver';

@Component({
  selector: 'app-solution',
  templateUrl: './solution.component.html',
  styleUrls: ['./solution.component.css'],
})
export class SolutionComponent implements OnInit, AfterViewInit {
  problem: Problem;
  solutionColumns: Array<string>;
  solutionVarColumns: Array<string>;
  objectiveColumns: Array<string>;
  objectiveVarColumns: Array<string>;
  dataSource: MatTableDataSource<Result>;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private problemService: ProblemService,
    private router: Router,
    private resultService: ResultService,
    public dialog: MatDialog
  ) {
    this.problem = this.problemService.getProblem();
    if (this.problem == null) {
      this.router.navigateByUrl('optimizer/problem');
    }
  }

  ngOnInit(): void {
    this.solutionColumns = this.getSolutionColumns(this.problem.results);
    this.solutionVarColumns = this.solutionColumns.slice(1);
    this.objectiveColumns = this.getObjectiveColumns(this.problem.results);
    this.objectiveVarColumns = this.objectiveColumns.slice(1);
    this.dataSource = new MatTableDataSource<Result>(this.problem.results);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  private getSolutionColumns(results: Array<Result>) {
    const result = ['Nr.'];

    if (results.length > 0) {
      results[0].solution.variables.forEach((variable) => {
        result.push(variable.name);
      });
    }

    return result;
  }

  private getObjectiveColumns(results: Array<Result>) {
    const result = ['Nr.'];

    if (results.length > 0) {
      results[0].objective.variables.forEach((variable, index) => {
        result.push('Quality ' + index);
      });
    }

    return result;
  }

  downloadFile(type: string) {
    this.resultService.downloadFile(this.problem.id, type).subscribe(
      (res) => {
        const filename = res.headers.get('filename');

        this.saveFile(res.body, filename);
      },
      (err) => {
        const errorDialog = this.dialog.open(LoadingDialogComponent, {
          data: {
            code: 500,
            title: 'Error',
            fstMsg: 'An error ocorred.',
            sndMsg: 'Please try again.',
          },
        });
      }
    );
  }

  saveFile(data: any, filename?: string) {
    const blob = new Blob([data], {type: 'text/csv; charset=utf-8'});
    fileSaver.saveAs(blob, filename);
  }
}
