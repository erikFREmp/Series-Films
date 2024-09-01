import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Film } from '../../class/film';
import { FilmService } from '../../services/film.service';
import { AuthService } from '../../services/auth.service';
import { PurchaseService } from '../../services/purchase.service';
import { Product } from '../../class/product';
import Swal from 'sweetalert2';
import { SearchResponse } from '../../class/search-response';
import { SerieService } from '../../services/serie.service';
import { Series } from '../../class/serie';
import { FavoriteService } from '../../services/favorite.service';
import { ModalLoginComponent } from '../../shared/modalLogin/modalLogin.component';
import { CoinService } from '../../services/coin-service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-individualProduct',
  templateUrl: './individualProduct.component.html',
  styleUrls: ['./individualProduct.component.css']
})
export class IndividualProductComponent implements OnInit {
  @ViewChild('loginModal') loginModal!: ModalLoginComponent; // Añade esto para acceder a la modal de login

  id: number;
  film: Film; //dejar a film o cambiar a product?
  serie: Series;
  isPurchaseModalOpen = false;
  isCoinModalOpen = false;
  isFilm: boolean;
  isFavorite: boolean;
  isPurchase: boolean;
  postDate: string;
  heartImageSrc = 'assets/emptyHearth.png';
  isAdmin = false;
  roleName: string | null = null;
  isLoggedIn: boolean = false;
  is_film: boolean;
  language:string;
  token:string;
 

  private roleSubscription: Subscription = new Subscription();
  private routeSubscription: Subscription = new Subscription();


  // is_film: number;
  constructor(
    private filmService: FilmService,
    private serieService: SerieService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private purchaseService: PurchaseService,
    private favoriteService: FavoriteService,
    private coinService: CoinService
  ) {}

  ngOnInit(): void {
    this.language = this.route.snapshot.paramMap.get('language');
    this.token = this.authService.getToken();
    console.log("Token: "+this.token);
    this.id = +this.route.snapshot.paramMap.get('id');
    const url = this.route.snapshot.url.join('/');
    this.isFilm = url.includes('movie'); //averigua si url contiene palabra movie, si contiene es true sino false
    if (this.isFilm) {
      this.filmService.findMovieById(this.id, this.token,this.language).subscribe((response: SearchResponse) => {
        this.film = JSON.parse(response.result.product);
        this.isPurchase = response.result.purchased;
        this.isFavorite = response.result.saved;
        this.id = this.film.id; // Guardo en la id. Para que al comprar no haya que hacer comprobacion de que si es serie o peli
        this.heartImageSrc = this.isFavorite ? 'assets/fullHearth.png' : 'assets/emptyHearth.png';
      });
    } else {
      this.serieService.findSerieById(this.id, this.token,this.language).subscribe((response: SearchResponse) => {
        this.serie = JSON.parse(response.result.product);
        this.isPurchase = response.result.purchased;
        this.isFavorite = response.result.saved;
        this.id = this.serie.id; // Guardo en la id. Para que al comprar no haya que hacer comprobacion de que si es serie o peli
        this.heartImageSrc = this.isFavorite ? 'assets/fullHearth.png' : 'assets/emptyHearth.png';
      });
    }

    this.roleSubscription = this.authService.getCurrentUser().subscribe(role => {
      this.roleName = role;
      this.isAdmin = role === 'ADMIN';
    });;
    this.routeSubscription = this.route.paramMap.subscribe(params => {
      this.language = params.get('language') || 'es';
      this.updateContent();
    });
  }

  updateContent():void{
    if (this.isFilm) {
      this.filmService.findMovieById(this.id, this.token,this.language).subscribe((response: SearchResponse) => {
        this.film = JSON.parse(response.result.product);
        this.isPurchase = response.result.purchased;
        this.isFavorite = response.result.saved;
        this.id = this.film.id; // Guardo en la id. Para que al comprar no haya que hacer comprobacion de que si es serie o peli
        this.heartImageSrc = this.isFavorite ? 'assets/fullHearth.png' : 'assets/emptyHearth.png';
      });
    } else {
      this.serieService.findSerieById(this.id, this.token,this.language).subscribe((response: SearchResponse) => {
        this.serie = JSON.parse(response.result.product);
        this.isPurchase = response.result.purchased;
        this.isFavorite = response.result.saved;
        this.id = this.serie.id; // Guardo en la id. Para que al comprar no haya que hacer comprobacion de que si es serie o peli
        this.heartImageSrc = this.isFavorite ? 'assets/fullHearth.png' : 'assets/emptyHearth.png';
      });
    }
  }

