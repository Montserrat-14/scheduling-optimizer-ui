import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { FormsService } from '../services/forms.service';

@Component({
  selector: 'app-resource',
  templateUrl: './resource.component.html',
  styleUrls: ['./resource.component.css'],
})
export class ResourcesComponent implements OnInit, OnDestroy {
  public readonly RESOURCE_TYPES: Array<{
    viewValue: string;
    value: string;
  }> = [
    { viewValue: 'Machines', value: 'Machines' },
    { viewValue: 'Employees', value: 'Employees' },
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

  private resourceSubscription: Subscription;

  constructor(
    private _formBuilder: FormBuilder,
    private formsService: FormsService
  ) {
    this.resourcesForm = this._formBuilder.group(
      {
        type: [null, [Validators.required]],
        resources: this._formBuilder.array([]),
      },
      { updateOn: 'blur' }
    );

    this.resourcesArrayForm$ = this.resourcesArrayForm.valueChanges;
  }

  ngOnInit(): void {
    if (this.resourcesArrayForm.controls.length === 0) {
      this.resourcesArrayForm = this.resourcesForm.get(
        'resources'
      ) as FormArray;
      this.resourcesArrayForm.push(this.createResourceItem());
    }

    this.resourceSubscription = this.resourcesArrayForm$.subscribe(
      (resources: FormArray) => {
        this.patchResourcesId();
        this.formsService.setResources(resources);
      }
    );
  }

  private patchResourcesId() {
    this.resourcesArrayForm.controls.forEach((control, index) => {
      control.patchValue({
        id: index
      }, { emitEvent: false });
    });
  }

  private createResourceItem(): FormGroup {
    const currentId = this.resourcesArrayForm.controls.length - 1;
    const formGroup = this._formBuilder.group(
      {
        id: [currentId],
        name: [null, [Validators.required, Validators.maxLength(23)]],
        quantity: [null, [Validators.required]],
        cost: [null, [Validators.required]],
        description: [null],
      },
      {
        updateOn: 'blur',
      }
    );
    return formGroup;
  }

  addRow(): void {
    this.checkAllFormControls(this.resourcesArrayForm);
    if (this.resourcesArrayForm.valid) {
      this.resourcesArrayForm = this.resourcesForm.get('array') as FormArray;
      this.resourcesArrayForm.push(this.createResourceItem());
    }
  }

  private checkAllFormControls(group: FormGroup | FormArray) {
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

  ngOnDestroy() {
    if (this.resourceSubscription) this.resourceSubscription.unsubscribe();
  }
}
