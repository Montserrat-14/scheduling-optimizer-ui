import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DescriptionComponent } from '../description/description.component';
import { DurationComponent } from '../duration/duration.component';
import { EvaluationComponent } from '../evaluation/evaluation.component';
import { ProblemService } from '../problem.service';
import { VariablesComponent } from '../variables/variables.component';

@Component({
  selector: 'app-problem',
  templateUrl: './problem.component.html',
  styleUrls: ['./problem.component.css'],
  providers: [ProblemService],
})
export class ProblemComponent implements OnInit {
  isLinear = true;

  @ViewChild(DescriptionComponent) descriptionComponent: DescriptionComponent;
  @ViewChild(VariablesComponent) variablesComponent: VariablesComponent;
  @ViewChild(EvaluationComponent) evaluationComponent: EvaluationComponent;
  @ViewChild(DurationComponent) durationComponent: DurationComponent;

  get formDescription() {
    return this.descriptionComponent
      ? this.descriptionComponent.descriptionForm
      : null;
  }

  get formVariables() {
    return this.variablesComponent
      ? this.variablesComponent.variablesForm
      : null;
  }

  constructor(public problemService: ProblemService) {}

  ngOnInit(): void {}
}
