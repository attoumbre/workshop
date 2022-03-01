import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError as observableThrowError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  

  private apiRoot: string = 'https://run.mocky.io/v3/f9b663f5-bd1b-4efe-a8bc-354fb7f093e7'
  constructor(private http: HttpClient) { }

 /* Get Api Data from mock service */
  getApi() {
    return this.http
      .get<Array<{}>>(this.apiRoot)
      .pipe(map(data => data), catchError(this.handleError));
  }

  /* Handle request error */
  private handleError(res: HttpErrorResponse){
    return observableThrowError(res.error || 'Server error');
  }
}