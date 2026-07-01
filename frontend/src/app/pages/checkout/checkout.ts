import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { CartService } from '../../services/cart';
import { OrderService } from '../../services/order';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './checkout.html',
  styleUrl: './checkout.css'
})
export class Checkout {

  customerName = '';
  phone = '';
  address = '';

  constructor(
    public cartService: CartService,
    private orderService: OrderService,
    private router: Router
  ) {}

  placeOrder() {

    if (
      !this.customerName ||
      !this.phone ||
      !this.address
    ) {
      alert('Fill all fields');
      return;
    }

    this.orderService.placeOrder({
      id: Date.now(),
      customerName: this.customerName,
      phone: this.phone,
      address: this.address,
      items: this.cartService.items(),
      total: this.cartService.total(),
      status: 'pending'
    });

    this.cartService.clear();

    alert('Order Placed');

    this.router.navigate(['/']);

  }

}