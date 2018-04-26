import {Component, Input, OnInit} from '@angular/core';
import {MovieDTO} from "../MovieDTO";
import {MoviesService} from "../services/movies.service";
import {MovieDbapiserviceService} from "../services/movie-dbapiservice.service";
import {animate, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-movie-box',
  templateUrl: './movie-box.component.html',
  styleUrls: ['./movie-box.component.css'],
  animations: [

    trigger('active', [
      transition('inactive => active',
        [style({transform:'translateY(-5px)'}),
              animate('200ms ease-in'),
              style({transform:'translateY(0px)'}),
              animate('100ms')
        ])
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
  activeState:string="inactive";

  constructor(private movieService: MoviesService, private movieDbAPI: MovieDbapiserviceService) { }

  ngOnInit() {
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
}
