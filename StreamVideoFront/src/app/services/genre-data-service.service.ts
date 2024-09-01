import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GenreDataService {
  private genreNameSource = new BehaviorSubject<string>('');
  genreName$ = this.genreNameSource.asObservable();

  constructor() {}

  setGenreName(name: string): void {
    this.genreNameSource.next(name);
  }
}