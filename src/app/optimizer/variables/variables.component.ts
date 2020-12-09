import { Observable, pipe, Subscription } from 'rxjs';
import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { distinctUntilChanged, filter, mapTo } from 'rxjs/operators';

interface DataType {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-variables',
  templateUrl: './variables.component.html',
  styleUrls: ['./variables.component.css']
})
export class VariablesComponent implements OnInit, AfterViewInit, OnDestroy {
  public variablesForm: FormGroup;
  variablesArrayForm$: Observable<any>;
  private _variablesArrayForm: FormArray;
  myDataSource: MatTableDataSource<any>;

  public get variablesArrayForm(): FormArray {
    return this.variablesForm.get('variables') as FormArray;
  }
  public set variablesArrayForm(value: FormArray) {
    this._variablesArrayForm = value;
  }

  displayedColumns: string[] = ['name', 'type', 'min', 'max', 'delete'];

  @ViewChild(MatTable) _matTable:MatTable<any>;

  subscription: Subscription;

  dataTypes: Array<DataType>;

  constructor(
    private _formBuilder: FormBuilder
  ) {
    this.dataTypes = [
      {value: 'int', viewValue: 'Integer'},
      {value: 'double', viewValue: 'Double'}
    ];

    this.variablesForm = this._formBuilder.group({
      objectives: ['', Validators.required],
      variables: this._formBuilder.array([])
    });

    this.variablesArrayForm$ = this.variablesArrayForm.valueChanges;

    this.myDataSource = new MatTableDataSource();

    if(this.subscription == null) {
      this.subscription = this.variablesArrayForm$
      .pipe(
        distinctUntilChanged()
      )
      .subscribe(data => {
        return this.myDataSource.data = data
      })
    }
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    if (this.variablesArrayForm.controls.length === 0) {
      this.variablesArrayForm = this.variablesForm.get('variables') as FormArray;
      this.variablesArrayForm.push(this.createVariableItem());
      this._matTable.renderRows();
    }
  }

  createVariableItem(): FormGroup {
    return this._formBuilder.group({
      name: [null, [Validators.required, Validators.maxLength(23)]],
      type: [null, Validators.required],
      min: [null, Validators.required],
      max: [null, Validators.required],
      description: [null]
    }, { updateOn: 'blur' });
  }

  addRow(): void {
    this.checkAllFormControls(this.variablesArrayForm);
    if (this.variablesArrayForm.valid) {
      this.variablesArrayForm = this.variablesForm.get('array') as FormArray;
      this.variablesArrayForm.push(this.createVariableItem());

    }
  }

  checkAllFormControls(group: FormGroup | FormArray) {
    Object.keys(group.controls).forEach(key => {
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
    if(this.variablesArrayForm.controls.length > 1) {
      this.variablesArrayForm.removeAt(index);
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
