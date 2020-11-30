import { NgModule } from '@angular/core';

import { OptimizerRoutingModule } from './optimizer-routing.module';
import { HomeComponent } from './home/home.component';
import { VariablesComponent } from './variables/variables.component';
import { EvaluationComponent } from './evaluation/evaluation.component';
import { DurationComponent } from './duration/duration.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { SolutionComponent } from './solution/solution.component';


@NgModule({
  declarations: [HomeComponent, VariablesComponent, EvaluationComponent, DurationComponent, ConfirmationComponent, SolutionComponent],
  imports: [,
    OptimizerRoutingModule
  ]
})
export class OptimizerModule { }
