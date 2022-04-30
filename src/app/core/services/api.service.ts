import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError as observableThrowError } from 'rxjs';
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

 /* Get Api Data from mock service */
  getApi(id: any) {
    return this.http.get<Array<{}>>(`api/sections/recup/${id}`,httpOptions)
    .pipe(map(data => data), catchError(this.handleError))
    /**
     *  return new Observable<boolean>((observer)=>{
      je dois passer l'id de tableau et l'id de l'utilisateur
      this.http.get(`api/user/signin`, userDto).subscribe(result =>{
        observer.next(true);
        observer.complete();
        //isloggedin prend la valeur 1 lorsque la connexion réuissie
        localStorage.setItem("user",JSON.stringify(result))
        localStorage.setItem("isLoggedIn","1");
        //console.log(result)
      }, error =>{
        observer.error(false);
        observer.complete();
        //isloggedin prend la valeur o lorsque la connexion échoue
        localStorage.setItem("isLoggedIn","0");
        console.log(error)
      });
   } );
     

    return this.http
      .get<Array<{}>>(this.apiRoot)
      .pipe(map(data => data), catchError(this.handleError));*/
    
  }

  /* Handle request error */
  private handleError(res: HttpErrorResponse){
    return observableThrowError(res.error || 'Server error');
  }
}