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

import { DurationComponent } from '../duration/duration.component';
import { LoadingDialogComponent } from '../loading-dialog/loading-dialog.component';
import { OrderComponent } from '../order/order.component';
import { OperationsComponent } from '../operations/operations.component';
import { OptimizationComponent } from '../optimization/optimization.component';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-problem',
  templateUrl: './problem.component.html',
  styleUrls: ['./problem.component.css'],
})
export class ProblemComponent implements OnInit, AfterViewInit {
  isLinear = true;

  @ViewChild(OrderComponent) descriptionComponent: OrderComponent;
  @ViewChild(ResourceComponent) resourcesComponent: ResourceComponent;
  @ViewChild(OperationsComponent) operationsComponent: OperationsComponent
  @ViewChild(OptimizationComponent) optimizationComponent: OptimizationComponent;
  @ViewChild(DurationComponent) durationComponent: DurationComponent;

  get formDescription() {
    return this.descriptionComponent
      ? this.descriptionComponent.orderForm
      : null;
  }

  get formResources() {
    return this.resourcesComponent
      ? this.resourcesComponent.resourcesForm
      : null;
  }

  get formOperations() {
    return this.operationsComponent
      ? this.operationsComponent.operationsForm
      : null;
  }

  get formOptimization() {
    return this.optimizationComponent
      ? this.optimizationComponent.optimizationForm
      : null;
  }

  get formDuration() {
    return this.durationComponent ? this.durationComponent.durationForm : null;
  }

  constructor(
    public orderService: OrderService,
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
      resources: this.formResources,
      operations: this.formOperations,
      optimization: this.formOptimization,
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

    this.orderService.getSolution(this.buildFullForm()).subscribe(
      (res) => {
        dialogRef.close();

        this.orderService.setOrder(res);

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
