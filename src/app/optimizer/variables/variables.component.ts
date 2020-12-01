import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-variables',
  templateUrl: './variables.component.html',
  styleUrls: ['./variables.component.css']
})
export class VariablesComponent implements OnInit {
  public variablesForm: FormGroup;

  constructor(
    private _formBuilder: FormBuilder
  ) {
    this.variablesForm = this._formBuilder.group({
      objectives: ['', Validators.required],
      variables: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

}
