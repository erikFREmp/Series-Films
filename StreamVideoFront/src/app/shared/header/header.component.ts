import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ModalLoginComponent } from '../modalLogin/modalLogin.component';
import { ModalRegisterComponent } from '../modalRegister/modalRegister.component';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription, filter } from 'rxjs';
import { CoinService } from '../../services/coin-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy, AfterViewInit {
  username: string | null = null;
  isAdmin = false;
  roleName: string | null = null;
  isLoggedIn: boolean = false;
  token: string | null = null;
  coins: number = 0;
  language: string = 'es'; // Default language

  private roleSubscription: Subscription = new Subscription();
  private coinSubscription: Subscription = new Subscription();
  private routeSubscription: Subscription = new Subscription();
  private routerEventsSubscription: Subscription = new Subscription();

  constructor(
    private authService: AuthService,
    private router: Router,
    private coinService: CoinService,
    private route: ActivatedRoute
  ) {}

  @ViewChild('loginModal') loginModal!: ModalLoginComponent;
  @ViewChild('registerModal') registerModal!: ModalRegisterComponent;

  ngOnInit(): void {
    this.routerEventsSubscription = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.setLanguageFromUrl();
    });

    this.checkTokenOnPageLoad();

    this.roleSubscription = this.authService.getCurrentUser().subscribe(role => {
      this.roleName = role;
      this.isAdmin = role === 'ADMIN';
    });

    this.isLoggedIn = this.authService.isAuthenticated();
    this.token = this.authService.getToken();
    const decodedToken = this.authService.getDecodedToken();
    if (decodedToken) {
      this.username = decodedToken.sub;
    }

    this.coinService.getCoinsFromToken(this.token!).subscribe(
      (coins) => {
        this.coins = coins;
      },
      (error) => {
        console.error('Error fetching coins:', error);
      }
    );

    this.coinService.coins$.subscribe(coins => {
      this.coins = coins;
    });

    // Suscribirse al evento loginSuccess del ModalLoginComponent
    if (this.loginModal) {
      this.loginModal.loginSuccess.subscribe(() => {
        this.updateUserInfo();
      });
    }
    if (this.registerModal) {
      this.registerModal.userLoggedIn.subscribe(() => {
        this.updateUserInfo();
      });
    }
  }

  
  private setLanguageFromUrl(): void {
    const currentUrl: string = this.router.url;
    const urlSegments = currentUrl.split('/');
    const langSegment = urlSegments.find(segment => segment === 'en' || segment === 'es');
    if (langSegment) {
      this.language = langSegment;
      console.log('Updated language from URL:', this.language);
    }
  }

  ngAfterViewInit(): void {
    if (this.registerModal) {
      this.registerModal.userLoggedIn.subscribe(() => {
        this.updateUserInfo();
      });
    }
    if (this.loginModal) {
      this.loginModal.loginSuccess.subscribe(() => {
        this.updateUserInfo();
        console.log('segundo:', this.language);
      });
    }
  }

  ngOnDestroy(): void {
    this.roleSubscription.unsubscribe();
    this.coinSubscription.unsubscribe();
    this.routeSubscription.unsubscribe();
  }

  openLoginModal() {
    if (this.loginModal) {
      this.loginModal.openModal();
    }
  }

  setUser(username: string) {
    this.username = username;
    this.isLoggedIn = true;
  }

  openRegisterModal() {
    if (this.registerModal) {
      this.registerModal.openModal();
    }
  }

  logout() {
    this.authService.clearToken();
    this.username = null;
    this.isLoggedIn = false;
    this.isAdmin = false;
    this.language = 'es';
    this.router.navigate(['/home', this.language]);
  }

  checkTokenOnPageLoad(): void {
    const token = this.authService.getToken();
    if (token) {
      const decodedToken = this.authService.getDecodedToken();
      if (decodedToken) {
        const role = decodedToken.roles[0];
        this.roleName = role;
        this.isAdmin = role === 'ADMIN';
      }
    }
  }

  updateUserInfo(): void {
    const decodedToken = this.authService.getDecodedToken();
    if (decodedToken) {
      this.username = decodedToken.sub;
      this.isLoggedIn = true;
      this.language = decodedToken.language || this.language; 
      console.log(this.language);
      if (this.language) {
        this.cambiarIdioma(this.language);
      }
    }
  }
  
  onLanguageToggle(event: Event): void {
    const checkbox = event.target as HTMLInputElement;
    const newLanguage = checkbox.checked ? 'en' : 'es';
    this.cambiarIdioma(newLanguage);
  }
  public cambiarIdioma(nuevoIdioma: string): void {
    console.log(nuevoIdioma);
    this.language = nuevoIdioma;
    let currentUrl: string = this.router.url;
    const partes = currentUrl.split('/');
    for (let i = 0; i < partes.length; i++) {
      if (partes[i] === 'en' || partes[i] === 'es') {
        partes[i] = nuevoIdioma;
        break;
      }
    }
    currentUrl = partes.join('/');
    console.log(currentUrl);
    this.router.navigate([currentUrl]);
  }
}
