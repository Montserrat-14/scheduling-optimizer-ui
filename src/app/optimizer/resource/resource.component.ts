import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-resource',
  templateUrl: './resource.component.html',
  styleUrls: ['./resource.component.css']
})
export class ResourcesComponent implements OnInit {

  public readonly RESOURCE_TYPES: Array<{ viewValue: string, value: string }> =
  [
    { viewValue: 'Machines', value: 'Machines' },
    { viewValue: 'Employees', value: 'Employees' }
  ];

  public resourcesForm: FormGroup;
  resourcesArrayForm$: Observable<any>;
  private _resourcesArrayForm: FormArray;

  public get resourcesArrayForm(): FormArray {
    return this.resourcesForm.get('resources') as FormArray;
  }
  public set resourcesArrayForm(value: FormArray) {
    this._resourcesArrayForm = value;
  }

  constructor(private _formBuilder: FormBuilder) {
    this.resourcesForm = this._formBuilder.group({
      type: [null, [Validators.required]],
      resources: this._formBuilder.array([])
    },
    { updateOn:'blur' });

    this.resourcesArrayForm$ = this.resourcesArrayForm.valueChanges;
  }

  ngOnInit(): void {
    if (this.resourcesArrayForm.controls.length === 0) {
      this.resourcesArrayForm = this.resourcesForm.get('resources') as FormArray;
      this.resourcesArrayForm.push(this.createResourceItem());
    }
  }

  createResourceItem(): FormGroup {
    return this._formBuilder.group(
      {
        name: [null, [Validators.required, Validators.maxLength(23)]],
        quantity: [null, [Validators.required]],
        cost: [null, [Validators.required]],
        description: [null],
      },
      {
        updateOn: 'blur'
      }
    )
  }

  addRow(): void {
    this.checkAllFormControls(this.resourcesArrayForm);
    if (this.resourcesArrayForm.valid) {
      this.resourcesArrayForm = this.resourcesForm.get('array') as FormArray;
      this.resourcesArrayForm.push(this.createResourceItem());
    }
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

  deleteRow(index: number): void {
    if (this.resourcesArrayForm.controls.length > 1) {
      this.resourcesArrayForm.removeAt(index);
    }
  }

}
