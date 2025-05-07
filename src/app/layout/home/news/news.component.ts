import { Component } from '@angular/core';
import { PrimengModule } from '../../../primeng.module';
import { LayoutService } from '../../layout.service';
import { AccordionModule } from 'primeng/accordion';
import { Router } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import { CommonModule } from '@angular/common';
import { CartService } from '../../cart/cart.service';
@Component({
  selector: 'app-news',
  standalone: true,
  imports: [PrimengModule, AccordionModule],
  templateUrl: './news.component.html',
  styleUrl: './news.component.scss',

})
export class NewsComponent {

  items: any[] = [];
  responsiveOptions = [
    { breakpoint: '1400px', numVisible: 2, numScroll: 1 },
    { breakpoint: '1199px', numVisible: 3, numScroll: 1 },
    { breakpoint: '767px', numVisible: 2, numScroll: 1 },
    { breakpoint: '575px', numVisible: 1, numScroll: 1 }
  ];

  constructor(private router: Router, private productService: ProductService,
    private cartService: CartService,
  ) { }
  addToCart(item: any) {
    const cartItem = {
      id: item.id,
      title: item.name,
      number: 1, 
      price: Number(item.price.replace(/,/g, '')), 
      image: item.url,
      color: null 
    };

    this.cartService.addToCart(cartItem); 
    this.router.navigate(['/cart']); }
  ngOnInit(): void {
    this.items = this.productService.getProducts();
  }

  showProductDetails(product: any) {
    this.router.navigate(['/product', product.id]);
  }
}