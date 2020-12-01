import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-duration',
  templateUrl: './duration.component.html',
  styleUrls: ['./duration.component.css']
})
export class DurationComponent implements OnInit {
  public durationForm: FormGroup;

  constructor(
    private _formBuilder: FormBuilder
  ) {
    this.durationForm = this._formBuilder.group({
      duration: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  formatLabel(value: number) {
    return value + ' m';
  }

}
