
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subscriber } from 'rxjs';
const AUTH_API = 'http://localhost:8080/';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }
  login(uName: string, uMail: string) {

    const loginData = {
      username: uName,
      email : uMail
    }
    return new Observable<boolean>((observer)=>{
      this.http.post(AUTH_API + 'signin', loginData).subscribe(result =>{
        observer.next(true);
        observer.complete();
      }, error =>{
        observer.error(false);
        observer.complete();
      });
   } );
      
  }
  register(username: string, email: string, password: string): Observable<any> {
    return this.http.post(AUTH_API + 'signup', {
      username,
      email,
      password
    }, httpOptions);
  }
}