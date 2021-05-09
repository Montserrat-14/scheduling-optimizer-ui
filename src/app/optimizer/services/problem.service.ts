import { Operation } from 'src/app/interfaces/Operation';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Job } from 'src/app/interfaces/Job';
import { Resource } from 'src/app/interfaces/Resource';
import { environment } from 'src/environments/environment';
import { Problem } from '../../models/problem.model';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
    'Access-Control-Allow-Origin': '*',
  })
};

export interface ResourcePayload {
  type: string,
  resources: Array<Resource>
};

export interface OrderPayload {
  name: string,
  description: string,
  jobs: Array<Job>,
  objectives: any,
  duration: number
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

    return this.http.post(environment.baseUrl + 'sheduling', bodyPayload, httpOptions)
      .pipe(
        map(resp => {
          const problem = new Problem().deserialize(resp)
          console.log(problem);
          return problem;
        }))
  }

  buildBodyPayload(fullForm: FormGroup) {
    const payload = {
      order: this.buildOrderPayload(fullForm.value),
      resource: this.buildResourcePayload(fullForm.get('resources').value),
    };

    return payload;
  }

  buildOrderPayload(value: any): OrderPayload {
    let order: OrderPayload = {
      name: "",
      description: "",
      jobs: [],
      duration: 10,
      objectives: {}
    };

    const jobArray: Job[] = value.operations.jobOperations.map(job => job as Job);
    order.jobs = jobArray;

    order.name = value.description.name ? value.description.name : "Default Name";
    order.description = value.description.name ? value.description.name : "Default Name";
    order.duration = value.duration.duration ? value.duration.duration : 10;

    (value.optimization.evaluationPoints as Array<string>).forEach(ep => {
      order.objectives[ep] = true;
    });

    return order;
  }

  buildResourcePayload(resource: ResourcePayload): ResourcePayload {
    const currResource = resource;

    currResource.resources = resource.resources.filter(re =>
      re.id != null &&
      re.name != null &&
      re.cost != null &&
      re.quantity != null
    );

    return currResource;
  }

  setProblem(problem: Problem): void {
    this.problem.next(problem);
  }

  getProblem(): Problem {
    return this.problem.getValue();
  }
}
