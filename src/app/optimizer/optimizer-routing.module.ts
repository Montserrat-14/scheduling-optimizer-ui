import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { DurationComponent } from './duration/duration.component';
import { EvaluationComponent } from './evaluation/evaluation.component';
import { HomeComponent } from './home/home.component';
import { MainComponent } from './main/main.component';
import { SolutionComponent } from './solution/solution.component';
import { VariablesComponent } from './variables/variables.component';

const routes: Routes = [
  {
    path: '', component: MainComponent, children: [
      { path: '', pathMatch: 'full', redirectTo: 'home' },
      { path: 'home', component: HomeComponent },
      { path: 'variables', component: VariablesComponent },
      { path: 'evaluation', component: EvaluationComponent },
      { path: 'duration', component: DurationComponent },
      { path: 'confirmation', component: ConfirmationComponent },
      { path: 'solution', component: SolutionComponent },
      { path: '**', redirectTo: 'home' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OptimizerRoutingModule { }
