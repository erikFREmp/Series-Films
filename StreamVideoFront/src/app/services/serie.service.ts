import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Series } from '../class/serie';
import { SearchResponse } from '../class/search-response';
 
 
@Injectable({
  providedIn: 'root'
})
export class SerieService {
 
  // URLs utilizadas sacadas del spring
  private findTopRatedSeriesURL = "http://localhost:4000/series/toprated";
  private findTopSeriesURL = "http://localhost:4000/series/popular";
  private findSeriesOnAirURL = "http://localhost:4000/series/today";
  private findByIdURL = "http://localhost:4000/series/search";
  private findSpanishURL = "http://localhost:4000/series/spanish";
  private findActionURL = "http://localhost:4000/series/genre/action";
  private findDramaURL = "http://localhost:4000/series/genre/drama";
  private findByGenreURL = "http://localhost:4000/series/genre";
 
 
  constructor(private HttpClient: HttpClient) { }
 
  findByGenre(language:string,id:number,page:number){
    return this.HttpClient.get<{ result: string }>(`${this.findByGenreURL}/${language}/${id}/${page}`).pipe(
      map(response => JSON.parse(response.result).results as Series[])
    );
  }

  findTopRatedSeries(){
    return this.HttpClient.get<{result: string }>(this.findTopRatedSeriesURL).pipe(
      map(response => JSON.parse(response.result).results as Series[]))
  }
  // Obtener las top series
  findTopSeries(language:string): Observable<Series[]> {
    return this.HttpClient.get<{result: string }>(`${this.findTopSeriesURL}/${language}`).pipe(
      map(response => JSON.parse(response.result).results as Series[]))
  }
  // findTopSeries(): Observable<Series[]> {
  //   return this.HttpClient.get<{ results: Series[] }>(this.findTopSeriesURL).pipe(
  //     map(response => response.results) // Asume que la respuesta tiene una propiedad 'series' que contiene el array
  //   );
  // }

  findSeriesOnAir(language:string){
    return this.HttpClient.get<{ result: string}>(`${this.findSeriesOnAirURL}/${language}`).pipe(
      map(response => JSON.parse(response.result).results as Series[])
    );
  
  }
 
  // Ver detalle de serie en concreto
  findSerieById(id: number, token: string | null,language:string): Observable<SearchResponse> {
    let headers = new HttpHeaders();
  
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
  
    return this.HttpClient.get<{ result: { product: string; purchased: boolean; saved: boolean } }>(
      `${this.findByIdURL}/${language}/${id}`,
      { headers: token ? headers : undefined } 
    ).pipe(
      map(response => new SearchResponse(response.result)) 
    );
  }
 
  // Obtener series españolas
  findSpanishSeries(language:string,page?: number): Observable<Series[]> {
    if (page === undefined) {
      page = 1;
    }
    return this.HttpClient.get<{ result: string }>(`${this.findSpanishURL}/${language}/${page}`).pipe(
      map(response => JSON.parse(response.result).results as Series[])
    );
  }
 
  // Obtener series españolas
  findActionSeries(language:string): Observable<Series[]> {
    return this.HttpClient.get<{ result: string }>(`${this.findActionURL}/${language}`).pipe(
      map(response => JSON.parse(response.result).results as Series[])
    );
  }
  // Obtener series españolas
  findDramaSeries(language:string): Observable<Series[]> {
    return this.HttpClient.get<{ result: string  }>(`${this.findDramaURL}/${language}`).pipe(
      map(response => JSON.parse(response.result).results as Series[])
    );
  }
}