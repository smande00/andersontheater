import { Component, OnInit } from '@angular/core';

import {Observable} from "rxjs/Observable";
import {MoviesService} from "../services/movies.service";
import {MovieDTO} from "../MovieDTO";
import { BehaviorSubject } from 'rxjs/BehaviorSubject'
import {DocumentChangeAction} from "angularfire2/firestore";


@Component({
  selector: 'at-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css'],

})
export class MovieListComponent implements OnInit {

  lastKey : any;
  allMovies:MovieDTO[] = [];
  movieViewPort$: BehaviorSubject<MovieDTO[]> = new BehaviorSubject<MovieDTO[]>([]);
  viewPortStart:number = 0;
  viewPortSize:number = 36;
  constructor(private movieService: MoviesService) { }

  ngOnInit() {
    this.mapData(this.movieService.getMovies());
  }

  mapData(obs : Observable<DocumentChangeAction[]>) {
    obs.subscribe(docs => {
      this.allMovies = [];
      console.log(docs.length);
      docs.forEach(doc => {
        this.lastKey = doc.payload.doc;
        this.allMovies.push(doc.payload.doc.data());
      });
      this.loadViewPort();
    });
  }

  loadViewPort(){
    let nextSet = this.allMovies.slice(this.viewPortStart,this.viewPortSize + this.viewPortStart);
    this.movieViewPort$.next(nextSet);
  }

  updateViewPort(newOffset){
    this.viewPortStart += newOffset;
    this.loadViewPort();
  }
}
