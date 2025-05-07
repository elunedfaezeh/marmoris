import { Component, OnInit } from '@angular/core';
import { TokenService } from './../../../auth/token.service';
import { LocalStorageService } from './../../../auth/local-storage.service';
import { AdminService } from './../admin.service';
import { DialogService } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { EditOrderComponent } from './edit-order/edit-order.component';
import { PrimengModule } from '../../../primeng.module';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
  standalone: true,
  imports: [PrimengModule, NgIf],
  providers: [DialogService, MessageService, ConfirmationService]
})
export class OrderComponent implements OnInit {
  orders: any[] = [];
  number = 15;
  testStyle: any;

  constructor(
    private messageService: MessageService,
    private dialogService: DialogService,
    private service: AdminService,
    private token: TokenService,
    private localStorage: LocalStorageService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit(): void {
    this.getOrders();
  }

  getOrders(): any {
    this.service.getOrders(this.localStorage.userToken).subscribe((response: any) => {
      if (response.success === true) {
        this.orders = response.data;
      } else {
        this.token.checkTokenExamination(response.data, 'admin');
      }
    });
  }



  showEdit(id: string): void {
    let data = this.orders.filter((x) => x._id == id)[0];
    const ref = this.dialogService.open(EditOrderComponent, {
      data: {
        data,
      },
      header: 'ویرایش وضعیت',
      width: window.innerWidth > 840 ? '50%' : '95%',
      height: '500px',
      style: { "font-family": "farsi" }
    });
    ref.onClose.subscribe((res) => {
      if (res === true) {
        this.messageService.add({
          severity: 'success',
          summary: ' ویرایش شد ',
        });
        this.getOrders();
      }
    });
  }

  deleteUser(id: any): void {
    this.confirmationService.confirm({
      message: 'آیا از حذف رکورد انتخابی مطمین هستید؟',
      header: 'تایید حذف',
      icon: 'pi pi-exclamation-triangle',
      rejectLabel: 'خیر',
      acceptLabel: 'بله',
      defaultFocus: 'reject',
      accept: () => {
        this.service.deleteOrder(this.localStorage.userToken, id).subscribe((response: any) => {
          if (response.success === true) {
            this.confirmationService.close();
            this.messageService.add({
              severity: 'success',
              summary: ' حذف شد',
            });
            this.getOrders();
          } else {
            this.messageService.add({
              severity: 'error',
              summary: ' حذف نشد ',
            });
          }
        });
      },
      reject: () => {
        this.confirmationService.close();
      },
    });
  }
}
