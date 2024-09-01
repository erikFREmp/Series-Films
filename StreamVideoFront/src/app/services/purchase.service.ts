
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Product } from '../class/product';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {
  private apiUrl = 'http://localhost:4000/purchases'; // URL del endpoint de compras

  constructor(private http: HttpClient) { }

  purchaseProduct(product: Product, token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post<any>(this.apiUrl, product, { headers });
  }

  purchaseProductWithCoins(product: Product, token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post<any>(this.apiUrl+"/coins", product, { headers });
  }

  readProduct(token: string): Observable<Product[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<any>(this.apiUrl, { headers }).pipe(
      map(response => response.result) // Transforma la respuesta para extraer el array de productos
    );
  }
}