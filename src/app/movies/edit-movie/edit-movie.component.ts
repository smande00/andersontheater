import { Component, OnInit } from '@angular/core';


import {MovieDTO} from "../MovieDTO";
import {MoviesService} from "../services/movies.service";
import {MovieDbapiserviceService} from "../services/movie-dbapiservice.service";
import {Subject} from "rxjs/Subject";
import 'rxjs/add/operator/debounceTime';
import "rxjs/add/operator/distinctUntilChanged";

@Component({
  selector: 'app-edit-movie',
  templateUrl: './edit-movie.component.html',
  styleUrls: ['./edit-movie.component.css']
})
export class EditMovieComponent implements OnInit {

  searchText : string;
  modelChanged: Subject<string> = new Subject<string>();
  searchResults:any[];
  constructor(private movieService:MoviesService, private tmdbAPI: MovieDbapiserviceService) {
    this.modelChanged
      .debounceTime(300) // wait 300ms after the last event before emitting last event
      .distinctUntilChanged() // only emit if value is different from previous value
      .subscribe(model =>  this.tmdbAPI.getTitleSearchResult(this.searchText).subscribe(next => {

        this.searchResults = next.results;
      }, error => {
        console.log(error);
      }));
  }

  ngOnInit() {

  }

  saveMovie(movieRes:MovieDTO) {
    let res = this.movieService.addNewMovie(movieRes);
    if (res != null)
      res.then(value => console.log(value));
  }

  getSearchResults() {
    this.modelChanged.next(this.searchText);
  }

  posterUrl(poster){
    if(poster!=null)
      return "http://image.tmdb.org/t/p/w92/" + poster;
    else
      return "/assets/NoResult.jpg"
  }

}
