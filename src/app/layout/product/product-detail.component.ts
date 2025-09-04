import { Component } from '@angular/core';
import { PrimengModule } from '../../primeng.module';
import { LayoutService } from '../layout.service';
import { MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { CartService } from '../cart/cart.service';
import { PriceFormatPipe } from '../shared/price-format.pipe';

interface Color {
  name: string;
  code: string;
}

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [PrimengModule, FormsModule,PriceFormatPipe],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss',
  providers: [MessageService],
})
export class productdetailComponent {
  Colors: Color[] = [
    { name: 'سبز', code: '#BBD8A3' },
    { name: 'صورتی', code: '#cf748b' },
    { name: 'آبی', code: '#7AC6D2' },
    { name: 'بنفش', code: '#B7B1F2' },
  ];

  selectedColor: Color | undefined;
  activeIndex = 0;
  count = 1;
  product: any;
  displayDialog = false;

  responsiveOptions = [
    { breakpoint: '1300px', numVisible: 4 },
    { breakpoint: '575px', numVisible: 1 }
  ];

  constructor(
    private cartService: CartService,
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const productId = +params.get('id')!;
      this.product = this.productService.getProductById(productId);
    });
  }

  selectColor(color: Color): void {
    this.selectedColor = color;
    const index = this.product?.images.findIndex(
      (img: any) => img.colorCode?.toLowerCase() === color.code.toLowerCase()
    );
    if (index !== -1) {
      this.activeIndex = index;
    }
  }

  increase(): void {
    this.count++;
  }

  decrease(): void {
    if (this.count > 1) this.count--;
  }

  addToCart(): void {
    if (!this.selectedColor) {
      this.displayDialog = true;
      return;
    }

    const cartItem = {
      productID: this.product.id,
      title: this.product.name,
      number: this.count,
      price: this.product.price, 
      image: this.product.images[this.activeIndex]?.url || this.product.images[0]?.url,
      colorCode: this.selectedColor.code,
      colorName: this.selectedColor.name,
    };
    

    this.cartService.addToCart(cartItem);
    this.messageService.add({
      severity: 'success',
      summary: 'موفقیت',
      detail: 'محصول به سبد خرید اضافه شد!'
    });
    this.displayDialog = false;
  }
}
