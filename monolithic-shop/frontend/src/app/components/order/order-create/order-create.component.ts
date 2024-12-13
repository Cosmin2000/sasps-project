import { Component } from '@angular/core';
import { OrderService } from '../../../services/order.service';
import { Order } from '../../../models/order';

@Component({
  selector: 'app-order-create',
  templateUrl: './order-create.component.html',
  styleUrls: ['./order-create.component.scss'],
  standalone: false
})
export class OrderCreateComponent {
  order: Order = { productId: '', userId: '', quantity: 1 };

  constructor(private orderService: OrderService) {}

  createOrder() {
    this.orderService.createOrder(this.order)
    .subscribe((response) => {
      console.log('Order created successfully:', response);
      alert('Order created successfully!');
      this.order = { productId: '', userId: '', quantity: 1 }; // Reset form
    }, (error) => {
      console.error('Error creating order:', error);
      alert('Failed to create order.');
    });
  }
}
