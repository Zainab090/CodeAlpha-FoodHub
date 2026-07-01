import { Component } from '@angular/core';
import { OrderService } from '../../services/order';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [],
  templateUrl: './admin.html',
  styleUrl: './admin.css'
})
export class Admin {

  constructor(
    public orderService: OrderService
  ) {}

  preparing(id: number) {
    this.orderService.updateStatus(
      id,
      'preparing'
    );
  }

  ready(id: number) {
    this.orderService.updateStatus(
      id,
      'ready'
    );
  }

  delivered(id: number) {
    this.orderService.updateStatus(
      id,
      'delivered'
    );
  }

}