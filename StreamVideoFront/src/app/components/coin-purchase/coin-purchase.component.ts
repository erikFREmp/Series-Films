import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CoinService } from '../../services/coin-service.service';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';
import { PurchaseService } from '../../services/purchase.service';
import { Product } from '../../class/product';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-coin-purchase',
  templateUrl: './coin-purchase.component.html',
  styleUrls: ['./coin-purchase.component.css']
})
export class CoinPurchaseComponent implements OnInit {
  @Input() isModalOpen: boolean = false;
  @Input() movieCost: number = 750; // Coste fijo de la película en monedas
  @Output() closeModalEvent = new EventEmitter<void>();
  @Output() purchaseCoinEvent = new EventEmitter<void>();
  totalCoins: number = 0;
  token: string;
  id:number;
  isFilm:boolean;


  constructor(private coinService: CoinService, private  authService: AuthService,private purchaseService: PurchaseService,private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('id');
    const url = this.route.snapshot.url.join('/');
    this.isFilm = url.includes('movie');
    this.token = this.authService.getToken(); 
    this.coinService.refreshCoins(this.token);
    this.coinService.coins$.subscribe(coins => {
      this.totalCoins = coins;
    });
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.closeModalEvent.emit();
  }

  purcharse(){
    this.purchaseCoinEvent.emit()
  }
}
