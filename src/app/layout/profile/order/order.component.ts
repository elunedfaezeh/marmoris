import { Component, OnInit } from '@angular/core';
import { PrimengModule } from '../../../primeng.module';
import { LocalStorageService } from '../../../auth/local-storage.service';
import { LayoutService } from '../../layout.service';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { DialogService } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [PrimengModule],
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss',
  providers: [DialogService],
})
export class OrderComponent implements OnInit {
  orders: any[] = [];
  constructor(
    private localStorage: LocalStorageService,
    private dialogService: DialogService,
    private service: LayoutService
  ) { }

  ngOnInit(): void {
    this.getOrdersByUser();
  }

  getOrdersByUser() {
    this.service.getOrdersByUser(this.localStorage.userToken, this.localStorage.userID).subscribe((response: any) => {
      if (response.success === true) {
        this.orders = response.data;
        console.log(this.orders);

      } else {
        // this.messageService.add({
        //   severity: 'error',
        //   detail: ' دریافت نشد ',
        // });
      }
    });
  }


  showDetail(id: string): void {
    let orders = this.orders.filter((item: any) => item._id == id)[0];
    const ref = this.dialogService.open(OrderDetailComponent, {
      data: {
        orders,
      },
      header: 'جزییات سفارش',
      width: window.innerWidth > 840 ? '90%' : '98%',
      // height:'100%',
      style: { "font-family": "myfont" },
    });
    ref.onClose.subscribe((res: any) => { });
  }


}
