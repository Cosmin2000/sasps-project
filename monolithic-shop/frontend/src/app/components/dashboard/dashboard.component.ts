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
      .filter((prod) => (!this.filters.maxPrice || (this.filters.maxPrice != null  && prod.price <= this.filters.maxPrice))
      && (!this.filters.minPrice || (this.filters.minPrice != null && prod.price >= this.filters.minPrice)))
      .sort((a, b) => (this.filters.sort === 'asc' ? a.price - b.price : b.price - a.price));
    }

  addToCart(product: Product) {
    if (!product.stock) {
      alert(`There is no more stock for this product.`);
    } else {
      this.cartService.addToCart(product);
      product.stock = product.stock - 1;
      alert(`${product.name} has been added to the cart.`);
    }
  }
}
