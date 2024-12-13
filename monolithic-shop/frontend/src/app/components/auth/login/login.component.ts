import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: false,
  
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  credentials = { email: '', password: '' };

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login(this.credentials).subscribe(
      (response) => {
        this.authService.saveToken(response.token);
        this.router.navigate(['/dashboard']); // Navighează la o pagină protejată
      },
      (error) => {
        console.error('Login failed', error);
        alert('Login failed. Please check your credentials.');
      }
    );
  }
}