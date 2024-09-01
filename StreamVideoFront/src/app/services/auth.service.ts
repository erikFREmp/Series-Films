import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import {jwtDecode} from 'jwt-decode';
import { User, UserToken } from '../models/user.model';
import { UserService } from './user.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:4000';

  private currentUserSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);
  private readonly TOKEN_KEY = 'auth_token';
  public redirectUrl: string | null = null;
  constructor(private http: HttpClient, private cookieService: CookieService, private storage: UserService) {
    const token = this.cookieService.get('token');
    if (token) {
      this.setToken(token);
    }
  }

  login(username: string, password: string): Observable<any> {
    const loginData = { username, password };
    return this.http.post<any>(`${this.apiUrl}/users/login`, loginData).pipe(
      tap(response => {
        this.setToken(response.token);
        const decodedToken = this.getDecodedToken();
        if (decodedToken && decodedToken.roles && Array.isArray(decodedToken.roles) && decodedToken.roles.length > 0) {
          const role = decodedToken.roles[0];
          this.currentUserSubject.next(role);
        } else {
          console.error('Roles are missing or not in the expected format');
        }
      }),
      catchError((error: HttpErrorResponse) => {
        console.error('Login error', error);
        return throwError(error);
      })
    );
  }

  register(user: { username: string, email: string, password: string, roles: string[] }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/users`, user);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  setToken(token: string) {
    this.cookieService.set('token', token, 1, '/', '', true, 'Strict');
  }

  getToken(): string | null {
    return this.cookieService.get('token') || null;
  }

  clearToken() {
    this.cookieService.delete('token', '/');
    this.currentUserSubject.next(null);
  }

  getCurrentUser(): Observable<string | null> {
    return this.currentUserSubject.asObservable();
  }
 
  getDecodedToken(): any {
    const token = this.getToken();
    if (token) {
      return jwtDecode(token);
    } else {
      return null;
    }
  }

  clearCookie(name: string) {
    this.cookieService.delete(name, '/');
  }

  getAllUserTokens(adminToken: string): Observable<UserToken[]> {
    const headers = { Authorization: `Bearer ${adminToken}` };
    return this.http.get<UserToken[]>(`${this.apiUrl}/users/tokens`, { headers });
  }


  findAllUsers(): Observable<User[]> {
    const token = this.getToken();
    console.log('Token enviado en la solicitud:', token); // Depurar el token enviado
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<User[]>(`${this.apiUrl}/users/all`, { headers });
  }
  deleteUser(userId: number, adminToken: string): Observable<any> {
    const headers = { Authorization: `Bearer ${adminToken}` };
    return this.http.delete(`${this.apiUrl}/users/${userId}`, { headers }).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 201) {
          // Tratar el estado 201 como una eliminación exitosa
          return of(null); // Devuelve un observable de null
        } else {
          // Propagar otros errores
          return throwError(error);
        }
      })
    );
  }
  
  enableUser(userId: string, adminToken: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${adminToken}`);
    return this.http.put(`${this.apiUrl}/users/enable/${userId}`, {}, { headers }).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(error);
      })
    );
  }
  checkTokenOnPageLoad(): void {
    const token = this.getToken();
    if (token) {
      // Emitir el token actualizado para actualizar el estado del usuario
      const decodedToken = this.getDecodedToken();
      if (decodedToken) {
        const role = decodedToken.roles[0];
        this.currentUserSubject.next(role);
      }
    }}
    logout(): void {
      localStorage.removeItem('username');
      // Elimina cualquier otra información del localStorage
    }

    getUserIdFromToken(): string | null {
      const token = this.getToken();
      if (token) {
        const decodedToken: any = jwtDecode(token);
        return decodedToken.userId;
      }
      return null;
    }
}

      
  
  


