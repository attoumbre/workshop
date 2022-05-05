import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError as observableThrowError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { SectionService } from 'src/app/_services/section.service';

const httpOptions = {
  headers: new HttpHeaders({ 
    
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '',
    'Access-Control-Allow-Methods': 'GET, POST, PATCH, DELETE, PUT, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With'
  })
};
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  

  
  constructor(private http: HttpClient, private section : SectionService) { }

 
  getApi(id: any): Observable<any> {
    return this.http.get<any>(`api/sections/recup/${id}`,httpOptions)

  }

  /* Handle request error */
  private handleError(res: HttpErrorResponse){
    return observableThrowError(res.error || 'Server error');
  }
}