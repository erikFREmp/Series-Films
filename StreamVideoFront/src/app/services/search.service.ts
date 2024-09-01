import { Injectable } from '@angular/core';
import { EMPTY, Observable, catchError, map } from 'rxjs';
import { Search } from '../class/search';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private searchSeriesMoviesURL = 'http://localhost:4000/search';

  constructor(private httpClient: HttpClient) { }
 
  searchSeriesMovies(word: string, language:string): Observable<Search[]> {
    const url = `${this.searchSeriesMoviesURL}/${language}/${word}`;
    return this.httpClient.get<{ result: { movies: { results: Search[] }, series: { results: Search[] } } }>(url).pipe(
      map(response => {

        const movies = response.result.movies.results.filter(movie => movie.poster_path);
        const series = response.result.series.results.filter(serie => serie.poster_path);
        const combinedResults = [...movies, ...series];
        console.log('Resultados filtrados:', combinedResults);  
        return combinedResults;
      }),
      catchError(error => {
        console.error('Error in service:', error);
        return EMPTY;
      })
    );
  }
}

