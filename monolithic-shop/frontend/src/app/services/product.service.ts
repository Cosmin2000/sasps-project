import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  // private apiUrl = 'http://localhost:5000/products';
  private apiUrl = 'http://localhost:4000/products';

  constructor(private http: HttpClient) {}

  addProduct(product: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/add`, product);
  }

  getProducts(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
}
