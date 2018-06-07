import {Component, OnInit} from '@angular/core';

import {Observable} from "rxjs/Observable";
import {MoviesService} from "../services/movies.service";
import {MovieDTO} from "../MovieDTO";
import { BehaviorSubject } from 'rxjs/BehaviorSubject'
import {DocumentChangeAction} from "angularfire2/firestore";
import {Subject} from "rxjs/Subject";
import 'rxjs/add/operator/debounceTime';
import "rxjs/add/operator/distinctUntilChanged";
import {MatDialog} from "@angular/material";
import {MovieDetailComponent} from "../movie-detail/movie-detail.component";
import {AuthService } from '../../core/auth.service';
import {User} from "../../core/auth.service";


@Component({
  selector: 'at-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css'],

})
export class MovieListComponent implements OnInit {

  lastKey : any;
  allMovies:MovieDTO[] = [];
  filterChanged: Subject<string> = new Subject<string>();
  hasMoreResults:boolean;
  movieViewPort$: BehaviorSubject<MovieDTO[]> = new BehaviorSubject<MovieDTO[]>([]);
  searchText:string=""  ;
  viewPortStart:number = 0;
  viewPortSize:number = 36;
  boxWidth:number= 110;
  boxHeight:number=170;
  toolbarHeight:number=85;

  constructor(private movieService: MoviesService, public dialog: MatDialog, public auth: AuthService) {

  }

  ngOnInit() {


    this.mapData(this.movieService.getMovies());
    this.onResize({
      target:
        {
          innerWidth:window.innerWidth,
          innerHeight: window.innerHeight
        }
    });

    //We could probably get away without the Behavior subject and just do this inside the getSearchResults() method
    //However, using the Behavior Subject's debouncing is probably kinder to mobile devices/large datasets.
    this.filterChanged
      .debounceTime(200) // wait 200ms after the last event before emitting last event
      .distinctUntilChanged() // only do something if the searchText value is different
      .subscribe(() => {
          this.viewPortStart = 0;
          this.loadViewPort();
        },
        error => {
          console.log(error);
        });
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

  onMovieClicked($event:MovieDTO){
    let dialogRef = this.dialog.open(MovieDetailComponent, {
      width: '400px',
      autoFocus: false,
      data: $event
    });
  }

  onResize($event){
    let boxesPerRow = Math.floor($event.target.innerWidth/this.boxWidth);
    let rowsOfBoxes = Math.floor(($event.target.innerHeight - this.toolbarHeight)/this.boxHeight);
    this.viewPortSize = boxesPerRow * rowsOfBoxes;
    this.loadViewPort();
  }

  loadViewPort(){

    let filteredSet = this.allMovies
      .filter((f)=> {
        if(f.title.toLowerCase().indexOf(this.searchText.toLowerCase())!==-1 || this.searchText===""){
          return f;
        }});
    this.hasMoreResults = (filteredSet.length > this.viewPortStart + this.viewPortSize);

    let nextSet = filteredSet
      .slice(this.viewPortStart,this.viewPortSize + this.viewPortStart);


    this.movieViewPort$.next(nextSet);
  }

  updateViewPort(newOffset){
    this.viewPortStart += newOffset;
    this.loadViewPort();
  }

  getSearchResults(){
    this.filterChanged.next(this.searchText);
  }

}
