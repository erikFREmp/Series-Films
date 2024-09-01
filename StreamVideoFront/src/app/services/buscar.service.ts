import { Injectable } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Search } from '../class/search';

@Injectable({
  providedIn: 'root'
})
export class BuscarService {

  private searchSeriesMoviesURL = 'http://localhost:8084/search';

  constructor(private httpClient: HttpClient) { }

  searchSeriesMovies(word: string): Observable<Search[]> {
    const url = `${this.searchSeriesMoviesURL}?word=${word}`;

    console.log('Comprobar url construido:', url);  

    return this.httpClient.get<{ movies: { results: Search[] }, series: { results: Search[] } }>(url).pipe(
      map(response => {
        console.log('Respuesta de API:', response);  

        const movies = response.movies.results.filter(movie => movie.poster_path);
        const series = response.series.results.filter(serie => serie.poster_path);
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