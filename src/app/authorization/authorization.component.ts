import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {AngularFireAuth} from "angularfire2/auth";
import {Router} from "@angular/router";
import {environment} from "../../environments/environment";


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

  constructor(private afAuth: AngularFireAuth, private router: Router) {
  }

  ngOnInit() {
    this.user = this.afAuth.authState;
    const url = this.router.url;
    this.confirmSignIn(url);
  }

  async sendEmailLink() {
    const actionCodeSettings = environment.authorizationEmailSettings;
    try {
      await this.afAuth.auth.sendSignInLinkToEmail(
        this.email,
        actionCodeSettings
      );
      window.localStorage.setItem('emailForSignIn', this.email);
      this.emailSent = true;
    } catch (err) {
      this.errorMessage = err.message;
    }
  }

  async confirmSignIn(url) {
    try {
      if (this.afAuth.auth.isSignInWithEmailLink(url)) {
        let email = window.localStorage.getItem('emailForSignIn');

        // If missing email, prompt user for it
        if (!email) {
          email = window.prompt('Please provide your email for confirmation');
        }

        // Signin user and remove the email localStorage
        const result = await this.afAuth.auth.signInWithEmailLink(email, url);
        window.localStorage.removeItem('emailForSignIn');
      }
    } catch (err) {
      this.errorMessage = err.message;
    }
  }
}
