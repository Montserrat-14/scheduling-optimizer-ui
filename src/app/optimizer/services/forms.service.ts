import { Injectable } from '@angular/core';
import { FormArray } from '@angular/forms';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormsService {
  private currentJobs = new Subject<FormArray>();
  currentJobs$ = this.currentJobs.asObservable();

  constructor() { }

  setJobs(jobs: FormArray): void {
    this.currentJobs.next(jobs);
  }
}
