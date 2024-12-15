import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cart: any[] = [];

  addToCart(product: any) {
    const existingProduct = this.cart.find((item) => item.name === product.name);
    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      this.cart.push({ ...product, quantity: 1 });
    }
  }

  getCartItems() {
    return this.cart;
  }

  removeFromCart(product: any) {
    this.cart = this.cart.filter((item) => item.name !== product.name);
  }

  clearCart() {
    this.cart = [];
  }
}
