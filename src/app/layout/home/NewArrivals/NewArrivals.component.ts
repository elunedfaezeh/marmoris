import { Component } from '@angular/core';
import { PrimengModule } from '../../../primeng.module';
import { LayoutService } from '../../layout.service';
import { AccordionModule } from 'primeng/accordion';
import { Router } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import { CommonModule } from '@angular/common';
import { CartService } from '../../cart/cart.service';
import { PriceFormatPipe } from '../../shared/price-format.pipe';
@Component({
  selector: 'app-NewArrivals',
  standalone: true,
  imports: [PrimengModule, AccordionModule,PriceFormatPipe],
  templateUrl: './NewArrivals.component.html',
  styleUrl: './NewArrivals.component.scss',

})
export class NewArrivalsComponent {

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