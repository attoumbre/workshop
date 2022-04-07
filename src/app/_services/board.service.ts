import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
export class BoardService {

  constructor(private http: HttpClient) { }

  createBoard(bName: string){
    const data = {
      nom: bName 
    }
    console.log(data)
    return new Observable<boolean> ( (observer)=>{
      this.http.post(`api/tableau/create`, data,httpOptions).subscribe(result =>{
        observer.next(true);
        observer.complete();
      }, error =>{
        observer.error(false);
        observer.complete();
      });

    } );
  }
}