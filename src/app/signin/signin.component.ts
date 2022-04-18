import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../_services/auth.service';
import { LoginService } from '../_services/login.service';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  form: any = {
    nom: null,
    email: null
  };
  user :  any ={
    id: null,
    nom: null,
    email: null
  }
  loginSubscription: Subscription = new Subscription;
  
  /**nom='';
  email='';*/
  //isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  isLoggedIn = false;
  usert : any;
  constructor(private authService: AuthService, private loginService : LoginService,private _router: Router,
    private token : TokenStorageService) { }
  ngOnInit(): void {
   // if (this.tokenStorage.getToken()) {
    //  this.isLoggedIn = true;
     // this.roles = this.tokenStorage.getUser().roles;
   // }
  }
  onSubmit(){
    const { nom, email } = this.form;
    this.authService.login(nom, email).subscribe(result=>
      {
        this.isLoggedIn = true;
        this.loginService.changeMessage(true);
        this.usert =this.token.getUser()
        console.log(this.usert.id);
        console.log(result)
        this._router.navigateByUrl('/home');
        //this.tokenStorage.saveToken(result.accessToken);
        //this.tokenStorage.saveUser(result);
        //this.reloadPage();
      },error=>{
        this.errorMessage = error.error.message;
        this.loginService.changeMessage(false);
        this.isLoginFailed = true;
      })
     /** data => { 
        //this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().roles;
        this.reloadPage();
      },
      err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    ); */
  }
  reloadPage(): void {
    window.location.reload();
  }
}
