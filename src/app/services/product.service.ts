import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  [x: string]: any;
  private products = [
    {
      id: 1,
      name: 'کیف جیمبو',
      category: 'کیف دستی',
      subcategory: 'جیمبو',
      price: '200,000',
      description: 'زیپ دار هستن، جای اویز کلید دارن، ۲ جیب بیرون',
      url: '/assets/images/p1.jpg',
      url2: '/assets/images/p2.jpg',
      images: [
        { url: '/assets/images/p1.jpg', colorCode: '#BBD8A3' }, // سبز
        { url: '/assets/images/p2.jpg', colorCode: '#cf748b' }, // صورتی
        { url: '/assets/images/p3.jpg' , colorCode: '#7AC6D2' }, // آبی
        { url: '/assets/images/p4.jpg' , colorCode: '#B7B1F2' }, // بنفش
        { url: '/assets/images/p6.JPG' , }, // بنفش
      ],
    },
    {
      id: 2,
      name: 'کیف آرایشی کوچک',
      category: 'کیف آرایشی',
      subcategory: 'کوچک',
      price: '200,000',
      description: 'کیف آرایشی کوچک، سبک و زیبا',
      url: '/assets/images/p4.jpg',
      url2: '/assets/images/p3.jpg',
      images: [
        { url: '/assets/images/p4.jpg', colorCode: '#BBD8A3' }, // سبز
        { url: '/assets/images/p2.jpg', colorCode: '#cf748b' }, // صورتی
        { url: '/assets/images/p3.jpg' , colorCode: '#7AC6D2' }, // آبی
        { url: '/assets/images/p4.jpg' , colorCode: '#B7B1F2' }, // بنفش
        { url: '/assets/images/p6.JPG' , }, // بنفش
      ],
    },
    {
      id: 3,
      name: 'کیف آرایشی بزرگ',
      category: 'کیف آرایشی',
      subcategory: 'بزرگ',
      price: '200,000',
      description: 'کیف آرایشی بزرگ با فضای زیاد',
      url: '/assets/images/p6.JPG',
      url2: '/assets/images/p7.JPG',
      images: [
        { url: '/assets/images/p6.JPG',colorCode: '#BBD8A3' }, // سبز
        { url: '/assets/images/p2.jpg', colorCode: '#cf748b' }, // صورتی
        { url: '/assets/images/p3.jpg' , colorCode: '#7AC6D2' }, // آبی
        { url: '/assets/images/p4.jpg' , colorCode: '#B7B1F2' }, // بنفش
        { url: '/assets/images/p6.JPG' , }, // بنفش
      ],

    },
    {
      id: 4,
      name: 'کیف آرایشی خاض',
      category: 'کیف آرایشی',
      subcategory: 'بزرگ',
      price: '200,000',
      description: 'کیف آرایشی بزرگ با فضای زیاد',
      url: '/assets/images/p5.JPG',
      url2: '/assets/images/p6.JPG',
      images: [
        { url: '/assets/images/p5.JPG', colorCode: '#BBD8A3' }, // سبز
        { url: '/assets/images/p2.jpg', colorCode: '#cf748b' }, // صورتی
        { url: '/assets/images/p3.jpg' , colorCode: '#7AC6D2' }, // آبی
        { url: '/assets/images/p4.jpg' , colorCode: '#B7B1F2' }, // بنفش
        { url: '/assets/images/p6.JPG' , }, // بنفش
      ],

    }
  ];

  constructor() { }

  getProducts() {
    return this.products;
  }
  getProductById(id: number) {
    return this.products.find(product => product.id === id);
  }

  getProductsByCategory(category: string) {
    return this.products.filter(product => product.category === category);
  }



}





