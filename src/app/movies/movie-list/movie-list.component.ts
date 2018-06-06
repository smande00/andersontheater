import { Component, OnInit } from '@angular/core';

import {Observable} from "rxjs/Observable";
import {MoviesService} from "../services/movies.service";
import {MovieDTO} from "../MovieDTO";
import { BehaviorSubject } from 'rxjs/BehaviorSubject'
import {DocumentChangeAction} from "angularfire2/firestore";
import {Subject} from "rxjs/Subject";
import 'rxjs/add/operator/debounceTime';
import "rxjs/add/operator/distinctUntilChanged";



@Component({
  selector: 'at-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css'],

})
export class MovieListComponent implements OnInit {

  lastKey : any;
  allMovies:MovieDTO[] = [];
  filterChanged: Subject<string> = new Subject<string>();
  movieViewPort$: BehaviorSubject<MovieDTO[]> = new BehaviorSubject<MovieDTO[]>([]);
  searchText:string=""  ;
  viewPortStart:number = 0;
  viewPortSize:number = 36;
  boxWidth:number= 110;
  boxHeight:number=163;
  toolbarHeight:number=100;

  constructor(private movieService: MoviesService) {
    this.filterChanged
      .debounceTime(200) // wait 200ms after the last event before emitting last event
      .distinctUntilChanged() // only emit if value is different from previous value
      .subscribe(() => {
          this.viewPortStart = 0;
          this.loadViewPort();
        },
        error => {
          console.log(error);
        });
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

  onResize($event){
    let boxesPerRow = Math.floor($event.target.innerWidth/this.boxWidth);
    let rowsOfBoxes = Math.floor(($event.target.innerHeight - this.toolbarHeight)/this.boxHeight);
    this.viewPortSize = boxesPerRow * rowsOfBoxes;
    this.loadViewPort();
    console.log(boxesPerRow);
    console.log(rowsOfBoxes);
    console.log( $event.target.innerWidth);
    console.log( $event.target.innerHeight);
  }

  loadViewPort(){
    let nextSet = this.allMovies
      .filter((f)=> {
        if(f.title.toLowerCase().indexOf(this.searchText.toLowerCase())!==-1 || this.searchText===""){
          return f;
        }})
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
