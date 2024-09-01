import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../class/product';
import { FavoriteService } from '../../services/favorite.service';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.css'
})
export class FavoritesComponent implements OnInit{
  username: string | null = null;
  userId: number | null = null;
  Products: Product[] = [];
  language:string;
  constructor(
    private favoriteService: FavoriteService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) { }
  private routeSubscription: Subscription = new Subscription();

  ngOnInit(): void {
    this.language = this.route.snapshot.paramMap.get('language');
    const decodedToken = this.authService.getDecodedToken();
    if (decodedToken) {
      this.username = decodedToken.sub;
      this.userId = decodedToken.userId;
    }
    this.readFavorite();
    this.routeSubscription = this.route.paramMap.subscribe(params => {
      this.language = params.get('language') || 'es';
    });
  }

  readFavorite(): void {
    const token = this.authService.getToken();
    if (token) {

      this.favoriteService.readFavorite(token).subscribe(dato => {
        this.Products = dato;
        if(this.Products.length === 0){
          Swal.fire({
            position: "center",
            icon: "error",
            title: "No has guardado ningún producto",
            showConfirmButton: false,
            timer: 1500
          });
          this.router.navigate(['/home',this.language]);
        }
      },
        error => {
          console.error('Error al obtener favoritos', error);
        }
      );
    } else {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Necesitas iniciar sesion",
        showConfirmButton: false,
        timer: 1500
      });
      this.router.navigate(['/home',this.language]);
    }
  }

  navigateToMovies(id: number) {
    this.router.navigate(['/movie',this.language, id]);
  }
  
  // Series por id
  navigateToSeries(id: number) {
    this.router.navigate(['/series',this.language, id]);
  }
}
