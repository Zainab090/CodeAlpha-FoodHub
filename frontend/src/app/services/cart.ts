import { Injectable, signal } from '@angular/core';
import { Food } from '../models/food';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  items = signal<Food[]>([]);

  add(food: Food): void {

    this.items.update(items => [...items, food]);

  }

  remove(id: number): void {

    this.items.update(items => {

      const index = items.findIndex(item => item.id === id);

      if (index === -1) {
        return items;
      }

      const updated = [...items];

      updated.splice(index, 1);

      return updated;

    });

  }

  clear(): void {

    this.items.set([]);

  }

  total(): number {

    return this.items().reduce(

      (sum, item) => sum + Number(item.price),

      0

    );

  }

  getQuantity(id: number): number {

    return this.items()

      .filter(item => item.id === id)

      .length;

  }

  getCount(): number {

    return this.items().length;

  }

}