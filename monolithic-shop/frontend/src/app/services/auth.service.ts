import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:5000/auth'; // URL-ul backend-ului

  constructor(private http: HttpClient) {}

  // Metoda pentru autentificare
  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, credentials);
  }

  // Metoda pentru înregistrare
  register(user: { name: string; email: string; password: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, user);
  }

  // Metoda pentru stocarea token-ului
  saveToken(token: string): void {
    localStorage.setItem('authToken', token);
  }

  // Metoda pentru verificarea autentificării
  isAuthenticated(): boolean {
    return !!localStorage.getItem('authToken');
  }

  // Metoda pentru logout
  logout(): void {
    localStorage.removeItem('authToken');
  }
}
