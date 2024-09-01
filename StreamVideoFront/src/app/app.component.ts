import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'StreamVideo';
  constructor(private authService: AuthService) { }

  isLoggedIn(): boolean {
    return this.authService.isAuthenticated();
  }
  ngOnInit(): void {
    this.authService.checkTokenOnPageLoad();
  }
}
