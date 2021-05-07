import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-operations',
  templateUrl: './operations.component.html',
  styleUrls: ['./operations.component.css']
})
export class OperationsComponent implements OnInit {
  private readonly MOCK_JOBS: Array<{ name: string, description?: string }> =
  [
    { name: 'Job1' },
    { name: 'Job2' },
    { name: 'Job3' },
  ]

  public operationsForm: FormGroup;
  operationsArrayForm$: Observable<any>;
  private _operationsArrayForm: FormArray;

  public get operationsArrayForm(): FormArray {
    return this.operationsForm.get('jobOperations') as FormArray;
  }
  public set operationsArrayForm(value: FormArray) {
    this._operationsArrayForm = value;
  }

  constructor(private _formBuilder: FormBuilder) {
    this.operationsForm = this._formBuilder.group({
      jobOperations: this._formBuilder.array([])
    },
    { updateOn:'blur' });

    this.operationsArrayForm$ = this.operationsArrayForm.valueChanges;
  }

  ngOnInit(): void {
    this.operationsArrayForm = this.operationsForm.get('resources') as FormArray;
    this.MOCK_JOBS.forEach(job => {
      this.operationsArrayForm.push(this.createJobItem(job.name, job.description));
    });
  }

  createJobItem(name: string, description?: string): FormGroup {
    return this._formBuilder.group(
      {
        name: [name, [Validators.required, Validators.maxLength(23)]],
        operations: [[], [Validators.required]],
        description: [description ? description : null],
      },
      {
        updateOn: 'blur'
      }
    )
  }

  checkAllFormControls(group: FormGroup | FormArray) {
    Object.keys(group.controls).forEach((key) => {
      const currControl = group.get(key);
      if (currControl instanceof FormGroup) {
        this.checkAllFormControls(currControl);
      } else {
        currControl.markAsDirty();
        currControl.updateValueAndValidity();
      }
    });
  }
}