  openPurchaseModal(): void {
    const token = this.authService.getToken();
    if (!token) {
      this.isPurchaseModalOpen = false;
      this.authService.redirectUrl = this.router.url;
      this.loginModal.openModal(); //login modal
    } else {
      this.isPurchaseModalOpen = true;
    }
  }

  closePurchaseModal(): void {
    this.isPurchaseModalOpen = false;
  }

  openCoinModal(): void {
    const token = this.authService.getToken();
    if (!token) {
      this.isCoinModalOpen = false;
      this.authService.redirectUrl = this.router.url;
      this.loginModal.openModal(); //login modal
    } else {
      this.isCoinModalOpen = true;
    }
  }

  closeCoinModal(): void {
    this.isCoinModalOpen = false;
  }

  handlePurchase(): void {
    const token = this.authService.getToken();
    if (token) {
      const product: Product = {
        tmdbId: this.id,
        isFilm: this.isFilm,
        postDate: this.postDate
      };

      this.purchaseService.purchaseProduct(product, token).subscribe(
        response => {
          console.log('Compra exitosa', response);
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Compra exitosa",
            showConfirmButton: false,
            timer: 1500
          });
          this.closePurchaseModal();
          this.ngOnInit(); // Redirige al usuario a la página de confirmación o muestra un mensaje de éxito
        },
        error => {
          console.error('Error al realizar la compra', error);
          Swal.fire({
            position: "center",
            icon: "error",
            title: "Error al realizar la compra, inténtalo de nuevo.",
            showConfirmButton: false,
            timer: 1500
          });
        }
      );
    } else {
      console.error('Token no encontrado');
    }
  }

  handleFavorite(): void {
    const token = this.authService.getToken();
    if (token) {
      const product: Product = {
        tmdbId: this.id,
        isFilm: this.isFilm,
        postDate: this.postDate
      };

      if (!this.isFavorite) {
        this.favoriteService.saveProduct(product, token, "SAVE").subscribe(
          response => {
            this.heartImageSrc = 'assets/fullHearth.png';
            this.isFavorite = true;
          },
          error => {
            console.error('Error al guardar en favorito', error);
          }
        );
      } else {
        this.favoriteService.saveProduct(product, token, "UNSAVE").subscribe(
          response => {
            console.log('Se ha eliminado de favoritos', response);
            this.heartImageSrc = 'assets/emptyHearth.png';
            this.isFavorite = false;
          },
          error => {
            console.error('Error al eliminar favorito', error);
          }
        );
      }
    } else {
      console.error('Token no encontrado');
      this.authService.redirectUrl = this.router.url;
      this.loginModal.openModal(); //login modal
    }
  }

  
  handlePurchaseCoin(): void {
    const token = this.authService.getToken();
    
    if (token) {
        const product: Product = {
            tmdbId: this.id,
            isFilm: this.isFilm
        };

        this.coinService.refreshCoins(token);
        this.coinService.getCoinsFromToken(token).subscribe(
            (coins) => {
                let userCoins = coins;

                if (userCoins > 750) {
                    this.purchaseService.purchaseProductWithCoins(product, token).subscribe(
                        response => {
                            Swal.fire({
                                position: "center",
                                icon: "success",
                                title: "Compra exitosa",
                                showConfirmButton: false,
                                timer: 1500
                            });
                            this.coinService.refreshCoins(token);
                            this.closeCoinModal();
                            this.ngOnInit(); // Redirige al usuario a la página de confirmación o muestra un mensaje de éxito
                        },
                        error => {
                            console.error('Error al realizar la compra', error);
                            Swal.fire({
                                position: "center",
                                icon: "error",
                                title: "Error al realizar la compra, inténtalo de nuevo.",
                                showConfirmButton: false,
                                timer: 1500
                            });
                        }
                    );
                } else {
                    Swal.fire({
                        position: "center",
                        icon: "error",
                        title: "No tienes suficientes monedas. Coins: " + userCoins,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            },
            (error) => {
                console.error('Error fetching coins:', error);
            }
        );
    } else {
        console.error('Token no encontrado');
    }
  }

}
