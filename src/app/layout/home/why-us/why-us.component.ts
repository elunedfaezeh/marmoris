import { LayoutService } from '../../layout.service';
import { PrimengModule } from '../../../primeng.module';
import { FormsModule } from '@angular/forms';
import { Component, ElementRef, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-why-us',
  standalone: true,
  imports: [PrimengModule, FormsModule],
  templateUrl: './why-us.component.html',
  styleUrl: './why-us.component.scss'
})
export class whyusComponent implements OnInit {
image: any;
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  items = [
    { image: '/assets/images/delivery.png', title: 'ارسال ايمن سفارشات' },
    { image: '/assets/images/secure.png', title: 'پرداخت امن اينترنتى'},
    { image: '/assets/images/sup.png', title: 'پشتيبانى ۲۴ ساعته'},
    { image: '/assets/images/card.png', title: 'درگاه بانك ملى و زرين پال'},



  ];

}