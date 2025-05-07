import { Component } from '@angular/core';
import { LayoutService } from '../../layout.service';
import { PrimengModule } from '../../../primeng.module';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import { CartService } from '../../cart/cart.service'; // 👈 این رو اضافه کن

@Component({
  selector: 'app-article',
  standalone: true,
  imports: [PrimengModule, FormsModule],
  templateUrl: './article.component.html',
  styleUrl: './article.component.scss'
})
export class ArticleComponent {
  items: any[] = [];
  responsiveOptions = [
    { breakpoint: '1400px', numVisible: 2, numScroll: 1 },
    { breakpoint: '1199px', numVisible: 3, numScroll: 1 },
    { breakpoint: '767px', numVisible: 2, numScroll: 1 },
    { breakpoint: '575px', numVisible: 1, numScroll: 1 }
  ];

  constructor(
    private router: Router,
    private productService: ProductService,
    private cartService: CartService 
  ) {}

  ngOnInit(): void {
    this.items = this.productService.getProducts();
  }

  showProductDetails(product: any) {
    this.router.navigate(['/product', product.id]);
  }

  addToCart(item: any) {
    const cartItem = {
      id: item.id,
      title: item.name,
      number: 1,
      price: Number(item.price.replace(/,/g, '')), 
      image: item.url,
      color: null ,
    };

    this.cartService.addToCart(cartItem); 
    this.router.navigate(['/cart']);
  }
}
