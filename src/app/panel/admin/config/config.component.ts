import { TokenService } from './../../../auth/token.service';
import { LocalStorageService } from './../../../auth/local-storage.service';
import { AddAdminComponent } from './add-admin/add-admin.component';
import { EditAdminComponent } from './edit-admin/edit-admin.component';
import { AdminService } from './../admin.service';
import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { PrimengModule } from '../../../primeng.module';
import { NgIf } from '@angular/common';
@Component({
  selector: 'app-config',
  standalone: true,
  imports: [PrimengModule,NgIf],
  templateUrl: './config.component.html',
  styleUrl: './config.component.scss',
  providers: [MessageService, ConfirmationService, DialogService],

})
export class ConfigComponent {
  admins: any[] | any;

  constructor(
    private messageService: MessageService,
    private service: AdminService,
    private token: TokenService,
    private localStorage: LocalStorageService,
    private dialogService: DialogService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit(): void {
    this.getAdmins();
  }

  getAdmins(): any {
    this.service.getAdmins(this.localStorage.userToken).subscribe((response: { success: boolean; data: any[] | undefined; }) => {
      if (response.success === true) {
        this.admins = response.data;
      } else {
        this.token.checkTokenExamination(response.data, 'admin');
        this.messageService.add({
          severity: 'error',
          summary: ' دریافت اطلاعات ',
        });
      }
    });
  }

  showAddAdminDialog(): void {
    const ref = this.dialogService.open(AddAdminComponent, {
      header: 'ثبت مدیر',
      width: window.innerWidth > 840 ? '70%' : '95%',
      style: { "font-family": "myfont" },
    });
    ref.onClose.subscribe((res) => {
      if (res === true) {
        this.messageService.add({
          severity: 'success',
          summary: ' ثبت شد ',
        });
        this.getAdmins();
      }
    });
  }

  showEditAdminDialog(id: string): void {
    let admin = this.admins.filter((x: { _id: string; }) => x._id == id)[0];
    const ref = this.dialogService.open(EditAdminComponent, {
      data: {
        admin,
      },
      header: 'ویرایش ادمین',
      width: window.innerWidth > 840 ? '70%' : '95%',
      style: { "font-family": "myfont" },
    });
    ref.onClose.subscribe((res) => {
      if (res === true) {
        this.messageService.add({
          severity: 'success',
          summary: ' ویرایش شد ',
        });
        this.getAdmins();
      }
    });
  }


  deleteAdmin(id: any, image: string): void {
    this.confirmationService.confirm({
      message: 'آیا از حذف مطمئنید؟',
      header: '',
      icon: 'pi pi-exclamation-triangle',
      rejectLabel: 'خیر',
      acceptLabel: 'بله',
      defaultFocus: 'reject',
      accept: () => {
        // delete from db
        if (image) {
          const filename = image.replace('http://localhost:3368/public/uploads/', '')
          this.service.deleteFile({ path: filename }).subscribe();
        }

        this.service.deleteAdmin(this.localStorage.userToken, id).subscribe((response: { success: boolean; data: any; }) => {
          if (response.success === true) {
            this.confirmationService.close();
            this.messageService.add({
              severity: 'success',
              summary: ' حذف اطلاعات ',
              detail: response.data,
            });
            this.getAdmins();
          } else {
            this.messageService.add({
              severity: 'error',
              summary: ' حذف اطلاعات ',
              detail: response.data,
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

