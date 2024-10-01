import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { Router, RouterModule } from '@angular/router'; // Import RouterModule

interface Product {
  id: number;
  name: string;
  price: string;
  category: string;
}

interface CartResponse {
  products: Product[];
  total_pages: number;
  current_page: number;
}

@Component({
  selector: 'app-cart',
  standalone: true,
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  imports: [CommonModule, HttpClientModule, RouterModule] // Add CommonModule and RouterModule
})
export class CartComponent implements OnInit {
  products: Product[] = [];
  totalPages: number = 1;
  currentPage: number = 1;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.loadCartPage(1);
  }

  jsonParse(text: string): any {
    try {
      return JSON.parse(text);
    } catch (e) {
      return false;
    }
  }

  loadCartPage(page: number): void {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http.post<CartResponse>('http://localhost/lab7/get_cart_products.php', { page: page }, { headers })
      .subscribe(response => {
        this.products = response.products;
        this.totalPages = response.total_pages;
        this.currentPage = response.current_page;
      });
  }

  removeFromCart(pid: number): void {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http.post('http://localhost/lab7/remove_from_cart.php', { pid: pid }, { headers })
      .subscribe(response => {
        const res = this.jsonParse(JSON.stringify(response));
        if (res.status === 'success') {
          alert('Product removed from cart!');
          this.loadCartPage(1);
        } else {
          alert('Failed to remove product from cart: ' + res.message);
        }
      });
  }

  navigateToHome(): void {
    this.router.navigate(['/']);
  }
}
