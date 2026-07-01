import { Component, OnInit, ChangeDetectorRef } from '@angular/core'; // 1. Import ChangeDetectorRef
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { DecimalPipe } from '@angular/common';
import { forkJoin } from 'rxjs';

import { FoodService } from '../../services/food';
import { CartService } from '../../services/cart';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [FormsModule, RouterLink, DecimalPipe],
  templateUrl: './menu.html',
  styleUrl: './menu.css'
})
export class Menu implements OnInit {
  foods: any[] = [];
  filteredFoods: any[] = [];
  categories: string[] = ['All'];

  searchTerm = '';
  selectedCategory = 'All';
  sortBy = 'default';
  loading = true;

  // 2. Inject ChangeDetectorRef
  constructor(
    private foodService: FoodService,
    public cartService: CartService,
    private cdr: ChangeDetectorRef 
  ) {}

  ngOnInit(): void {
    this.loading = true;
    
    forkJoin({
      foods: this.foodService.getFoods(),
      categories: this.foodService.getCategories()
    }).subscribe({
      next: (result) => {
        this.foods = result.foods;
        this.categories = ['All', ...result.categories.map(c => c.name)];
        
        this.filterAndSortMeals(); 
        this.loading = false;
        
        // 3. FORCE UI REFRESH
        this.cdr.detectChanges(); 
      },
      error: (err) => {
        console.error('Data sync failed:', err);
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  // ... keep the rest of your methods exactly as they are
  filterAndSortMeals(): void {
    let result = [...this.foods];
    if (this.searchTerm.trim()) {
      const term = this.searchTerm.toLowerCase();
      result = result.filter(f => f.name.toLowerCase().includes(term) || f.description.toLowerCase().includes(term));
    }
    if (this.selectedCategory !== 'All') {
      result = result.filter(f => f.category.toLowerCase() === this.selectedCategory.toLowerCase());
    }
    switch (this.sortBy) {
      case 'price-low': result.sort((a, b) => Number(a.price) - Number(b.price)); break;
      case 'price-high': result.sort((a, b) => Number(b.price) - Number(a.price)); break;
      case 'alpha': result.sort((a, b) => a.name.localeCompare(b.name)); break;
    }
    this.filteredFoods = result;
  }

  searchMeals() { this.filterAndSortMeals(); }
  selectCategory(cat: string) { this.selectedCategory = cat; this.filterAndSortMeals(); }
  changeSort() { this.filterAndSortMeals(); }
  addToCart(food: any) { this.cartService.add(food); }
  removeFromCart(id: number) { this.cartService.remove(id); }
  getItemQuantity(id: number): number { return this.cartService.getQuantity(id); }
}