import { Injectable, signal } from '@angular/core';
import { Order } from '../models/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  orders = signal<Order[]>([]);

  placeOrder(order: Order) {

    this.orders.update(current => [
      ...current,
      order
    ]);

  }

  getOrders() {
    return this.orders;
  }

  updateStatus(
    id: number,
    status: Order['status']
  ) {

    this.orders.update(orders =>
      orders.map(order =>
        order.id === id
          ? { ...order, status }
          : order
      )
    );

  }

}