import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams} from '@angular/common/http'
import {Observable} from "rxjs/Observable";

@Injectable()
export class MovieDbapiserviceService {

  constructor(private http:HttpClient) { }

  public  getTitleSearchResult(searchString:string) : Observable<any> {

    let url:string = environment.tmdbAPI.url + "search/movie";
    environment.tmdbAPI.key + "&query=" + searchString
    let params:HttpParams = new HttpParams().set("api_key", environment.tmdbAPI.key).set("query", searchString);
    return this.http.get(url, { params: params });
  }

  public formatPosterURL(poster){
      if(poster!=null)
        return "http://image.tmdb.org/t/p/w92/" + poster;
      else
        return "/assets/NoResult.jpg"
    }
}
