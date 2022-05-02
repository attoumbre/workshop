import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../_services/login.service';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {
  constructor(private token : TokenStorageService, private _router : Router){
    this.token.logout();
    this._router.navigateByUrl('/signin')
  }
  ngOnInit(): void {
  }

  

 
}

