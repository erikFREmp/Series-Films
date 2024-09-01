import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isAuthenticated()) {
      return true; // Permitir el acceso a la ruta
    } else {
      this.router.navigate(['/login']); // Redirigir al usuario a la página de inicio de sesión
      return false; // Bloquear el acceso a la ruta
    }
  }
}

