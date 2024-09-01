import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { User, UserToken } from '../../models/user.model';
import {jwtDecode} from 'jwt-decode';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  userTokens: UserToken[] = [];
  users: User[] = [];
  error: string | undefined;
  adminToken: string;

  constructor(private authService: AuthService, private cookieService: CookieService) {
    this.adminToken = this.cookieService.get('token') || '';
  }

  ngOnInit(): void {

    if (this.adminToken) {
      this.loadUsers(); // Cargar usuarios al inicializar el componente
    } else {
      this.error = 'Admin token is missing';
    }
  }

  loadUsers(): void {
    this.authService.findAllUsers().subscribe(
      (data: any) => {
        console.log('Usuarios obtenidos:', data);
        this.users = data.result;
      },
      (error) => {
        console.error('Error al obtener la lista de usuarios:', error);
        this.error = 'Error fetching user list';
      }
    );
  }

  
  enableUser(userId: string): void {
    this.authService.enableUser(userId, this.adminToken).subscribe(
      () => {
        console.log('Usuario habilitado correctamente:', userId);
        this.loadUsers(); 
      },
      (error) => {
        console.error('Error al habilitar usuario:', error);
        // Lógica para manejar el error
      }
    );
  }

  deleteUser(userId: string): void {
    this.authService.deleteUser(parseInt(userId), this.adminToken).subscribe(
      () => {
        console.log('Usuario eliminado correctamente:', userId);
        this.loadUsers(); // Actualizar la lista de usuarios después de eliminar uno
      },
      (error) => {
        console.error('Error al eliminar usuario:', error);
        // Lógica para manejar el error
      }
    );
  }
}