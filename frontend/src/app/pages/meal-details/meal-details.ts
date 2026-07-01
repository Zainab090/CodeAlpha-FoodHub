import {
  Component,
  OnInit,
  ChangeDetectorRef,
} from '@angular/core';

import { ActivatedRoute, RouterLink } from '@angular/router';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { FoodService } from '../../services/food';
import { CartService } from '../../services/cart';

@Component({
  selector: 'app-meal-details',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './meal-details.html',
  styleUrl: './meal-details.css'
})
export class MealDetails implements OnInit {

  meal: any = null;

  relatedFoods: any[] = [];
  reviews: any[] = [];

  loading = true;

  quantity = 1;

  averageRating = 0;

  newReview = {
    username: '',
    rating: 5,
    comment: ''
  };

  private readonly API = 'http://localhost:5000/api';

  constructor(
    private route: ActivatedRoute,
    private foodService: FoodService,
    private cartService: CartService,
    private http: HttpClient,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {

    this.route.params.subscribe(params => {

      const id = Number(params['id']);

      this.loadMeal(id);
      this.loadReviews(id);

    });

  }

  //-------------------------------
  // Load Meal
  //-------------------------------

  loadMeal(id: number): void {

    this.loading = true;

    this.foodService.getFoodById(id).subscribe({

      next: (food) => {

        this.meal = food;

        this.quantity = 1;

        this.loadRelatedFoods(food.category);

        this.loading = false;

        this.cdr.detectChanges();

      },

      error: (err) => {

        console.error(err);

        this.loading = false;

      }

    });

  }

  //-------------------------------
  // Related Foods
  //-------------------------------

  loadRelatedFoods(category: string): void {

    this.foodService.getFoodsByCategory(category).subscribe({

      next: (foods) => {

        this.relatedFoods = foods.filter(
          (food: any) => food.id !== this.meal.id
        );

        this.cdr.detectChanges();

      }

    });

  }

  //-------------------------------
  // Reviews
  //-------------------------------

  loadReviews(foodId: number): void {

    this.http.get<any[]>(`${this.API}/reviews/${foodId}`).subscribe({

      next: (reviews) => {

        this.reviews = reviews;

        this.calculateAverageRating();

        this.cdr.detectChanges();

      },

      error: (err) => {

        console.error('Unable to load reviews', err);

      }

    });

  }

  submitReview(): void {

    if (
      !this.newReview.username.trim() ||
      !this.newReview.comment.trim()
    ) {
      return;
    }

    const payload = {

      food_id: this.meal.id,

      username: this.newReview.username,

      rating: Number(this.newReview.rating),

      comment: this.newReview.comment

    };

    this.http.post(`${this.API}/reviews`, payload).subscribe({

      next: () => {

        this.loadReviews(this.meal.id);

        this.newReview = {

          username: '',

          rating: 5,

          comment: ''

        };

      },

      error: (err) => {

        console.error(err);

      }

    });

  }

  //-------------------------------
  // Rating
  //-------------------------------

  calculateAverageRating(): void {

    if (!this.reviews.length) {

      this.averageRating = 0;

      return;

    }

    const total = this.reviews.reduce(

      (sum, review) => sum + Number(review.rating),

      0

    );

    this.averageRating = Number(
      (total / this.reviews.length).toFixed(1)
    );

  }

  //-------------------------------
  // Quantity
  //-------------------------------

  increaseQuantity(): void {

    this.quantity++;

  }

  decreaseQuantity(): void {

    if (this.quantity > 1) {

      this.quantity--;

    }

  }

  //-------------------------------
  // Cart
  //-------------------------------

  addToCart(): void {

    for (let i = 0; i < this.quantity; i++) {

      this.cartService.add(this.meal);

    }

  }

  //-------------------------------
  // Helpers
  //-------------------------------

  get reviewCount(): number {

    return this.reviews.length;

  }

}