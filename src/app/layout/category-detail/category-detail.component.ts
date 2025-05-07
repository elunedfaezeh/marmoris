import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MenuItem } from 'primeng/api';
import { PaginatorModule } from 'primeng/paginator';
import { TabMenuModule } from 'primeng/tabmenu';
import { ToolbarModule } from 'primeng/toolbar';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ButtonModule } from 'primeng/button';

interface Product {
  id: number;
  name: string;
  category: string;
  imageUrl: string;
  price?: number;
  color?: string;
  hasOffer?: boolean;
  available?: boolean;
  features?: string[];
  sales?: number;
  createdAt?: Date;
}

@Component({
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    PaginatorModule,
    TabMenuModule,
    ToolbarModule,
    BreadcrumbModule,
    ButtonModule
  ],
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.scss']
})
export class CategoryDetailComponent {
  category: string | null = null;

  products: Product[] = [
    {id: 1, name: 'جیمبو ۱', category: 'جیمبو', imageUrl: '/assets/images/p1.jpg', price: 250000, color: '#FF0000', hasOffer: false, available: true, sales: 100, createdAt: new Date('2025-01-01'), features: ['سبک', 'نرم'] },
    {id: 2, name: 'جیمبو ۲', category: 'جیمبو', imageUrl: '/assets/images/p2.jpg', price: 300000, color: '#00FF00', hasOffer: false, available: true, sales: 50, createdAt: new Date('2025-03-01') },
    {id: 3, name: 'جیمبو ۳', category: 'جیمبو', imageUrl: '/assets/images/p3.jpg', price: 320000, color: '#0000FF', hasOffer: true, available: false, sales: 150, createdAt: new Date('2025-02-01') },
    {id: 4, name: 'جیمبو ۴', category: 'جیمبو', imageUrl: '/assets/images/p1.jpg', price: 250000, color: '#FF0000', hasOffer: true, available: true, sales: 100, createdAt: new Date('2025-01-01'), features: ['سبک', 'نرم'] },
    {id: 4, name: 'جیمبو ۵', category: 'جیمبو', imageUrl: '/assets/images/p2.jpg', price: 300000, color: '#00FF00', hasOffer: true, available: true, sales: 50, createdAt: new Date('2025-03-01') },
    {id: 6, name: 'جیمبو ۶', category: 'جیمبو', imageUrl: '/assets/images/p3.jpg', price: 320000, color: '#0000FF', hasOffer: true, available: false, sales: 150, createdAt: new Date('2025-02-01') },
    {id: 7, name: '۶جیب ۱', category: '۶جیب', imageUrl: '/assets/images/p2.jpg', price: 280000, color: '#FFAA00', hasOffer: false, available: true, sales: 100, createdAt: new Date('2025-01-01') },
    {id: 8, name: '۶جیب ۲', category: '۶جیب', imageUrl: '/assets/images/p2.jpg', price: 285000, color: '#333333', hasOffer: true, available: true, sales: 150, createdAt: new Date('2025-03-01') },
    {id: 9, name: 'دوجیب ۱', category: 'دوجیب', imageUrl: '/assets/images/p3.jpg', price: 200000, color: '#FFFFFF', hasOffer: false, available: false, sales: 50, createdAt: new Date('2025-02-01') },
    {id: 10, name: 'دوجیب ۲', category: 'دوجیب', imageUrl: '/assets/images/p3-2.jpg', price: 210000, color: '#000000', hasOffer: true, available: true, sales: 200, createdAt: new Date('2025-01-20') },
    {id: 11, name: 'بدون جیب ۱', category: 'بدون جیب', imageUrl: '/assets/images/p4.jpg', price: 190000, color: '#FFC0CB', hasOffer: false, available: true, sales: 50, createdAt: new Date('2025-01-15') },
    {id: 12, name: 'بدون جیب ۲', category: 'بدون جیب', imageUrl: '/assets/images/p4-2.jpg', price: 195000, color: '#800080', hasOffer: true, available: true, sales: 80, createdAt: new Date('2025-02-10') },
    {id: 13, name: 'تک‌جیب ۱', category: 'تک‌ جیب', imageUrl: '/assets/images/p5.JPG', price: 230000, color: '#FFA500', hasOffer: false, available: false, sales: 30, createdAt: new Date('2025-01-10') },
    {id: 14, name: 'تک‌جیب ۲', category: 'تک‌ جیب', imageUrl: '/assets/images/p5-2.JPG', price: 235000, color: '#A52A2A', hasOffer: true, available: true, sales: 90, createdAt: new Date('2025-03-05') },
    {id: 15, name: 'شاین ۱', category: 'شاین', imageUrl: '/assets/images/p6.JPG', price: 340000, color: '#DAA520', hasOffer: true, available: true, sales: 120, createdAt: new Date('2025-02-25') },
    {id: 16, name: 'شاین ۲', category: 'شاین', imageUrl: '/assets/images/p6-2.JPG', price: 345000, color: '#2E8B57', hasOffer: false, available: true, sales: 60, createdAt: new Date('2025-01-30') },
    {id: 17, name: 'ویلو ۱', category: 'ویلو', imageUrl: '/assets/images/p7.JPG', price: 310000, color: '#B22222', hasOffer: true, available: true, sales: 150, createdAt: new Date('2025-02-05') },
    {id: 18, name: 'ویلو ۲', category: 'ویلو', imageUrl: '/assets/images/p7-2.JPG', price: 315000, color: '#1E90FF', hasOffer: false, available: true, sales: 70, createdAt: new Date('2025-03-01') }
  ];

  filteredProducts: Product[] = [];
  first = 0;
  rows = 6;

  activeItem: MenuItem = { label: 'جدیدترین' };
  tabs: MenuItem[] = [
    { label: 'جدیدترین' },
    { label: 'پرفروش‌ها' },
    { label: 'پیشنهادی' },
    { label: 'فقط موجودها' } 
  ];

  activeFilter: string = 'newest';

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.category = params.get('category');
      this.applyFilter(this.activeFilter);
    });
  }

  activateMenu(item: MenuItem) {
    this.activeItem = item;
    this.applyFilter(
      item.label === 'جدیدترین' ? 'newest' :
      item.label === 'پرفروش‌ها' ? 'bestseller' :
      item.label === 'پیشنهادی' ? 'offer' :
      item.label === 'فقط موجودها' ? 'available' :
      'newest'
    );
  }

  onPageChange(event: any) {
    this.first = event.first;
    this.rows = event.rows;
  }

  applyFilter(type: string) {
    this.activeFilter = type;

    this.filteredProducts = this.products.filter(p =>
      !this.category || p.category === this.category
    );

    if (type === 'newest') {
      this.filteredProducts.sort((a, b) => b.createdAt!.getTime() - a.createdAt!.getTime());
    } else if (type === 'bestseller') {
      this.filteredProducts.sort((a, b) => b.sales! - a.sales!);
    } else if (type === 'offer') {
      this.filteredProducts = this.filteredProducts.filter(p => p.hasOffer);
    } else if (type === 'available') {
      this.filteredProducts = this.filteredProducts.filter(p => p.available);
    }

    this.first = 0;
  }

  showProductDetails(product: Product) {
    if (!product.id) {
      console.warn('این محصول شناسه ندارد و قابل نمایش نیست.');
      return;
    }
    this.router.navigate(['/product', product.id]);
  }
}
