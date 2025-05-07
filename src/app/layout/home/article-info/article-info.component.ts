import { LayoutService } from '../../layout.service';
import { PrimengModule } from '../../../primeng.module';
import { FormsModule } from '@angular/forms';
import { Component, ElementRef, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-article-info',
  standalone: true,
  imports: [PrimengModule, FormsModule, CarouselModule],
  templateUrl: './article-info.component.html',
  styleUrl: './article-info.component.scss'
})
export class ArticleInfoComponent implements OnInit {
image: any;
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  items = [
    { image: '/assets/images/delivery.png', title: 'ارسال ايمن سفارشات' },
    { image: '/assets/images/o.png', title: 'پرداخت امن اينترنتى'},
    { image: '/assets/images/support.png', title: 'پشتيبانى ٢٢ ساعته'},
    { image: '/assets/images/7.png', title: 'درگاه بانك ملى و زرين پال'},



  ];

}