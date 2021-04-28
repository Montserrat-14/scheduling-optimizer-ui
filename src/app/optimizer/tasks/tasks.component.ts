import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  public tasksForm: FormGroup;
  tasksArrayForm$: Observable<any>;
  private _tasksArrayForm: FormArray;

  public get tasksArrayForm(): FormArray {
    return this.tasksForm.get('tasks') as FormArray;
  }
  public set tasksArrayForm(value: FormArray) {
    this._tasksArrayForm = value;
  }

  constructor(private _formBuilder: FormBuilder) {
    this.tasksForm = this._formBuilder.group({
      tasks: this._formBuilder.array([])
    },
    { updateOn:'blur' });

    this.tasksArrayForm$ = this.tasksArrayForm.valueChanges;
  }

  ngOnInit(): void {
    if (this.tasksArrayForm.controls.length === 0) {
      this.tasksArrayForm = this.tasksForm.get('tasks') as FormArray;
      this.tasksArrayForm.push(this.createTaskItem());
    }
  }

  createTaskItem(): FormGroup {
    return this._formBuilder.group(
      {
        name: [null, [Validators.required, Validators.maxLength(23)]],
        duration: [null, [Validators.required]],
        description: [null],
      },
      {
        updateOn: 'blur'
      }
    )
  }

  addRow(): void {
    this.checkAllFormControls(this.tasksArrayForm);
    if (this.tasksArrayForm.valid) {
      this.tasksArrayForm = this.tasksForm.get('array') as FormArray;
      this.tasksArrayForm.push(this.createTaskItem());
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
    if (this.tasksArrayForm.controls.length > 1) {
      this.tasksArrayForm.removeAt(index);
    }
  }

}
