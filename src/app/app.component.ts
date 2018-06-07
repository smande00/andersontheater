import {Component, OnInit} from '@angular/core';
import {AuthService, User} from './core/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Anderson Theater';
  loggedInUser:User;
  constructor( public auth: AuthService) {
    this.auth.user.subscribe((value) =>{
      this.loggedInUser=value;
    });
  }

  login() {
    this.auth.googleLogin();
  }

  logout(){
    this.auth.signOut();
  }
  ngOnInit(): void {

  }

}
