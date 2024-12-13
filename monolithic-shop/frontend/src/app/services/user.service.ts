import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:5000/users';

  constructor(private http: HttpClient) {}

  registerUser(user: User): Observable<boolean> {
    return this.http.post<boolean>(`${this.apiUrl}/register`, user);
  }

  getUser(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }
}
