import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export interface Objective {
  name: string,
  value: string
}

@Component({
  selector: 'app-optimization',
  templateUrl: './optimization.component.html',
  styleUrls: ['./optimization.component.css']
})
export class OptimizationComponent implements OnInit {
  public optimizationForm: FormGroup;

  readonly OBJECTIVES: Array<Objective> = [
    { name: "Total Time", value: "totalTime" },
    { name: "Total Cost", value: "cost" }
  ];

  constructor(
    private _formBuilder: FormBuilder
  ) {
    this.optimizationForm = this._formBuilder.group({
      evaluationPoints: [[], Validators.required],
    }, { updateOn: 'blur' });
  }

  ngOnInit(): void {
  }

}
