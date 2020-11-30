import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { ProblemComponent } from './problem/problem.component';
import { SolutionComponent } from './solution/solution.component';

const routes: Routes = [
  {
    path: '', component: MainComponent, children: [
      { path: '', pathMatch: 'full', redirectTo: 'problem' },
      { path: 'problem', component: ProblemComponent },
      { path: 'solution', component: SolutionComponent },
      { path: '**', redirectTo: 'problem' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OptimizerRoutingModule { }
