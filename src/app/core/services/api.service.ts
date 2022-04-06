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
     */
    return this.http
      .get<Array<{}>>(this.apiRoot)
      .pipe(map(data => data), catchError(this.handleError));
  }

  /* Handle request error */
  private handleError(res: HttpErrorResponse){
    return observableThrowError(res.error || 'Server error');
  }
}