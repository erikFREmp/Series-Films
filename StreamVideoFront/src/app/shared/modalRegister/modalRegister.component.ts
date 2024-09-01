import { Component, Output, EventEmitter, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { RoleService } from '../../services/role.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-modalRegister',
  templateUrl: './modalRegister.component.html',
  styleUrls: ['./modalRegister.component.css']
})
export class ModalRegisterComponent {
  roleName: string | null = null; 
  @Output() roleRegistered = new EventEmitter<string>(); // Evento para emitir el nombre del rol
  @Output() userLoggedIn = new EventEmitter<void>();
  showModal: boolean = false;
  errorMessage: string = '';
  registerForm: FormGroup;
  language: string = 'es';
  private routeSubscription: Subscription = new Subscription();


  constructor(private authService: AuthService, private router: Router, private fb: FormBuilder, private roleService: RoleService,private route: ActivatedRoute) {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.maxLength(30), Validators.pattern(/^[a-zA-Z0-9]*$/)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), this.passwordValidator]],
      roles: ['USER']
    });
  }

  @HostListener('document:keydown.enter', ['$event'])
  handleEnterKey(event: KeyboardEvent): void {
    this.register();

  }


  openModal() {
    this.showModal = true;
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
    this.registerForm.reset();
  }

  register() {
    if (this.registerForm.valid) {
      this.authService.register(this.registerForm.value).subscribe(
        (data) => {
          const roleName = data.result.roles[0].name; // Obtener el nombre del rol
          this.roleRegistered.emit(roleName); // Emitir el nombre del rol
          this.roleService.setRoleName(roleName);
          const { username, password } = this.registerForm.value; 
          
          console.log("username= "+ username+ " pass= "+ password)
          this.authService.login(username, password).subscribe(() => {

            this.userLoggedIn.emit();
            Swal.fire({
              text: '¡Bienvenido!',
              icon: 'success',
              confirmButtonText: 'OK'
            });
          },
          (error) =>{
            console.log("Mal " ,error)
          }
        );

          this.closeModal();

        },
        (error) => {
          console.error('Error al registrar:', error);
          this.errorMessage = 'Error al registrar. Por favor, inténtalo de nuevo.';
        }
      );
    } else {
      console.log('Formulario inválido');
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
}
