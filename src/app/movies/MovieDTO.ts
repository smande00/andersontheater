export interface MovieDTO{
  id:number;
  title:string;
  poster_path: string;
  overview : string;
  release_date : string;
}

export interface UserMovieDTO{
  user_id: string;
  id:number;
  watched: boolean;
}