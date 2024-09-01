import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Film } from '../../class/film';
import { FilmService } from '../../services/film.service';
import { ActivatedRoute, Router } from '@angular/router';
import { GenreDataService } from '../../services/genre-data-service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-filmPage',
  templateUrl: './filmPage.component.html',
  styleUrls: ['./filmPage.component.css']
})
export class FilmPageComponent implements OnInit {

  private posicion = 0;
  private maxPosicion = 2;

  language:string;
  spanishMovies: Film[] = [];
  actionMovies: Film[] = [];
  dramaMovies: Film[] = [];

  private routeSubscription: Subscription = new Subscription();

  ngOnInit(): void {
    this.language = this.route.snapshot.paramMap.get('language');
    this.getSpanishSeries();
    this.getActionSeries();
    this.getDramaSeries();

    this.routeSubscription = this.route.paramMap.subscribe(params => {
      this.language = params.get('language') || 'es';
      this.updateContent();
    });
  }

  updateContent():void{
    this.getSpanishSeries();
    this.getActionSeries();
    this.getDramaSeries();
  }

  constructor(private filmService: FilmService, private router: Router,private genreDataService: GenreDataService,private route: ActivatedRoute) { }
    // Imprime pelis españolas
    private getSpanishSeries() {
      this.filmService.findSpanishMovies(this.language).subscribe(dato => {
        this.spanishMovies = dato;
      })
    }
  
    // Imprime pelis de acción
    private getActionSeries() {
      this.filmService.findActionMovies(this.language).subscribe(dato => {
        this.actionMovies = dato;
      })
    }
  
    // Imprime pelis de drama
    private getDramaSeries() {
      this.filmService.findDramaMovies(this.language).subscribe(dato => {
        this.dramaMovies = dato;
      })
    }
  
    // Pelis por id
    navigateToMovies(id: number) {
      this.router.navigate(['/movie', this.language, id]);
    }

  @ViewChild('listaCategorias') listaCategorias!: ElementRef<HTMLUListElement>;
  @ViewChild('listaImagenes1') listaImagenes1!: ElementRef<HTMLUListElement>;
  @ViewChild('listaImagenes2') listaImagenes2!: ElementRef<HTMLUListElement>;
  @ViewChild('listaImagenes3') listaImagenes3!: ElementRef<HTMLUListElement>;

  // FUNCIONES CARRUSEL GÉNEROS
  moverDerecha() {
    const lista = this.listaCategorias.nativeElement;
    if (this.posicion < this.maxPosicion) {
      this.posicion++;
    } else {
      this.posicion = 0;
    }
    lista.style.transform = `translateX(-${this.posicion * 15}%)`;
  }

  moverIzquierda() {
    const lista = this.listaCategorias.nativeElement;
    if (this.posicion > 0) {
      this.posicion--;
    } else {
      this.posicion = this.maxPosicion;
    }
    lista.style.transform = `translateX(-${this.posicion * 15}%)`;
  }

  // FUNCIONES CARRUSEL 1
  moverDerecha1() {
    const lista = this.listaImagenes1.nativeElement;
    if (this.posicion < this.maxPosicion) {
      this.posicion++;
    } else {
      this.posicion = 0;
    }
    lista.style.transform = `translateX(-${this.posicion * 15}%)`;
  }

  moverIzquierda1() {
    const lista = this.listaImagenes1.nativeElement;
    if (this.posicion > 0) {
      this.posicion--;
    } else {
      this.posicion = this.maxPosicion;
    }
    lista.style.transform = `translateX(-${this.posicion * 15}%)`;
  }

  // FUNCIONES CARRUSEL 2
  moverDerecha2() {
    const lista = this.listaImagenes2.nativeElement;
    if (this.posicion < this.maxPosicion) {
      this.posicion++;
    } else {
      this.posicion = 0;
    }
    lista.style.transform = `translateX(-${this.posicion * 15}%)`;
  }

  moverIzquierda2() {
    const lista = this.listaImagenes2.nativeElement;
    if (this.posicion > 0) {
      this.posicion--;
    } else {
      this.posicion = this.maxPosicion;
    }
    lista.style.transform = `translateX(-${this.posicion * 15}%)`;
  }

  // FUNCIONES CARRUSEL 3
  moverDerecha3() {
    const lista = this.listaImagenes3.nativeElement;
    if (this.posicion < this.maxPosicion) {
      this.posicion++;
    } else {
      this.posicion = 0;
    }
    lista.style.transform = `translateX(-${this.posicion * 15}%)`;
  }

  moverIzquierda3() {
    const lista = this.listaImagenes3.nativeElement;
    if (this.posicion > 0) {
      this.posicion--;
    } else {
      this.posicion = this.maxPosicion;
    }
    lista.style.transform = `translateX(-${this.posicion * 15}%)`;
  }

  public searchGenreFilm(id:number, name:string){
    this.genreDataService.setGenreName(name);
    this.router.navigate([`/categorias/movies/${this.language}/${id}`]);
  }
}
