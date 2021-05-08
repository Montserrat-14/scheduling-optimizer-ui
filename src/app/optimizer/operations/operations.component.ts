import { FormsService } from './../services/forms.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

export interface Resource {
  id: string;
  name: string;
  quantity: number;
  cost: number;
  description?: string;
}

export interface Job {
  name: string;
  description: string;
}

export interface Operation {
  machineId: number,
  machineName?: string,
  estimatedTime: number,
}

@Component({
  selector: 'app-operations',
  templateUrl: './operations.component.html',
  styleUrls: ['./operations.component.css'],
})
export class OperationsComponent implements OnInit, OnDestroy {
  public operationsForm: FormGroup;
  operationsArrayForm$: Observable<any>;
  private _operationsArrayForm: FormArray;

  public get operationsArrayForm(): FormArray {
    return this.operationsForm.get('jobOperations') as FormArray;
  }
  public set operationsArrayForm(value: FormArray) {
    this._operationsArrayForm = value;
  }

  currentResources: Array<Resource> = [];
  selectedResources: Array<number> = [];

  selectedTimes: Array<number>;

  private jobsSubscription: Subscription;
  private resourcesSubscription: Subscription;

  constructor(
    private _formBuilder: FormBuilder,
    private formsService: FormsService
  ) {
    this.operationsForm = this._formBuilder.group(
      {
        jobOperations: this._formBuilder.array([]),
      },
      { updateOn: 'blur' }
    );

    this.operationsArrayForm$ = this.operationsArrayForm.valueChanges;
  }

  ngOnInit(): void {
    this.jobsSubscription = this.formsService.currentJobs$
      .pipe(filter((jobs) => jobs != null))
      .subscribe((jobs) => {
        this.operationsForm.setControl(
          'jobOperations',
          this._formBuilder.array([])
        );

        this.operationsArrayForm = this.operationsForm.get(
          'jobOperations'
        ) as FormArray;

        const currentJobs = ((jobs as unknown) as Array<Job>);

        currentJobs.forEach((job) => {
          this.operationsArrayForm.push(
            this.createJobItem(job.name, job.description)
          );
        });

        this.clearSelectedTimesResources();
        this.clearAllOperations();
      });

    this.resourcesSubscription = this.formsService.currentResources$
      .pipe(filter((resources) => resources != null))
      .subscribe((resources) => {
        const currResources = (resources as unknown) as Array<Resource>
        this.currentResources = currResources;

        this.clearSelectedTimesResources();
        this.clearAllOperations();
      });
  }

  clearAllOperations() {
    this.operationsArrayForm.controls.forEach(jobs => {
      jobs.get('operations').patchValue([]);
    });
  }

  clearSelectedTimesResources() {
    this.selectedTimes = new Array<number>(this.operationsArrayForm.controls.length);
    this.selectedResources = new Array<number>(this.operationsArrayForm.controls.length);
  }

  createJobItem(name: string, description?: string): FormGroup {
    return this._formBuilder.group(
      {
        name: [name, [Validators.required, Validators.maxLength(23)]],
        operations: [[], [Validators.required]],
        description: [description ? description : null],
      },
      {
        updateOn: 'blur',
      }
    );
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

  addOperation(index: number) {
    const currentOperations = this.operationsArrayForm.at(index).get('operations').value as Array<Operation>;
    if (this.selectedResources[index] != null && this.selectedTimes[index] != null) {
      currentOperations.push({
        machineId: this.selectedResources[index],
        estimatedTime: this.selectedTimes[index]
      })
      this.operationsArrayForm.at(index).get('operations').patchValue(currentOperations);
    }
  }

  setSelectedTimes(event: Event, index: number) {
    console.log(event);
    this.selectedTimes[index] = Number((event.target as HTMLInputElement).value)
  }

  drop(event: CdkDragDrop<Operation[]>, operations: Operation[]) {
    moveItemInArray(operations, event.previousIndex, event.currentIndex);
  }

  ngOnDestroy() {
    if (this.jobsSubscription) {
      this.jobsSubscription.unsubscribe();
    }
    if (this.resourcesSubscription) {
      this.resourcesSubscription.unsubscribe();
    }
  }
}
