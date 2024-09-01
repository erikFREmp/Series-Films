import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { PurchaseService } from '../../services/purchase.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../class/product';
import { Series } from '../../class/serie';
import { Film } from '../../class/film';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})

export class CartComponent implements OnInit {
  username: string | null = null;
  userId: number | null = null;
  Products: Product[] = [];
  language:string;
  private routeSubscription: Subscription = new Subscription();

  constructor(
    private purchaseService: PurchaseService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.language = this.route.snapshot.paramMap.get('language');
    const decodedToken = this.authService.getDecodedToken();
    if (decodedToken) {
      this.username = decodedToken.sub;
      this.userId = decodedToken.userId;
    }
    this.readPurchase();
    this.routeSubscription = this.route.paramMap.subscribe(params => {
      this.language = params.get('language') || 'es';
    });
  }

  readPurchase(): void {
    const token = this.authService.getToken();
    if (token) {

      this.purchaseService.readProduct(token).subscribe(dato => {
        this.Products = dato;
        if(this.Products.length === 0){
          Swal.fire({
            position: "center",
            icon: "error",
            title: "No has comprado ningún producto.",
            showConfirmButton: false,
            timer: 1500
          });
          this.router.navigate(['/home']);
        }
      },
        error => {
          console.error('Error al obtener producto', error);
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
      this.router.navigate(['/home']);
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



