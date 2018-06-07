import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MovieDTO} from "../MovieDTO";
import {MoviesService} from "../services/movies.service";
import {MovieDbapiserviceService} from "../services/movie-dbapiservice.service";
import {animate, state, style, transition, trigger} from "@angular/animations";

import {AuthService, User} from "../../core/auth.service";

@Component({
  selector: 'app-movie-box',
  templateUrl: './movie-box.component.html',
  styleUrls: ['./movie-box.component.css'],
  animations: [

    trigger('active', [
      state('inactive', style({ transform: 'translateX(0) scale(1)' })),
      state('active', style({ transform: 'translateX(0) scale(1.2)' })),
      transition('inactive => active', animate('200ms ease-in')),
      transition('active => inactive', animate('200ms ease-out')),
      transition(
        ':enter', [
          style({ transform: 'scale(.7)', opacity: 0 }),
          animate('0.3s', style({ opacity: 1, transform: 'scale(1)' })),
        ]
      ),
      transition(
        ':leave', [
          style({ opacity: 1, transform: 'scale(1)' }),
          animate('5.3s', style({ opacity: 0, transform: 'scale(.7)' })),
        ]
      )
    ]),
    trigger('zoomIn', [
      transition(':enter', [
        style({transform:'scale(0)'}),
        animate(300),
        style({transform: 'scale(1)'})

      ])
    ])
  ]
})
export class MovieBoxComponent implements OnInit {
  @Input()  movieData:MovieDTO;
  @Output() movieClicked = new EventEmitter();
  activeState:string="inactive";
  loggedInUser:User;

  constructor(private movieService: MoviesService, private movieDbAPI: MovieDbapiserviceService, public auth: AuthService) {

  }

  ngOnInit() {
    this.auth.user.subscribe((value) =>{
      this.loggedInUser=value;
    });
  }

  delete(){
    this.movieService.delete(this.movieData.id);
  }
  posterUrl(poster:string){
    return this.movieDbAPI.formatPosterURL(poster);
  }
  setActive(activeState:string){
    this.activeState = activeState;
  }
  isActive():boolean{
    return this.activeState == "active";
  }
  onClicked(){
    this.movieClicked.emit(this.movieData);
  }
}
