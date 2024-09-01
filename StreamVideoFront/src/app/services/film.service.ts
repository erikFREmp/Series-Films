import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Film } from '../class/film';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SearchResponse } from '../class/search-response';
import { Product } from '../class/product';
 
 
@Injectable({
  providedIn: 'root'
})
export class FilmService {
 
  // URLs utilizadas sacadas del spring
  private findTopRatedFilmsURL = "http://localhost:4000/movies/toprated";
  private findTopFilmsURL = "http://localhost:4000/movies/popular";
  private findFilmsOnAirURL = "http://localhost:4000/movies/current";
  private findByIdURL = "http://localhost:4000/movies/search";
  private findSpanishURL = "http://localhost:4000/movies/spanish";
  private findActionURL = "http://localhost:4000/movies/genre/action";
  private findDramaURL = "http://localhost:4000/movies/genre/drama";
  private findByGenreURL = "http://localhost:4000/movies/genre";
 
  constructor(private HttpClient:HttpClient) { }
 


  findByGenre(language:string,id:number,page:number){
    return this.HttpClient.get<{ result: string }>(`${this.findByGenreURL}/${language}/${id}/${page}`).pipe(
      map(response => JSON.parse(response.result).results as Film[])
    );
  }

  findTopRatedMovies(language:string){
    return this.HttpClient.get<{ result: string }>(`${this.findTopRatedFilmsURL}/${language}`).pipe(
      map(response => JSON.parse(response.result).results as Film[])
    );
  }
  // Obtener top películas
  findTopFilms(language:string): Observable<Film[]> {
    return this.HttpClient.get<{ result: string }>(`${this.findTopFilmsURL}/${language}`).pipe(
      map(response => JSON.parse(response.result).results as Film[])
    );
  }
 
  // Obtener películas de estreno
  findFilmsOnAir(language:string): Observable<Film[]> {
    return this.HttpClient.get<{ result: string }>(`${this.findFilmsOnAirURL}/${language}`).pipe(
      map(response => JSON.parse(response.result).results as Film[])
    );
  }
 
  // Ver detalle de peli en concreto
  findMovieById(id: number, token: string | null,language:string): Observable<SearchResponse> {
    let headers = new HttpHeaders();
  
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
  
    return this.HttpClient.get<{ result: { product: string; purchased: boolean; saved: boolean } }>(
      `${this.findByIdURL}/${language}/${id}`,
      { headers: token ? headers : undefined } // Only pass headers if token is not null
    ).pipe(
      map(response => new SearchResponse(response.result)) // Correctly map the response
    );
  }
 
  // Obtener peli españolas
  findSpanishMovies(language:string,page?: number): Observable<Film[]> {
    if (page === undefined) {
      page = 1;
    }
    return this.HttpClient.get<{ result: string }>(`${this.findSpanishURL}/${language}/${page}`).pipe(
      map(response => JSON.parse(response.result).results as Film[])
    );
  }
 
  // Obtener pelis de accion 
  findActionMovies(language:string): Observable<Film[]> {
    return this.HttpClient.get<{ result: string }>(`${this.findActionURL}/${language}`).pipe(
      map(response => JSON.parse(response.result).results as Film[])
    );
}
 
  // Obtener peli de drama
  findDramaMovies(language:string): Observable<Film[]> {
    return this.HttpClient.get<{ result: string }>(`${this.findDramaURL}/${language}`).pipe(
      map(response => JSON.parse(response.result).results as Film[])
    );
}
}