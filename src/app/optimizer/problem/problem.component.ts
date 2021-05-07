import { ResourcesComponent as ResourceComponent } from '../resource/resource.component';
import {
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';

import { DescriptionComponent } from '../description/description.component';
import { DurationComponent } from '../duration/duration.component';
import { EvaluationComponent } from '../evaluation/evaluation.component';
import { LoadingDialogComponent } from '../loading-dialog/loading-dialog.component';
import { ProblemService } from '../services/problem.service';

@Component({
  selector: 'app-problem',
  templateUrl: './problem.component.html',
  styleUrls: ['./problem.component.css'],
})
export class ProblemComponent implements OnInit, AfterViewInit {
  isLinear = true;

  @ViewChild(DescriptionComponent) descriptionComponent: DescriptionComponent;
  @ViewChild(ResourceComponent) resourcesComponent: ResourceComponent;
  @ViewChild(EvaluationComponent) evaluationComponent: EvaluationComponent;
  @ViewChild(DurationComponent) durationComponent: DurationComponent;

  get formDescription() {
    return this.descriptionComponent
      ? this.descriptionComponent.descriptionForm
      : null;
  }

  get formTasks() {
    return this.resourcesComponent
      ? this.resourcesComponent.resourcesForm
      : null;
  }

  get formEvaluation() {
    return this.evaluationComponent
      ? this.evaluationComponent.evaluationForm
      : null;
  }

  get formDuration() {
    return this.durationComponent ? this.durationComponent.durationForm : null;
  }

  constructor(
    public problemService: ProblemService,
    private fb: FormBuilder,
    private cd: ChangeDetectorRef,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.cd.detectChanges();
  }

  buildFullForm(): FormGroup {
    return this.fb.group({
      description: this.formDescription,
      tasks: this.resourcesComponent,
      evaluation: this.formEvaluation,
      duration: this.formDuration,
    });
  }

  getProblem(): void {
    const dialogRef = this.dialog.open(LoadingDialogComponent, {
      data: {
        code: 0
      },
      disableClose: true
    });

    this.problemService.getSolution(this.buildFullForm()).subscribe(
      (res) => {
        dialogRef.close();

        this.problemService.setProblem(res);

        this.router.navigateByUrl('/optimizer/solution');
      },
      (err) => {
        dialogRef.close();

        const errorDialog = this.dialog.open(LoadingDialogComponent, {
          data: {
            code: 500,
            title: 'Error',
            fstMsg: 'An error ocorred.',
            sndMsg: 'Please try again.',
          },
          disableClose: true
        });

      }
    );
  }
}
