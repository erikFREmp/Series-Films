import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Post } from '../class/post';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private apiUrl = 'http://localhost:4000/posts'; 
  private findPostUrl = 'http://localhost:4000'; 


  constructor(private http: HttpClient) { }

  createPost(post: Post,token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post<any>(this.apiUrl, post, { headers });
  }

  readPost(type:string,tmdbId:number): Observable<any> {
    const finalUrl = `${this.findPostUrl}/${type}/${tmdbId}`;
    const headers = new HttpHeaders({
      'Content-Type': `application/json`
    });
    return this.http.get<any>(finalUrl, { headers }).pipe(
      map(response => response.result.content) 
    );
  }

  deletePost(token: string, id: number): Observable<any> {
    const deleteFinalURL = `${this.findPostUrl}/posts/${id}`; 
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.delete<any>(deleteFinalURL, { headers });
  }

}