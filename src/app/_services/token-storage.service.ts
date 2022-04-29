import { Injectable } from '@angular/core';
const TOKEN_KEY = 'auth-token';
const USER_KEY = 'user';
@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  constructor() { }
  signOut(): void {
    window.sessionStorage.clear();
  }
  public saveToken(token_key:string,token: string): void {
    window.sessionStorage.removeItem(token_key);
    window.sessionStorage.setItem(token_key, token);
  }
  public getToken(token_key: string): any {
    return window.sessionStorage.getItem(token_key);
  }
  public saveUser(user: any): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }
  public setUser(user : any): void{
    //localStorage.setItem(USER_KEY,JSON.stringify(user))
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY,JSON.stringify(user))
  }
  public getUser(): any {
    //const user = window.sessionStorage.getItem(USER_KEY);
    var user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }
    return {};
  }
}