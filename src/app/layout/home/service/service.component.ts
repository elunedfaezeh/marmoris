import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

interface Card {
  title: string;
  imageUrl: string;
}

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.scss']
})
export class ServiceComponent {
  cards: Card[] = [
    { title: 'جیمبو', imageUrl: '/assets/images/p1.jpg', },
    { title: '۶جیب', imageUrl: '/assets/images/p2.jpg', },
    { title: 'دوجیب', imageUrl: '/assets/images/p3.jpg', },
    { title: 'بدون جیب', imageUrl: '/assets/images/p4.jpg', },
    { title: 'تک‌ جیب', imageUrl: '/assets/images/p5.JPG', },
    { title: 'شاین', imageUrl: '/assets/images/p6.JPG', },
    { title: 'ویلو', imageUrl: '/assets/images/p7.JPG', } 
  ];

  constructor(private router: Router) {}

  navigateToCategory(category: string) {
    this.router.navigate(['/category', category]); 
  }
}