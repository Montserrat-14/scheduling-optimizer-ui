import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { isEmpty, map } from 'rxjs/operators';

@Component({
  selector: 'app-solution',
  templateUrl: './solution.component.html',
  styleUrls: ['./solution.component.css']
})
export class SolutionComponent implements OnInit {

  state$: Observable<object>;
  data: Object;
  stringData: String;

  constructor(private activatedRoute: ActivatedRoute, private router: Router) {
    this.state$ = this.activatedRoute.paramMap
    .pipe(map(() => window.history.state));

  }

  ngOnInit(): void {
    this.state$.subscribe(state => {
      if (state['solutions'] == null) {
        this.router.navigateByUrl('optimizer/problem');
      } else {
        this.data = state;
        this.stringData = JSON.stringify(this.data);
      }
    });
  }

}
