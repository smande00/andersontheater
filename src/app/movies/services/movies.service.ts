import { Injectable } from '@angular/core';
import {AngularFirestore, DocumentChangeAction} from "angularfire2/firestore";
import {Observable} from "rxjs/Observable";

import {MovieDTO} from "../MovieDTO";
import "rxjs/add/operator/take";

@Injectable()
export class MoviesService {

  constructor(private db: AngularFirestore) {
  }

  public getMovies():Observable<DocumentChangeAction[]>{
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
