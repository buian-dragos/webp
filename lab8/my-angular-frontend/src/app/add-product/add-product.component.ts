import { Component } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
}

@Component({
  selector: 'app-add-product',
  standalone: true,
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
  imports: [CommonModule, HttpClientModule, RouterModule, FormsModule]
})
export class AddProductComponent {
  product: Product = {
    id: 0,
    name: '',
    price: 0,
    category: ''
  };
  products: Product[] = [];

  constructor(private http: HttpClient, private router: Router) {}

  addProduct(): void {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http.post('http://localhost/lab7/crud_products.php', this.product, { headers })
      .subscribe(response => {
        alert('Product added successfully');
        this.loadProducts();
      }, error => {
        console.error('Error adding product', error);
        alert('Error adding product');
      });
  }

  loadProducts(): void {
    this.http.get<Product[]>('http://localhost/lab7/get_products.php')
      .subscribe(products => {
        this.products = products;
      }, error => {
        console.error('Error loading products', error);
      });
  }

  navigateToHome(): void {
    this.router.navigate(['/']);
  }

  ngOnInit(): void {
    this.loadProducts();
  }
}
