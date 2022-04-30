import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoginService } from './_services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'workshop';
  isLoggedIn = false;
  loginSubscription: Subscription = new Subscription;
  constructor(private loginService: LoginService){
    this.loginSubscription = this.loginService.currentState.subscribe(state => this.isLoggedIn = state);
  }

  
  
  connectionState(event : any){
    alert(event);
    this.isLoggedIn = event.target;
  }
}
