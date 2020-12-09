import { NgModule } from '@angular/core';

import { OptimizerRoutingModule } from './optimizer-routing.module';
import { VariablesComponent } from './variables/variables.component';
import { EvaluationComponent } from './evaluation/evaluation.component';
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
import { DescriptionComponent } from './description/description.component';
import { CommonModule } from '@angular/common';

import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import {MatSliderModule} from '@angular/material/slider';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    VariablesComponent,
    EvaluationComponent,
    DurationComponent,
    ConfirmationComponent,
    SolutionComponent,
    MainComponent,
    ProblemComponent,
    DescriptionComponent,
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
    MatSliderModule
  ],
})
export class OptimizerModule {}
