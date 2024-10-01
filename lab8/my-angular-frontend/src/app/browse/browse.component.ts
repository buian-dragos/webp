import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common'; 
import { Router, RouterModule } from '@angular/router'; 
import { FormsModule } from '@angular/forms'; // Import FormsModule

interface Product {
  id: number;
  name: string;
  price: string;
  category: string;
}

interface ProductResponse {
  products: Product[];
  total_pages: number;
  current_page: number;
}

@Component({
  selector: 'app-browse',
  standalone: true,
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.css'],
  imports: [CommonModule, HttpClientModule, RouterModule, FormsModule] // Add FormsModule
})
export class BrowseComponent implements OnInit {
  products: Product[] = [];
  totalPages: number = 1;
  currentPage: number = 1;
  categories: string[] = [];
  selectedCategory: string = 'All';

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.loadCategories();
    this.loadPage(1);
  }

  loadCategories(): void {
    this.http.get<string[]>('http://localhost/lab7/get_categories.php').subscribe(categories => {
      this.categories = ['All', ...categories];
    });
  }

  loadPage(page: number, event: Event | null = null): void {
    if (event) {
      event.preventDefault(); // Prevent the default action of the anchor tag
    }
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { category: this.selectedCategory, page: page };
    this.http.post<ProductResponse>('http://localhost/lab7/filter_products.php', body, { headers })
      .subscribe(response => {
        this.products = response.products;
        this.totalPages = response.total_pages;
        this.currentPage = response.current_page;
      }, error => {
        console.error('Error loading products', error);
      });
  }

  addToCart(productId: number): void {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { pid: productId };
    this.http.post('http://localhost/lab7/add_to_cart.php', body, { headers })
      .subscribe(response => {
        const res = this.jsonParse(JSON.stringify(response));
        if (res.status === 'success') {
          alert('Product added to cart!');
        } else {
          alert('Failed to add product to cart: ' + res.message);
        }
      }, error => {
        console.error('Error adding product to cart', error);
      });
  }

  jsonParse(text: string): any {
    try {
      return JSON.parse(text);
    } catch (e) {
      console.error('Error parsing JSON', e);
      return false;
    }
  }

  onCategoryChange(): void {
    this.loadPage(1); // Pass page number directly
  }

  navigateToHome(): void {
    this.router.navigate(['/']);
  }
}
