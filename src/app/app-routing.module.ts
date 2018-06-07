import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MovieListComponent } from './movies/movie-list/movie-list.component';
import { EditMovieComponent } from "./movies/edit-movie/edit-movie.component";
import {AuthorizationComponent} from "./authorization/authorization.component";
import {AuthGuard} from "./core/auth.guard";



//This is my case
const routes: Routes = [
  { path: 'login', component: AuthorizationComponent },
  { path: '', component: MovieListComponent},
  { path: 'movie/:id', component: EditMovieComponent, canActivate:[AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
