
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subscriber } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TokenStorageService } from './token-storage.service';


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
export class AuthService {
  constructor(private http: HttpClient, private token : TokenStorageService) { }
  login(uName: string, uMail: string) {
   
    const userDto = {
    
      nom: uName,
      email : uMail
    }
    return new Observable<boolean>((observer)=>{
      
      this.http.post(`api/user/signin`, userDto,httpOptions).subscribe(result =>{
        observer.next(true);
        observer.complete();
        //isloggedin prend la valeur 1 lorsque la connexion réuissie
        this.token.setUser(result)
        
        localStorage.setItem("isLoggedIn","1");
        //console.log("le bon",result)
      }, error =>{
        observer.error(false);
        observer.complete();
        //isloggedin prend la valeur o lorsque la connexion échoue
        localStorage.setItem("isLoggedIn","0");
        console.log(error)
      });
   } );
   
      
  }
  register(uName: string, uForename: string,uMail: string){
    const registerData = {
      nom: uName,
      prenom: uForename,
      email : uMail
    }
    return new Observable<boolean> ( (observer)=>{
      this.http.post(`api/user/signup`, registerData,httpOptions).subscribe(result =>{
        observer.next(true);
        observer.complete();
      }, error =>{
        observer.error(false);
        observer.complete();
      });

    } );
  }

  logout(){
    return new Observable<boolean>((observer)=>{
      this.http.get(`${environment.AUTH_API}/user/logout`).subscribe(result=>{
        observer.next(true);
        observer.complete();

      }, error=>{
        observer.next(false);
        observer.complete();
      } );
       
    })
  }
}