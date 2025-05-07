import { Component, OnInit } from '@angular/core';
import { FormsModule, NgModel, ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { PrimengModule } from '../../primeng.module';
import { LayoutService } from '../layout.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [PrimengModule, FormsModule, ReactiveFormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
  providers: [MessageService],
})
export class ProductsComponent implements OnInit {
  products: any[] = [];

  constructor(
    private service: LayoutService,
    private messageService: MessageService,
  ) { }

  // ngOnInit() {
  //   this.all = [
  //     { id: 0, title: "bag", price: 7000000, image: "/assets/images/1.png" },
  //     { id: 0, title: "belt", price: 7000000, image: "/assets/images/2.png" },
  //     { id: 0, title: "wallet", price: 7000000, image: "/assets/images/wallet.png" },
  //     { id: 0, title: "women's wallet", price: 7000000, image: "/assets/images/3.png" },
  //     { id: 0, title: "bag", price: 7000000, image: "/assets/images/4.png" },
  //     { id: 0, title: "shoes", price: 7000000, image: "/assets/images/shoes.png" },
  //     { id: 0, title: "women's wallet", price: 7000000, image: "/assets/images/wallet2.png" },
  //     { id: 0, title: "bag", price: 7000000, image: "/assets/images/1.png" },
  //   ];
  // }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.service.getProducts().subscribe((response: any) => {
      if (response.success === true) {
        this.products = response.data;
        console.log(this.products.length);
        
      } else {
        this.messageService.add({
          severity: 'error',
          summary: 'یافت نشد',
          detail: response.data,
        });
      }
    });
  }

}

























