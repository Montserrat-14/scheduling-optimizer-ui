import { Component, OnInit } from '@angular/core';
import { ProblemService } from '../problem.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  providers: [ProblemService],
})
export class MainComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
