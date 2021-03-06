import { FormsService } from './../services/forms.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit, OnDestroy {
  public orderForm: FormGroup;
  orderJobsArrayForm$: Observable<any>;
  private _orderJobsArrayForm: FormArray;

  public get orderJobsArrayForm(): FormArray {
    return this.orderForm.get('jobs') as FormArray;
  }
  public set orderJobsArrayForm(value: FormArray) {
    this._orderJobsArrayForm = value;
  }

  private jobsSubscription: Subscription;

  constructor(
    private _formBuilder: FormBuilder,
    private formsService: FormsService
  ) {
    this.orderForm = this._formBuilder.group({
      name: ['', Validators.required],
      description: ['', [Validators.required, Validators.maxLength(200)]],
      jobs: this._formBuilder.array([])
    }, { updateOn: 'blur' });

    this.orderJobsArrayForm$ = this.orderJobsArrayForm.valueChanges;
  }

  ngOnInit(): void {
    if (this.orderJobsArrayForm.controls.length === 0) {
      this.orderJobsArrayForm = this.orderForm.get('jobs') as FormArray;
      this.orderJobsArrayForm.push(this.createJobItem());
    }

    this.jobsSubscription = this.orderJobsArrayForm$.subscribe((jobs: FormArray) => {
      this.formsService.setJobs(jobs);
    });
  }

  createJobItem(): FormGroup {
    return this._formBuilder.group(
      {
        name: [null, [Validators.required, Validators.maxLength(23)]],
        description: [null],
      },
      {
        updateOn: 'blur'
      }
    )
  }

  addRow(): void {
    this.checkAllFormControls(this.orderJobsArrayForm);
    if (this.orderJobsArrayForm.valid) {
      this.orderJobsArrayForm = this.orderForm.get('array') as FormArray;
      this.orderJobsArrayForm.push(this.createJobItem());
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
    if (this.orderJobsArrayForm.controls.length > 1) {
      this.orderJobsArrayForm.removeAt(index);
    }
  }

  ngOnDestroy() {
    if (this.jobsSubscription) {
      this.jobsSubscription.unsubscribe();
    }
  }

}
