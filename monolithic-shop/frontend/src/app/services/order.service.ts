import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from '../models/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  // private apiUrl = 'http://localhost:5000/orders';
  private apiUrl = 'http://localhost:4000/orders';


  constructor(private http: HttpClient) {}

  createOrder(order: Order): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/create`, order);
  }

  getOrder(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }
}
