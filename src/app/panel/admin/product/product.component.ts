import { ProductAddComponent } from './product-add/product-add.component';
import { DialogService } from 'primeng/dynamicdialog';
import { AdminService } from '../admin.service';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../../../auth/local-storage.service';
import { PrimengModule } from '../../../primeng.module';
import { ProductEditComponent } from './product-edit/product-edit.component';

@Component({
  selector: 'app-product',
  standalone: true,
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
  imports: [PrimengModule],
  providers: [MessageService, ConfirmationService, DialogService],
})
export class ProductComponent implements OnInit {
  products: any[] | any;

  constructor(
    private messageService: MessageService,
    private service: AdminService,
    private localStorage: LocalStorageService,
    private dialogService: DialogService,
    private confirmationService: ConfirmationService
  ) { }


  ngOnInit(): void {
    this.getProduct();
  }

  getProduct(): any {
    this.service.getProducts(this.localStorage.userToken).subscribe((response: any) => {
      if (response.success === true) {
        this.products = response.data;
        console.log(this.products);
      } else {
        this.messageService.add({
          severity: 'error',
          summary: ' دریافت نشد ',
        });
      }
    });
  }


  showAdd(): void {
    const ref = this.dialogService.open(ProductAddComponent, {
      header: 'ثبت محصول',
      width: window.innerWidth > 840 ? '90%' : '98%',
      style: { "font-family": "farsi" },
    });
    ref.onClose.subscribe((res) => {
      if (res === true) {
        this.messageService.add({
          severity: 'success',
          summary: 'ثبت شد ',
        });
        this.getProduct();
      }
    });
  }

  
  showEdit(id: string): void {
    let data = this.products.filter((x:any) => x._id == id)[0];
    const ref = this.dialogService.open(ProductEditComponent, {
      data: {
        data,
      },
      header: 'ویرایش کاربر',
      width: window.innerWidth > 840 ? '80%' : '95%',
      style: { "font-family": "farsi" }
    });
    ref.onClose.subscribe((res) => {
      if (res === true) {
        this.messageService.add({
          severity: 'success',
          summary: ' ویرایش شد ',
        });
        this.getProduct();
      }
    });
  }

  delete(id: any): void {
    this.confirmationService.confirm({
      message: 'آیا از حذف مطمئنید؟',
      header: 'تایید حذف',
      icon: 'pi pi-exclamation-triangle',
      rejectLabel: 'خیر',
      acceptLabel: 'بله',
      defaultFocus: 'reject',
      accept: () => {
        this.service
          .deleteProduct(this.localStorage.userToken, id)
          .subscribe((response: any) => {
            if (response.success === true) {
              this.confirmationService.close();
              this.messageService.add({
                severity: 'success',
                summary: 'حذف شد',
              });
              this.getProduct()
            } else {
              this.messageService.add({
                severity: 'error',
                summary: 'حذف نشد',
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
