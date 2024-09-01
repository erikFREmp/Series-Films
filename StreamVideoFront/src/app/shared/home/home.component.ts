import { Component, ElementRef, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Film } from '../../class/film';
import { Series } from '../../class/serie';
import { FilmService } from '../../services/film.service';
import { SerieService } from '../../services/serie.service';
import { RoleService } from '../../services/role.service';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit, OnDestroy {
  isAdmin = false;
  roleName: string | null = null;
  films: Film[] = [];
  series: Series[] = [];
  filteredFilms: Film[] = [];
  desiredFilmIds: number[] = [786892, 823464, 653346, 1093995, 693134,1147400,]; 
  newFilms: Film[] = [];
  newSeries: Series[] = [];
  popularFilms: Film[] = [];
  popularSeries: Series[] = [];
  topRatedSeries:Series[];
  topRatedFilms:Film[];
  billBoard: Film[] = [];
  language:string;
  private roleSubscription: Subscription = new Subscription();
  private routeSubscription: Subscription = new Subscription();



  private posicionCarrusel1 = 0;
  private posicionCarrusel2 = 0;
  private posicionCarrusel3 = 0;
  private posicionCarrusel4 = 0;
  private maxPosicion = 2;

  constructor(
    private filmService: FilmService,
    private serieService: SerieService,
    private router: Router,
    private roleService: RoleService,
    private authService: AuthService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const token = this.authService.getToken();
  if (token) {
    // Verificar el token y recuperar los roles del usuario
    const decodedToken = this.authService.getDecodedToken();
    this.language = this.route.snapshot.paramMap.get('language');
    if (decodedToken) {
      const role = decodedToken.roles[0];
      this.roleName = role;
      this.language = decodedToken.language;
      this.router.navigate(['/home',this.language]);
      this.isAdmin = role === 'ADMIN';
    }
  }


    this.getTopPeliculas();
    this.getTopSeries();
    this.getFilmsOnAir();
    this.getSeriesOnAir();
    this.getTopRatedMovies();

    this.roleSubscription = this.authService.getCurrentUser().subscribe(role => {
      this.roleName = role;
      this.isAdmin = role === 'ADMIN';
      console.log('User role:', this.roleName);
      this.checkIfUserIsAdmin();
    });
    this.routeSubscription = this.route.paramMap.subscribe(params => {
      this.language = params.get('language') || 'es';
      this.updateContent();
    });
    
  }

  private updateContent(): void {
    this.getTopPeliculas();
    this.getTopSeries();
    this.getFilmsOnAir();
    this.getSeriesOnAir();
    this.getTopRatedMovies();
  }

  ngAfterViewInit(): void {
    this.language = this.route.snapshot.paramMap.get('language');

  }
  ngOnDestroy(): void {
    this.roleSubscription.unsubscribe();
  }

  private getTopRatedMovies(){
    this.filmService.findTopRatedMovies(this.language).subscribe(dato => {
      this.billBoard = dato;
    })
  }
    //Consigue las series con mejor rate
  private getTopRatedSeries(){
    this.serieService.findTopRatedSeries().subscribe(dato => {
      this.topRatedSeries = dato;
    })
  }
  // Imprime Top Películas
  private getTopPeliculas() {
    this.filmService.findTopFilms(this.language).subscribe(dato => {
      this.films = dato;
      this.filterFilmsById();
    });
  }

  private getTopRated(){
    
  }

  //Consigue las peliculas con mejor rate

  private getTopSeries() {
    this.serieService.findTopSeries(this.language).subscribe(dato => {
      this.series = dato;
    });
  }

// Probablemente quitar
private filterFilmsById() {
  this.filteredFilms = this.films.filter(film => this.desiredFilmIds.includes(film.id));
}


private getFilmsOnAir1() {
  this.filmService.findFilmsOnAir(this.language).subscribe(dato => {
    this.films = dato;
    this.filterFilmsById();
  });
}
private getFilmsOnAir() {
  this.filmService.findFilmsOnAir(this.language).subscribe(dato => {
    this.newFilms = dato;
  });
}
private getSeriesOnAir() {
  this.serieService.findSeriesOnAir(this.language).subscribe(dato => {
    this.newSeries = dato;
  });
}

  navigateToMovie(id: number) {
    
    this.router.navigate(['/movie',this.language, id]);
  }

  navigateToSeries(id: number) {
    this.router.navigate(['/series',this.language, id]);
  }

  

  @ViewChild('listaImagenes') listaImagenes!: ElementRef<HTMLUListElement>;
  @ViewChild('listaImagenes1') listaImagenes1!: ElementRef<HTMLUListElement>;
  @ViewChild('listaImagenes2') listaImagenes2!: ElementRef<HTMLUListElement>;
  @ViewChild('listaImagenes3') listaImagenes3!: ElementRef<HTMLUListElement>;

  moverDerecha() {
    const lista = this.listaImagenes.nativeElement;
    if (this.posicionCarrusel1 < this.maxPosicion) {
      this.posicionCarrusel1++;
    } else {
      this.posicionCarrusel1 = 0;
    }
    lista.style.transform = `translateX(-${this.posicionCarrusel1 * 15}%)`;
  }

  moverIzquierda() {
    const lista = this.listaImagenes.nativeElement;
    if (this.posicionCarrusel1 > 0) {
      this.posicionCarrusel1--;
    } else {
      this.posicionCarrusel1 = this.maxPosicion;
    }
    lista.style.transform = `translateX(-${this.posicionCarrusel1 * 15}%)`;
  }

  moverDerecha1() {
    const lista = this.listaImagenes1.nativeElement;
    if (this.posicionCarrusel2 < this.maxPosicion) {
      this.posicionCarrusel2++;
    } else {
      this.posicionCarrusel2 = 0;
    }
    lista.style.transform = `translateX(-${this.posicionCarrusel2 * 15}%)`;
  }

  moverIzquierda1() {
    const lista = this.listaImagenes1.nativeElement;
    if (this.posicionCarrusel2 > 0) {
      this.posicionCarrusel2--;
    } else {
      this.posicionCarrusel2 = this.maxPosicion;
    }
    lista.style.transform = `translateX(-${this.posicionCarrusel2 * 15}%)`;
  }

  moverDerecha2() {
    const lista = this.listaImagenes2.nativeElement;
    if (this.posicionCarrusel3 < this.maxPosicion) {
      this.posicionCarrusel3++;
    } else {
      this.posicionCarrusel3 = 0;
    }
    lista.style.transform = `translateX(-${this.posicionCarrusel3 * 15}%)`;
  }

  moverIzquierda2() {
    const lista = this.listaImagenes2.nativeElement;
    if (this.posicionCarrusel3 > 0) {
      this.posicionCarrusel3--;
    } else {
      this.posicionCarrusel3 = this.maxPosicion;
    }
    lista.style.transform = `translateX(-${this.posicionCarrusel3 * 15}%)`;
  }

  moverDerecha3() {
    const lista = this.listaImagenes3.nativeElement;
    if (this.posicionCarrusel4 < this.maxPosicion) {
      this.posicionCarrusel4++;
    } else {
      this.posicionCarrusel4 = 0;
    }
    lista.style.transform = `translateX(-${this.posicionCarrusel4 * 15}%)`;
  }

  moverIzquierda3() {
    const lista = this.listaImagenes3.nativeElement;
    if (this.posicionCarrusel4 > 0) {
      this.posicionCarrusel4--;
    } else {
      this.posicionCarrusel4 = this.maxPosicion;
    }
    lista.style.transform = `translateX(-${this.posicionCarrusel4 * 15}%)`;
  }

  isUserAdmin(): boolean {
    return this.isAdmin;
  }

  accionAdmin(): void {
    // Acción que quieres realizar cuando el usuario es admin
  }
  checkIfUserIsAdmin() {
    if (this.roleName === 'ADMIN') {
      this.isAdmin = true;
    } else {
      this.isAdmin = false;
    }}

    
}

