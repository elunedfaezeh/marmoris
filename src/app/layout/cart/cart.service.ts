import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  [x: string]: any;
  private subject = new Subject<any>();

  constructor() {
    if (!localStorage.getItem('cartList')) {
      localStorage.setItem('cartList', JSON.stringify([]));
    }
  }

  getCartChanges() {
    return this.subject.asObservable();
  }

  getItems(): any[] {
    return JSON.parse(localStorage.getItem('cartList') || '[]');
  }

  saveItems(items: any[]) {
    localStorage.setItem('cartList', JSON.stringify(items));
    this.subject.next('changed');
  }

  addToCart(item: any) {
    const cart = this.getItems();
  
    const index = cart.findIndex(i =>
      i.productID === item.productID &&
      i.colorCode === item.colorCode &&
      i.image === item.image
    );
  
    if (index > -1) {
      cart[index].number += item.number;
    } else {
      item.number = item.number || 1;
      cart.push(item);
    }
  
    this.saveItems(cart);
  }

  deleteItem(item: any) {
    const cart = this.getItems().filter(i =>
      !(i.productID === item.productID &&
        i.colorCode === item.colorCode &&
        i.image === item.image)
    );
    this.saveItems(cart);
  }
  

  clearCart() {
    this.saveItems([]);
  }

  getCount(): number {
    return this.getItems().length;
  }
}
