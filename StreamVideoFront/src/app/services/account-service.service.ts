import { HttpClient, HttpHeaderResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Account } from '../class/account';
import { Router } from '@angular/router';
import { EMPTY, Observable, catchError} from 'rxjs';
import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private searchUserInfo = 'http://localhost:4000/users';
  
  constructor(private httpClient: HttpClient) { }

  getUserInfo(token: String): Observable<Account> {
    const url = `${this.searchUserInfo}`;
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);

      return this.httpClient.get<{ result: Account }>(url, { headers }).pipe(
        map(response => response.result),
        catchError(error => {
          console.error('Error in service: map getter', error);
          return EMPTY;
        })
      );
    }else{
      console.error('Error in service: token');
      return EMPTY;
    }

  }

  updateUserInfo(user:{ email: string, password: string},token:String):Observable<Account>{
    const url = `${this.searchUserInfo}`;
    let headers = new HttpHeaders()
    headers = headers.set('Authorization', `Bearer ${token}`);

    return this.httpClient.put<any>(url,user,{headers}).pipe(map(response => new Account(response.username,response.email,response.password)),
    catchError(error => {
      console.error('Error in service: update', error);
      return EMPTY;
    })
  );
}

}
