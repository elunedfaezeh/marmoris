import { Component, OnInit } from '@angular/core';
import { PrimengModule } from '../../../primeng.module';
import { LayoutService } from '../../layout.service';


@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [PrimengModule],
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements OnInit {
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  faqs: any[] = [
    { question: ' چطور هزینه سفارش رو پرداخت کنم؟', reply: ' جواب' },
    { question: ' چطور هزینه سفارش رو پرداخت کنم؟', reply: ' جواب' },
    { question: ' چطور هزینه سفارش رو پرداخت کنم؟', reply: ' جواب' },





  ];

  // constructor(private service: LayoutService) { }

  // ngOnInit(): void {
  //   this.getFaqs();
  // }

  // getFaqs() {
  //   this.service.getFaqs()
  //     .subscribe((response: any) => {
  //       if (response.success === true) {
  //         this.faqs = response.data;
  //       } else {
  //         // this.messageService.add({
  //         //   severity: 'error',
  //         //   summary: ''
  //         // })
  //       }
  //     });
  // }
  

}
