import { Component, OnInit } from '@angular/core';
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
  selector: 'app-delete-product',
  standalone: true,
  templateUrl: './delete-product.component.html',
  styleUrls: ['./delete-product.component.css'],
  imports: [CommonModule, HttpClientModule, RouterModule, FormsModule]
})
export class DeleteProductComponent implements OnInit {
  products: Product[] = [];

  constructor(private http: HttpClient, private router: Router) {}

  loadProducts(): void {
    this.http.get<Product[]>('http://localhost/lab7/get_products.php')
      .subscribe(products => {
        this.products = products;
      }, error => {
        console.error('Error loading products', error);
      });
  }

  deleteProduct(id: number): void {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http.post('http://localhost/lab7/crud_products.php', { id: id, delete: true }, { headers })
      .subscribe(response => {
        alert('Product deleted successfully');
        this.loadProducts();
      }, error => {
        console.error('Error deleting product', error);
        alert('Error deleting product: ' + error.message);
      });
  }

  navigateToHome(): void {
    this.router.navigate(['/']);
  }

  ngOnInit(): void {
    this.loadProducts();
  }
}
