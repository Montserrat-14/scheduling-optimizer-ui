import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProblemService } from '../problem.service';

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.css']
})
export class DescriptionComponent implements OnInit {
  public descriptionForm: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private problemService: ProblemService
  ) {
    this.descriptionForm = this._formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

}
