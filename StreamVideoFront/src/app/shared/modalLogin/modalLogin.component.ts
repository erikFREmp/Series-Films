import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { CoinService } from '../../services/coin-service.service';
import Swal from 'sweetalert2';
import { Subscription, filter } from 'rxjs';

@Component({
  selector: 'app-modalLogin',
  templateUrl: './modalLogin.component.html',
  styleUrls: ['./modalLogin.component.css']
})
export class ModalLoginComponent implements OnInit {
  showModal = false;
  loginForm = {
    username: '',
    password: ''
  };
  language:string;
  errorMessage: string = '';
  @Output() loginSuccess = new EventEmitter<string>();
  private routerEventsSubscription: Subscription = new Subscription();

  constructor(private authService: AuthService, private router: Router, private coinService: CoinService,private route: ActivatedRoute) {}

  ngOnInit(): void {

  }


  private setLanguageFromUrl(): void {
    const currentUrl: string = this.router.url;
    
  }

  @HostListener('document:keydown.enter', ['$event'])
  handleEnterKey(event: KeyboardEvent): void {
    this.login();

  }



  openModal() {
    this.loginForm.username = '';
    this.loginForm.password = '';
    this.showModal = true;
    this.authService.redirectUrl = this.router.url;
    const currentUrl: string = this.router.url;
    const urlSegments = currentUrl.split('/');
    const langSegment = urlSegments.find(segment => segment === 'en' || segment === 'es');
    if (langSegment) {
      this.language = langSegment;
      console.log('Updated language from URL:', this.language);
    }
  }

  closeModal() {
    this.showModal = false;
    this.loginForm = { username: '', password: '' };
  } 

  login() {
    this.authService.login(this.loginForm.username, this.loginForm.password).subscribe(
      (data) => {
        console.log('Inicio de sesión exitoso:', data);
        this.closeModal();
        if(this.language == 'es'){
          Swal.fire({
            text: '¡Bienvenido!',
            icon: 'success',
            confirmButtonText: 'OK'
          });
        }
        else if(this.language=='en'){
          Swal.fire({
            text: '¡Welcome!',
            icon: 'success',
            confirmButtonText: 'OK'
          });
        }
        const redirectUrl = this.authService.redirectUrl;
        this.router.navigate([redirectUrl]);
        this.authService.redirectUrl = null;
        
        this.coinService.refreshCoins(this.authService.getToken());

        // Emitir el evento loginSuccess con el nombre de usuario
        const decodedToken = this.authService.getDecodedToken();
        if (decodedToken) {
          this.loginSuccess.emit(decodedToken.sub);
        }
      },
      (error) => { 
        console.error('Error al iniciar sesión:', error);
        if(this.language == 'es')
          this.errorMessage = 'Nombre de usuario o contraseña incorrectos. Por favor, inténtalo de nuevo.';
        else if(this.language == 'en')
          this.errorMessage = 'Incorrect username or password. Please try again.';
      }
    );
  }

  openRecuperarPassword() {
    this.showModal = false;
  }
}
