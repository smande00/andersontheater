import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {MovieDTO} from "../MovieDTO";
import {MovieDbapiserviceService} from "../services/movie-dbapiservice.service";

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent implements OnInit {

  constructor(  private movieDbAPI: MovieDbapiserviceService,
                public dialogRef: MatDialogRef<MovieDetailComponent>,
                @Inject(MAT_DIALOG_DATA) public data: MovieDTO)  { }

  ngOnInit() {
  }

  posterUrl(poster:string){
    return this.movieDbAPI.formatPosterURL(poster);
  }

}
