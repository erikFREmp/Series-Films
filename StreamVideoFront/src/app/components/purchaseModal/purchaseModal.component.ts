import { Component, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Film } from '../../class/film';
import { Product } from '../../class/product';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-purchaseModal',
  templateUrl: './purchaseModal.component.html',
  styleUrls: ['./purchaseModal.component.css']
})
export class PurchaseModalComponent {
  @Input() isModalOpen = false;
  @Input() movieId: number;
  @Output() closeModalEvent = new EventEmitter<void>();
  @Output() purchaseEvent = new EventEmitter<number>();
  error: string = '';
  constructor(private authService: AuthService) { }

  closeModal(): void {
    this.isModalOpen = false;
    this.closeModalEvent.emit();
  }

  formatCardNumber(event: Event): void {
    const input = event.target as HTMLInputElement;
    let value = input.value.replace(/\D/g, ''); // Elimina todos los caracteres no numéricos

    if (value.length > 16) {
      value = value.slice(0, 16); // Limita a 16 dígitos
    }

    // Agrupa los dígitos en bloques de cuatro
    const formattedValue = value.replace(/(.{4})/g, '$1 ').trim();
    input.value = formattedValue;
  }

  validateNumberInput(event: KeyboardEvent): void {
    const allowedKeys = ['Backspace', 'Tab', 'ArrowLeft', 'ArrowRight'];
    if (!allowedKeys.includes(event.key) && (event.key < '0' || event.key > '9')) {
      event.preventDefault();
    }
  }

  formatExpiry(event: Event): void {
    const input = event.target as HTMLInputElement;
    let value = input.value.replace(/\D/g, '');

    if (value.length >= 2) {
      value = value.slice(0, 2) + '/' + value.slice(2, 4);
    }
    input.value = value.slice(0, 5);
  }

  formatCVV(event: Event): void {
    const input = event.target as HTMLInputElement;
    input.value = input.value.replace(/\D/g, '').slice(0, 3);
  }

  purchase(): void {
 
    const nameInput = document.getElementById('name') as HTMLInputElement;
    const cardNumberInput = document.getElementById('cardNumber') as HTMLInputElement;
    const dateInput = document.getElementById('expiry') as HTMLInputElement;
    const validateInput = document.getElementById('cvv') as HTMLInputElement;
    const cardNumber = cardNumberInput.value.replace(/\s+/g, '');
 
    const [month, year] = dateInput.value.trim().split("/").map(Number);
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear() % 100;
 
    if (nameInput.value.trim() === "") {
      this.error = "El nombre no puede estar vacío.";
      return;
    }
    if (cardNumber.length !== 16) {
      this.error = "El número de tarjeta debe tener exactamente 16 dígitos.";
      return;
    }
    if (dateInput.value.trim() === "") {
      this.error = "La fecha de expiración no puede estar vacía.";
      return;
    }
   
    if (!month || !year || month < 1 || month > 12) {
      this.error = "La fecha de expiración no es válida. Use el formato MM/YY.";
      console.error(this.error);
      return;
    }

 
    if (year < currentYear || (year === currentYear && month < currentMonth)) {
      this.error = "La tarjeta está caducada.";
      console.error(this.error);
      return;
    }
    if (validateInput.value.trim() == "") {
      this.error = "El CVV no puede estar vacío.";
      return;
    }
    this.purchaseEvent.emit();
  }
}
