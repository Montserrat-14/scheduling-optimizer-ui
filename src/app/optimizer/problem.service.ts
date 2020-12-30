import { environment } from './../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Problem } from '../models/problem.model';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
    'Access-Control-Allow-Origin': '*',
  })
};

@Injectable()
export class ProblemService {
  private problem = new BehaviorSubject<Problem>(null);
  problem$ = this.problem.asObservable();

  constructor(private http: HttpClient) {}

  getSolution(
    fullForm: FormGroup
  ): Observable<Problem> {
    const bodyPayload = this.buildBodyPayload(fullForm);

    return this.http.post(environment.baseUrl + 'problem', bodyPayload, httpOptions)
      .pipe(
        map(resp => {
          const problem = new Problem().deserialize(resp)
          console.log(problem);
          return problem;
        }))
  }

  buildBodyPayload(fullForm: FormGroup) {
    const formValue = fullForm.value;

    formValue.variables.variables.forEach(element => {
      Object.assign(element, {type: formValue.variables.type});
    });

    const payload = {
      name: formValue.description.name ? formValue.description.name : '',
      description: formValue.description.description ? formValue.description.description : '',
      nObjectives: formValue.variables.objectives ? formValue.variables.objectives : null,
      listOfVariables: formValue.variables.variables ? formValue.variables.variables : [],
      endpoint: formValue.evaluation.endpoint ? formValue.evaluation.endpoint : '',
      payload: formValue.evaluation.payload ? formValue.evaluation.payload : '',
      duration: formValue.duration.duration ? formValue.duration.duration : null,
    };

    return payload;
  }

  setProblem(problem: Problem): void {
    this.problem.next(problem);
  }

  getProblem(): Problem {
    return this.problem.getValue();
  }
}
