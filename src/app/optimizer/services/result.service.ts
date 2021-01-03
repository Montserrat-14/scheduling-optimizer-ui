import { Observable } from 'rxjs';
import { environment } from './../../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import * as fileSaver from 'file-saver';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
    'Access-Control-Allow-Origin': '*',
  })
};

@Injectable()
export class ResultService {

  constructor(private http: HttpClient) { }

  downloadFile(id: number, type: string): Observable<HttpResponse<string>> {
    let params = new HttpParams().set('type', type);

    httpOptions.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
      'Access-Control-Allow-Origin': '*',
      'Accept': 'text/csv; charset=utf-8'
    });

    return this.http.get(`${environment.baseUrl}file/${id}`, {
      headers: httpOptions.headers,
      params,
      observe: 'response',
      responseType: 'text'
    });
  }
}
