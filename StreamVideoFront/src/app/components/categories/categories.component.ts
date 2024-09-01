import { Component, OnInit } from '@angular/core';
import { Genre } from '../../class/genre';
import { CategoryService } from '../../services/category.service';
import { ActivatedRoute, Router } from '@angular/router';
import { GenreDataService } from '../../services/genre-data-service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  seriesGenre: Genre[] = [];
  moviesGenre: Genre[] = [];
  language:string;
  private routeSubscription: Subscription = new Subscription();

  constructor(private categoryService: CategoryService, private router: Router,private genreDataService: GenreDataService,private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.language = this.route.snapshot.paramMap.get('language');
    this.getGenreSeries();
    this.getGenreMovies();

    this.routeSubscription = this.route.paramMap.subscribe(params => {
      this.language = params.get('language') || 'es';
      this.updateContent();
    });
  }

  private updateContent():void{
    this.getGenreSeries();
    this.getGenreMovies();
  }

  private getGenreSeries() {
    this.categoryService.findSeriesGenre(this.language).subscribe(dato => {
      this.seriesGenre = dato;
    });
  }

  private getGenreMovies() {
    this.categoryService.findMoviesGenre(this.language).subscribe(dato => {
      this.moviesGenre = dato;
    });
  }

  public searchGenreFilm(id:number, name:string){
    this.genreDataService.setGenreName(name);
    this.router.navigate([`/categorias/movies/${this.language}/${id}`]);
  }

  public searchGenreSerie(id:number, name:string){
    this.genreDataService.setGenreName(name);
    this.router.navigate([`/categorias/series/${this.language}/${id}`]);
  }
}