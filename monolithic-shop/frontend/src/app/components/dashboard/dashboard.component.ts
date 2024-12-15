import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/product';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  standalone: false
})
export class DashboardComponent implements OnInit {
  products: any[] = [];
  filteredProducts: any[] = [];
  filters = {
    name: '',
    minPrice: 0,
    maxPrice: Infinity,
    sort: 'asc',
  };

  constructor(private productService: ProductService, private cartService: CartService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getProducts().subscribe((data) => {
      this.products = data;
      this.filteredProducts = data;
    });
  }

  applyFilters() {
    this.filteredProducts = this.products
      .filter((product) => product.name.toLowerCase().includes(this.filters.name.toLowerCase()))
      .filter((product) => product.price >= this.filters.minPrice && product.price <= this.filters.maxPrice)
      .sort((a, b) => (this.filters.sort === 'asc' ? a.price - b.price : b.price - a.price));
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
    product.stock = product.stock - 1;
    alert(`${product.name} has been added to the cart.`);
  }
}
