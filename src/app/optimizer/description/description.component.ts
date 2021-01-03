import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.css']
})
export class DescriptionComponent implements OnInit {
  public descriptionForm: FormGroup;

  constructor(
    private _formBuilder: FormBuilder
  ) {
    this.descriptionForm = this._formBuilder.group({
      name: ['', Validators.required],
      description: ['', [Validators.required, Validators.maxLength(200)]]
    }, { updateOn: 'blur' });
  }

  ngOnInit(): void {
  }

}
