
// import { Injectable } from '@angular/core';
// import * as CryptoJS from 'crypto-js';

// @Injectable({
//   providedIn: 'root'
// })
// export class EncryptionService {

//   constructor() { }
  
   
//    private hexSecretKey = this.stringToHex("clave");
//   private secretKey = this.hexSecretKey;
  
//   encrypt(password: string): { salt: string; encryptedPassword: string } {
//     // Genera un salt aleatorio
//     const salt = CryptoJS.lib.WordArray.random(128/8).toString(CryptoJS.enc.Base64);
//     console.log("screatKey.",this.secretKey)
//     // Encripta la contraseña con el salt generado
//     const encryptedPassword = CryptoJS.AES.encrypt(password, this.secretKey + salt).toString();
 
//     // Retorna el salt y la contraseña cifrada
//     return { salt, encryptedPassword };
// }
 
//   // Genera un salt aleatorio
//   private generateSalt(length: number): string {
//     const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
//     let salt = '';
//     for (let i = 0; i < length; i++) {
//       salt += characters.charAt(Math.floor(Math.random() * characters.length));
//     }
//     return salt;
//   }
//   // Convierte una cadena de caracteres a su representación hexadecimal
// private stringToHex(string: string): string {
//   let hex = '';
//   for (let i = 0; i < string.length; i++) {
//       hex += string.charCodeAt(i).toString(16).padStart(2, '0');
//   }
//   return hex;
// }

// // Usa la función para convertir la clave a hexadecimal


// }

