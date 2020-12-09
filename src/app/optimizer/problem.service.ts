import { environment } from './../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
    'Access-Control-Allow-Origin': '*',
  })
};

@Injectable()
export class ProblemService {
  private solutionsArray = new Subject<Array<Array<number>>>();
  solutionsArray$ = this.solutionsArray.asObservable();

  private objectivesArray = new Subject<Array<Array<number>>>();
  objectivesArray$ = this.objectivesArray.asObservable();

  private solutionsFile = new Subject<Array<Array<number>>>();
  solutionsFile$ = this.solutionsFile.asObservable();

  private objectivesFile = new Subject<Array<Array<number>>>();
  objectivesFile$ = this.objectivesFile.asObservable();

  constructor(private http: HttpClient) {}

  getSolution(
    fullForm: FormGroup
  ): Observable<{
    solutions: Array<Array<number>>;
    objectives: Array<Array<number>>;
    solutionsFile: string;
    objectivesFile: string;
  }> {
    const bodyPayload = this.buildBodyPayload(fullForm);

    return this.http.post(environment.baseUrl + 'problem', bodyPayload, httpOptions)
      .pipe(
        map(resp => {
          console.log(resp);

          const finalobject = {
            solutions: [],
            objectives: [],
            solutionsFile: '',
            objectivesFile: ''
          };

          return finalobject;
        })
      )
  }

  buildBodyPayload(fullForm: FormGroup) {
    return {}
  }
}
