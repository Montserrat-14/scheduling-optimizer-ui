import { ProblemService } from './../problem.service';
import { Router } from '@angular/router';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Problem } from 'src/app/models/problem.model';
import { Result } from 'src/app/models/result.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

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

  constructor(private problemService: ProblemService, private router: Router) {
    this.problem = this.problemService.getProblem();
    if (this.problem == null) {
      this.router.navigateByUrl('optimizer/problem');
    }
  }

  ngOnInit(): void {
    this.solutionColumns = this.getSolutionColumns(this.problem.results);
    this.solutionVarColumns = this.solutionColumns.slice(1);
    this.objectiveColumns = this.getObjectiveColumns(this.problem.results);
    this.objectiveVarColumns = this.objectiveColumns.slice(1)
    this.dataSource = new MatTableDataSource<Result>(this.problem.results);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  private getSolutionColumns(results: Array<Result>) {
    const result = ["Nr."];

    if (results.length > 0) {
      results[0].solution.variables.forEach((variable) => {
        result.push(variable.name);
      });

    }

    return result;
  }

  private getObjectiveColumns(results: Array<Result>) {
    const result = ["Nr."];

    if (results.length > 0) {
      results[0].solution.variables.forEach((variable) => {
        result.push('Quality ' + variable.name);
      });

    }

    return result;
  }
}
