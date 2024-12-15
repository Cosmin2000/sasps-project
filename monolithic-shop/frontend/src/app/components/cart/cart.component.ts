import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  standalone: false,
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart() {
    this.cartItems = this.cartService.getCartItems();
  }

  removeFromCart(product: any) {
    this.cartService.removeFromCart(product);
    this.loadCart();
  }

  placeOrder() {
    alert('Order placed successfully!');
    this.cartService.clearCart();
    this.loadCart();
  }
}
