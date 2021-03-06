import { NgModule } from '@angular/core';

import { OptimizerRoutingModule } from './optimizer-routing.module';
import { DurationComponent } from './duration/duration.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { SolutionComponent } from './solution/solution.component';
import { MainComponent } from './main/main.component';
import { ProblemComponent } from './problem/problem.component';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { LoadingDialogComponent } from './loading-dialog/loading-dialog.component';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { MatPaginatorModule } from '@angular/material/paginator';
import { ResourcesComponent } from './resource/resource.component';
import { MatIconModule } from '@angular/material/icon';
import { OrderComponent } from './order/order.component';

import { MatExpansionModule } from '@angular/material/expansion';

import { DragDropModule } from '@angular/cdk/drag-drop';
import { OperationsComponent } from './operations/operations.component';
import { OptimizationComponent } from './optimization/optimization.component';

import { MatListModule } from '@angular/material/list';
import { GoogleChartsModule } from 'angular-google-charts';

@NgModule({
  declarations: [
    OptimizationComponent,
    DurationComponent,
    ConfirmationComponent,
    SolutionComponent,
    MainComponent,
    ProblemComponent,
    OrderComponent,
    LoadingDialogComponent,
    ResourcesComponent,
    OperationsComponent,
  ],
  imports: [
    CommonModule,
    OptimizerRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatStepperModule,
    MatButtonModule,
    MatTableModule,
    MatSelectModule,
    MatSliderModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatIconModule,
    MatExpansionModule,
    DragDropModule,
    MatListModule,
    GoogleChartsModule
  ],
})
export class OptimizerModule {}
