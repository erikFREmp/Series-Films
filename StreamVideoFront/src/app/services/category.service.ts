import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Genre } from '../class/genre';
 
@Injectable({
  providedIn: 'root'
})
export class CategoryService {


  private findSeriesGenreURL = 'http://localhost:4000/series/genrelist';
  private findMoviesGenreURL = 'http://localhost:4000/movies/genrelist';

  constructor(private httpClient: HttpClient) { }
 
  // findSeriesGenre(): Observable<Genre[]> {
  //   return this.httpClient.get<{ result: string }>(this.findSeriesGenreURL).pipe(
  //     map(response => JSON.parse(response.result).genres as Genre[])
  //   );
  // }
  findSeriesGenre(language:string): Observable<Genre[]> {
    return this.httpClient.get<{ result: string }>(`${this.findSeriesGenreURL}/${language}`).pipe(
      map(response => JSON.parse(response.result).genres as Genre[])
    );
  }
  findMoviesGenre(language:string): Observable<Genre[]> {
    return this.httpClient.get<{ result: string }>(`${this.findMoviesGenreURL}/${language}`).pipe(
      map(response => JSON.parse(response.result).genres as Genre[])
    );
  }
}