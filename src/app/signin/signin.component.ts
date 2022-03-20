import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
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
  /**nom='';
  email='';*/
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  constructor(private authService: AuthService, private tokenStorage: TokenStorageService) { }
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
        //this.tokenStorage.saveToken(result.accessToken);
        this.tokenStorage.saveUser(result);
        //this.reloadPage();
      },error=>{
        this.errorMessage = error.error.message;
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
