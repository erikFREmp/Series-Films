import { Component, OnInit } from '@angular/core';
import { Genre } from '../../class/genre';
import { GenreService } from '../../services/genre.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FilmService } from '../../services/film.service';
import { Product } from '../../class/product';
import { Film } from '../../class/film';
import { GenreDataService } from '../../services/genre-data-service.service';
import { SerieService } from '../../services/serie.service';
import { Series } from '../../class/serie';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-genre',
  templateUrl: './genre.component.html',
  styleUrl: './genre.component.css'
})



export class GenreComponent implements OnInit{

  id: number;
  movies:Film[] = [];
  page:number=1;
  series:Series[] = [];
  moreProducts:boolean = true
  genreName: string;
  isFilm:boolean;
  language:string;

  private routeSubscription: Subscription = new Subscription();


  constructor(
    private filmService: FilmService, 
    private route: ActivatedRoute,
    private router: Router,
    private genreDataService: GenreDataService,
    private serieService: SerieService
  ){}

  ngOnInit(): void {
    this.language = this.route.snapshot.paramMap.get('language')
    this.genreDataService.genreName$.subscribe(name => {
      this.genreName = name;
    });
    this.isFilm =  window.location.href.includes('movies');
    console.log(this.isFilm)
    this.id = +this.route.snapshot.paramMap.get('id');
    if(this.isFilm){
      if(this.id == 2010)
        this.getSpanishFilms(this.page);
      else
        this.getMoviesByGenre(this.id,this.page);
    }
    else{
      if(this.id == 2010)
        this.getSpanishSeries(this.page);
      else
        this.getSeriesByGenre(this.id,this.page);
    }
    
    this.routeSubscription = this.route.paramMap.subscribe(params => {
      this.language = params.get('language') || 'es';
      this.updateContent();
    });

  }

  private updateContent(){
    if(this.isFilm){
      if(this.id == 2010)
        this.getSpanishFilms(this.page);
      else
        this.getMoviesByGenre(this.id,this.page);
    }
    else{
      if(this.id == 2010)
        this.getSpanishSeries(this.page);
      else
        this.getSeriesByGenre(this.id,this.page);
    }
  
  }

  getMoviesByGenre(id: number, page: number): void {
    this.filmService.findByGenre(this.language,id, page).subscribe(dato => {
        this.movies = dato;
      },
      (error) => {
        console.error('Error fetching movies', error);
      }
    );
  }

  getSpanishFilms(page: number){
    this.filmService.findSpanishMovies(this.language,page).subscribe(dato => {
      this.movies = dato;
    },
    (error) => {
      console.error('Error fetching movies', error);
    }
  );
  }

  getSpanishSeries(page: number){
    this.serieService.findSpanishSeries(this.language,page).subscribe(dato => {
      this.series = dato;
    },
    (error) => {
      console.error('Error fetching movies', error);
    }
  );
  }

  getSeriesByGenre(id: number, page: number): void {
    this.serieService.findByGenre(this.language,id, page).subscribe(dato => {
        this.series = dato;
      },
      (error) => {
        console.error('Error fetching movies', error);
      }
    );
  }

  navigateToMovies(id: number): void {
    if (id) {
      this.router.navigate(['/movie',this.language, id]);
    } else {
      console.error('Movie ID is undefined or invalid');
    }
  }

  navigateToSeries(id: number): void {
    if (id) {
      this.router.navigate(['/series',this.language, id]);
    } else {
      console.error('Series ID is undefined or invalid');
    }
  }

  seeMore(){
    this.page++;
    if(this.isFilm){
      if(this.id == 2010){
        this.filmService.findSpanishMovies(this.language,this.page).subscribe(
          (data: Film[]) => {
            // Concatena las nuevas películas al arreglo existente
            if (data.length === 0) {
              this.moreProducts = false;
              return; // Salir del método si no hay más películas
            }
            else{
              this.movies = this.movies.concat(data);
            }
            
          },
          (error) => {
            console.error('Error fetching more movies', error);
          }
        );
      }
      else{
        this.filmService.findByGenre(this.language,this.id, this.page).subscribe(
          (data: Film[]) => {
            // Concatena las nuevas películas al arreglo existente
            if (data.length === 0) {
              this.moreProducts = false;
              return; // Salir del método si no hay más películas
            }
            else{
              this.movies = this.movies.concat(data);
            }
            
          },
          (error) => {
            console.error('Error fetching more movies', error);
          }
        );
      }
      
    }
    else{
      if(this.id == 2010){
        this.serieService.findSpanishSeries(this.language,this.page).subscribe(
          (data: Series[]) => {
            // Concatena las nuevas películas al arreglo existente
            if (data.length === 0) {
              this.moreProducts = false;
              return; // Salir del método si no hay más películas
            }
            else{
              this.series = this.series.concat(data);
            }
            
          },
          (error) => {
            console.error('Error fetching more series', error);
          }
        );
      }
      else{
        this.serieService.findByGenre(this.language,this.id, this.page).subscribe(
          (data: Series[]) => {
            // Concatena las nuevas películas al arreglo existente
            if (data.length === 0) {
              this.moreProducts = false;
              return; // Salir del método si no hay más películas
            }
            else{
              this.series = this.series.concat(data);
            }
            
          },
          (error) => {
            console.error('Error fetching more series', error);
          }
        );
    }
    }
  }
}
