import { Injectable } from '@angular/core';
import {AngularFirestore, DocumentChangeAction} from "angularfire2/firestore";
import {Observable} from "rxjs/Observable";

import {MovieDTO, UserMovieDTO} from "../MovieDTO";
import "rxjs/add/operator/take";
import "rxjs/add/operator/map";
import { take } from 'rxjs/operators';

@Injectable()
export class MoviesService {

  constructor(private db: AngularFirestore) {
  }

  public getUserMovieSettings(user_id: string):Observable<DocumentChangeAction<UserMovieDTO>[]>{
    return this.db.collection<UserMovieDTO>("user_movies", m => m.where('user_id', '==', user_id)).snapshotChanges();
  }

  public getMovies():Observable<DocumentChangeAction<MovieDTO>[]>{
    return this.db.collection<MovieDTO>("movies", ob => ob.orderBy("title")).snapshotChanges();
  }

  public exists(movie: MovieDTO): Observable<MovieDTO[]> {

    return this.db.collection<MovieDTO>("movies", m => m.where('id', '==', movie.id)).valueChanges();

  }

  public delete(movie: number): any {
    return this.db.collection<MovieDTO>("movies", q => q.where('id', '==', movie))
      .snapshotChanges()
      .map(changes => {
        return changes
          .map(c =>
            c.payload.doc.id);
      })
      .take(1)
      .subscribe(next => {
        this.db.doc("movies/" + next[0]).delete().catch(err=> console.log(err));
      });

  }

  public userSaveMovie(movie: UserMovieDTO) {
    this.db.collection<MovieDTO>("user_movies", 
      m => m.where('id', '==', movie.id)
            .where('user_id', '==',movie.user_id))
      .snapshotChanges()
      .take(1)
      .subscribe(next=> {
        if(next.length > 0){
          return  this.db.collection("user_movies").doc(next[0].payload.doc.id).set(movie, {merge:true});
        }
        else{
          return this.db.collection("user_movies").add(movie);
        }
      });
  }

  public addNewMovie(movie: MovieDTO): any {
    this.exists(movie).take(1).subscribe(next => {
      if (next.length > 0) {
        return null;
      }
      ;

      return this.db.collection("movies").add(movie);
    });

  }
}
