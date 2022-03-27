import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoginService } from 'src/app/_services/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isLoggedIn  = false;

  loginSubscription: Subscription = new Subscription;

  constructor(private loginService : LoginService) { 

  }

  ngOnInit(): void {
    this.loginSubscription = this.loginService.currentState.subscribe(state => this.isLoggedIn = state);
    localStorage.setItem("isLoggedIn", ""+this.isLoggedIn);
  }

}
