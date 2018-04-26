import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule} from '@angular/common/http';
import { FormsModule} from '@angular/forms'

import { MatButtonModule } from '@angular/material';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule} from 'angularfire2/auth';
import {AngularFirestoreModule, AngularFirestoreProvider} from "angularfire2/firestore";

import { environment } from './../environments/environment';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { MovieListComponent } from './movies/movie-list/movie-list.component';
import { EditMovieComponent } from './movies/edit-movie/edit-movie.component';
import {MoviesService} from "./movies/services/movies.service";
import {MovieDbapiserviceService} from "./movies/services/movie-dbapiservice.service";
import { AuthorizationComponent } from './authorization/authorization.component';
import { MovieBoxComponent } from './movies/movie-box/movie-box.component';



@NgModule({
  declarations: [
    AppComponent,
    MovieListComponent,
    EditMovieComponent,
    AuthorizationComponent,
    MovieBoxComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AppRoutingModule,
    HttpClientModule,
    MatButtonModule
  ],
  providers: [AngularFirestoreProvider, MoviesService, MovieDbapiserviceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
