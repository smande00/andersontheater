import {Component, OnInit} from '@angular/core';
import {AngularFireAuth} from "angularfire2/auth";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isLoggedIn:boolean=false;
  title = 'Anderson Theater';

  constructor(private afAuth: AngularFireAuth) {
  }


  ngOnInit(): void {
    console.log(this.isLoggedIn);
    console.log(this.afAuth.authState);
    this.afAuth.authState.subscribe(auth=> {this.isLoggedIn = !!auth;
      console.log(this.isLoggedIn);
      console.log(auth);
    });
  }

}
