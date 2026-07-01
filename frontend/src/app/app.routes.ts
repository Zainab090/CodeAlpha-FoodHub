import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home').then(m => m.Home)
  },
  {
    path: 'menu',
    loadComponent: () => import('./pages/menu/menu').then(m => m.Menu)
  },
  {
    path: 'menu/:id',
    loadComponent: () => import('./pages/meal-details/meal-details').then(m => m.MealDetails)
  },
  {
    path: 'cart',
    loadComponent: () => import('./pages/cart/cart').then(m => m.Cart)
  },
  {
    path: 'checkout',
    loadComponent: () => import('./pages/checkout/checkout').then(m => m.Checkout)
  },
  {
    path: 'about',
    loadComponent: () => import('./pages/about/about').then(m => m.About)
  },
  {
    path: 'contact',
    loadComponent: () => import('./pages/contact/contact').then(m => m.Contact)
  },
  {
    path: 'admin',
    loadComponent: () => import('./pages/admin/admin').then(m => m.Admin)
  },
  {
    path: '**',
    redirectTo: 'menu'
  }
];