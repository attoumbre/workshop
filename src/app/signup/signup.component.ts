import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  form: any = {
    nom: null,
    prenom: null,
    email: null
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  constructor(private authService: AuthService, private _router: Router) { }
  ngOnInit(): void {
  }
  onSubmit(): void {
    const { nom, prenom, email } = this.form;
    this.authService.register(nom,prenom, email).subscribe(
      data => {
        this._router.navigateByUrl('/signin');
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
      },
      err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    );
  }

}
