import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private messageSource = new BehaviorSubject(false);
  currentState = this.messageSource.asObservable();

  constructor() { }

  changeMessage(isLogin: boolean) {
    this.messageSource.next(isLogin)
  }}
