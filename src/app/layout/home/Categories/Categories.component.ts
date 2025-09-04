import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CarouselModule } from 'primeng/carousel';

interface Card {
  title: string;
  imageUrl: string;
}

@Component({
  standalone: true,
  imports: [CommonModule, CarouselModule],
  selector: 'app-Categories',
  templateUrl: './Categories.component.html',
  styleUrls: ['./Categories.component.scss']
})
export class CategoriesComponent {
  cards: Card[] = [
    { title: 'جیمبو', imageUrl: '/assets/images/p1.jpg' },
    { title: '۶جیب', imageUrl: '/assets/images/p2.jpg' },
    { title: 'دوجیب', imageUrl: '/assets/images/p3.jpg' },
    { title: 'بدون جیب', imageUrl: '/assets/images/p4.jpg' },
    { title: 'تک‌ جیب', imageUrl: '/assets/images/p5.JPG' },
    { title: 'شاین', imageUrl: '/assets/images/p6.JPG' },
    { title: 'کیف ارگنایز پرجیب', imageUrl: '/assets/images/p7.JPG' } 
  ];

  responsiveOptions = [
    { breakpoint: '1400px', numVisible: 6, numScroll: 1 },
    { breakpoint: '1199px', numVisible: 4, numScroll: 1 },
    { breakpoint: '991px', numVisible: 3, numScroll: 1 },
    { breakpoint: '767px', numVisible: 2, numScroll: 1 },
    { breakpoint: '575px', numVisible: 2, numScroll: 1 } 
  ];
  

  constructor(private router: Router) {}

  navigateToCategory(category: string) {
    this.router.navigate(['/category', category]);
  }
}
