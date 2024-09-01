import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../class/product';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {

  private apiUrl = 'http://localhost:4000/favorites'; 

  constructor(private http: HttpClient) { }

  saveProduct(product: Product, token: string, word:string): Observable<any> {
    const url = `${this.apiUrl}/${word}`;

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post<any>(url, product, { headers });
  }

  readFavorite(token: string): Observable<Product[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<any>(this.apiUrl, { headers }).pipe(
      map(response => response.result)
    );
  }
}
