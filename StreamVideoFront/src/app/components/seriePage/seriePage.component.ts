import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Series } from '../../class/serie';
import { SerieService } from '../../services/serie.service';
import { CommonModule } from '@angular/common';
import { GenreDataService } from '../../services/genre-data-service.service';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-seriePage',
  templateUrl: './seriePage.component.html',
  styleUrl: './seriePage.component.css'
})
export class SeriePageComponent implements OnInit {


  private posicion = 0;
  private maxPosicion = 2;

  spanishSeries: Series[] = [];
  actionSeries: Series[] = [];
  dramaSeries: Series[] = [];
  language: string;

  private routeSubscription: Subscription = new Subscription();

  constructor(private serieService: SerieService, private router: Router,private genreDataService: GenreDataService, private authService: AuthService,private route: ActivatedRoute) { }

  
  ngOnInit(): void {
    // const decodedToken = this.authService.getDecodedToken();
    // if (decodedToken) {
    //   this.language = decodedToken.language;
    // }
    // else{
    //   this.language = "es";
    // }
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

  // Imprime series españolas
  private getSpanishSeries() {
    this.serieService.findSpanishSeries(this.language).subscribe(dato => {
      this.spanishSeries = dato;
    })
  }

  // Imprime series de acción
  private getActionSeries() {
    this.serieService.findActionSeries(this.language).subscribe(dato => {
      this.actionSeries = dato;
    })
  }

  // Imprime series de dramay
  private getDramaSeries() {
    this.serieService.findDramaSeries(this.language).subscribe(dato => {
      this.dramaSeries = dato;
    })
  }

  // Series por id
  navigateToSeries(id: number) {
    this.router.navigate(['/series',this.language, id]);
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
  public searchGenreSerie(id:number, name:string){
    this.genreDataService.setGenreName(name);
    this.router.navigate([`/categorias/series/${this.language}/${id}`]);
  }
}
