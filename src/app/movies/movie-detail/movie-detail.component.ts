import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {MovieDTO, UserMovieDTO} from "../MovieDTO";
import {MovieDbapiserviceService} from "../services/movie-dbapiservice.service";
import { MoviesService } from '../services/movies.service';
import { User, AuthService } from '../../core/auth.service';
import { BehaviorSubject } from 'rxjs';


@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent implements OnInit {

  private user;
 
  constructor(  private movieDbAPI: MovieDbapiserviceService,
                private movieService: MoviesService,
                private authService: AuthService,
                public dialogRef: MatDialogRef<MovieDetailComponent>,
                @Inject(MAT_DIALOG_DATA) private data: any)  { }

  ngOnInit() {
    this.authService.loggedInUser().asObservable().subscribe((u)=>{
      this.user = u;
    });
    
  }

  posterUrl(poster:string){
    return this.movieDbAPI.formatPosterURL(poster);
  }
  
  toggleViewed() {
    if(this.data.userMovieDTO == null || this.data.userMovieDTO == undefined){
      this.data.userMovieDTO = {
        id: this.data.movieDTO.id,
        user_id: this.authService.user$.getValue().uid,
        watched: true
      };
    }
    else{
      this.data.userMovieDTO.watched = !this.data.userMovieDTO.watched;
    }
    this.movieService.userSaveMovie(this.data.userMovieDTO);
  }

}
