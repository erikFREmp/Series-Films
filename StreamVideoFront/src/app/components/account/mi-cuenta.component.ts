import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Account } from '../../class/account';
import { AccountService } from '../../services/account-service.service';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { CoinService } from '../../services/coin-service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-mi-cuenta',
  templateUrl: './mi-cuenta.component.html',
  styleUrls: ['./mi-cuenta.component.css']
})
export class MiCuentaComponent implements OnInit {
  roleName: string | null = null;
  showModal: boolean = false;
  registerForm: FormGroup;
  account: Account | null = null;
  isEditing: boolean = false;
  isEditingEmail: boolean = false;
  isEditingPassword: boolean = false;
  private aCServices: AccountService;
  coins: number;
  token: string;
  language:string;


  private routeSubscription: Subscription = new Subscription();

  constructor(
    private httpClient: HttpClient,
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private coinService: CoinService,
    private route: ActivatedRoute
  ) {
    this.aCServices = new AccountService(this.httpClient);
    this.registerForm = this.fb.group({
      email: ['', [Validators.email]],
      password: ['', [Validators.minLength(8), this.passwordValidator]],
    });
  }

  ngOnInit(): void {
    this.language = this.route.snapshot.paramMap.get('language');
    this.loadUserInfo();
    this.token = this.authService.getToken();
    this.coinService.getCoinsFromToken(this.token).subscribe(
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
    this.routeSubscription = this.route.paramMap.subscribe(params => {
      this.language = params.get('language') || 'es';
    });
  }

  @HostListener('document:keydown.enter', ['$event'])
  handleEnterKey(event: KeyboardEvent): void {
    event.preventDefault();
    event.stopPropagation();    
    this.updateUser();
  }

  loadUserInfo(): void {
    const token = this.authService.getToken();
    this.aCServices.getUserInfo(token).subscribe(
      data => {
        this.account = data;
        // Actualiza el formulario con los datos del usuario
        this.registerForm.patchValue({
          email: this.account.email,
          password: ''
        });
      },
      error => {
        console.error('Error component getter', error);
      }
    );
  }

  enableEditingEmail(): void {
    this.isEditingEmail = true;
    this.isEditing = true;
    this.isEditingPassword = false;
  }

  enableEditingPassword(): void {
    this.isEditingPassword = true;
    this.isEditing = true;
    this.isEditingEmail = false;
  }

  disableEditing(): void {
    this.isEditingEmail = false;
    this.isEditingPassword = false;
    this.isEditing = false;
    this.loadUserInfo();
  }

  updateUser(): void {
    if (this.isEditingEmail || this.isEditingPassword) {
      const token = this.authService.getToken();
      const formValues = this.registerForm.value;
      const updateData: any = {};

      if (this.isEditingEmail) {
        if (formValues.email) {
          updateData.email = formValues.email;
        } else {
          Swal.fire({
            text: 'El email es obligatorio.',
            icon: 'error',
            confirmButtonText: 'OK'
          });
          return;
        }
      }

      if (this.isEditingPassword) {
        if (formValues.password) {
          updateData.password = formValues.password;
        } else {
          Swal.fire({
            text: 'La contraseña es obligatoria.',
            icon: 'error',
            confirmButtonText: 'OK'
          });
          return;
        }
      }

      this.aCServices.updateUserInfo(updateData, token).subscribe(
        (updatedUser: Account) => {
          this.account = updatedUser;
          this.isEditingEmail = false;
          this.isEditingPassword = false;
          this.isEditing = false;
          this.loadUserInfo();
          
          Swal.fire({
            text: 'La información del usuario se ha actualizado correctamente.',
            icon: 'success',
            confirmButtonText: 'OK'
          });
        },
        (error) => {
          console.error('Error component updating', error);
          Swal.fire({
            text: 'Hubo un problema al actualizar la información del usuario.',
            icon: 'error',
            confirmButtonText: 'OK'
          });
        }
      );
    } else {
      Swal.fire({
        text: 'No hay cambios para guardar.',
        icon: 'info',
        confirmButtonText: 'OK'
      });
    }
  }

  passwordValidator(control: FormControl) {
    const value = control.value;
    if (!value) {
      return null;
    }
    const hasUpperCase = /[A-Z]+/.test(value);
    const hasLowerCase = /[a-z]+/.test(value);
    const hasSpecialCharacter = /[!@#$%^&*(),.?":{}|<>]+/.test(value);
    const valid = hasUpperCase && hasLowerCase && hasSpecialCharacter;
    if (!valid) {
      return { passwordStrength: 'La contraseña debe contener al menos una letra mayúscula, una letra minúscula y un carácter especial.' };
    }
    return null;
  }
  adjustEmailInputSize(event: Event): void {
    const input = event.target as HTMLInputElement;
    input.style.width = 'auto';
    input.style.width = `${input.scrollWidth}px`;
  }
}
