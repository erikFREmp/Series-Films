import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CoinService {
  private coinsSubject = new BehaviorSubject<number>(0);
  coins$ = this.coinsSubject.asObservable();
  private apiUrl = 'http://localhost:4000';

  constructor(private http: HttpClient) {}

  getCoinsFromToken(token: string): Observable<number> {
    let headers = new HttpHeaders();
  
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }

    return this.http.get<any>(`${this.apiUrl}/users`, { headers })
      .pipe(
        map(response => response.result.coins)
      );
  }

  setCoins(coins: number) {
    this.coinsSubject.next(coins);
  }

  refreshCoins(token: string) {
    this.getCoinsFromToken(token).subscribe(coins => {
      this.setCoins(coins);
    });
  }
  updateCoins(token: string, coins: number): Observable<any> {
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }

    return this.http.post<any>(`${this.apiUrl}/update-coins`, { coins }, { headers });
  }
}