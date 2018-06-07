import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {Router} from "@angular/router";
import { AuthService } from '../core/auth.service';

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.css']
})
export class AuthorizationComponent implements OnInit {

  user: Observable<any>;
  email: string;
  emailSent = false;
  errorMessage: string;

  constructor(private router: Router, public auth: AuthService) {
  }

  ngOnInit() {

  }

  login(){
    console.log(this.auth);
    this.auth.googleLogin();
  }
}
