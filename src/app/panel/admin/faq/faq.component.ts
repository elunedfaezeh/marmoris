import { FaqAddComponent } from './faq-add/faq-add.component';
import { DialogService } from 'primeng/dynamicdialog';
import { AdminService } from './../admin.service';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from './../../../auth/local-storage.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { PrimengModule } from '../../../primeng.module';

@Component({
  selector: 'app-faq',
  standalone: true,
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.scss',
  imports: [ReactiveFormsModule, PrimengModule],
  providers: [MessageService, ConfirmationService, DialogService],
})

export class FaqComponent implements OnInit {
  faqs: any[] | any;
  form: FormGroup | any;

  constructor(
    private messageService: MessageService,
    private service: AdminService,
    private localStorage: LocalStorageService,
    private dialogService: DialogService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit(): void {
    this.getFaqs();
    this.createForm();
  }

  createForm() {
    this.form = new FormGroup({
      question: new FormControl(null),
      reply: new FormControl(null),
    });
  }
  getFaqs(): any {
    this.service.getFaqs(this.localStorage.userToken).subscribe((response: any) => {
      if (response.success === true) {
        this.faqs = response.data;
      } else {
        this.messageService.add({
          severity: 'error',
          summary: ' دریافت اطلاعات ',
          detail: response.data,
        });
      }
    });
  }

  editFaq(id: any) {
    this.service.editFaq(this.localStorage.userToken, id, this.form.value).subscribe((response: any) => {
      if (response.success === true) {
        this.messageService.add({
          severity: 'success',
          summary: ' ثبت شد ',
        });
        this.getFaqs();
      } else {
        this.messageService.add({
          severity: 'error',
          summary: ' ثبت اطلاعات ',
          detail: response.data,
        });
      }
    });
  }

  showAddFaqDialog(): void {
    const ref = this.dialogService.open(FaqAddComponent, {
      header: 'ثبت سوال',
      width: window.innerWidth > 840 ? '60%' : '95%',
      style: { "font-family": "farsi" },
    });
    ref.onClose.subscribe((res) => {
      if (res === true) {
        this.messageService.add({
          severity: 'success',
          summary: ' ثبت اطلاعات ',
          detail: 'اطلاعات با موفقیت ثبت شد.'
        });
        this.getFaqs();
      }
    });
  }

  deleteFaq(id: any): void {
    this.confirmationService.confirm({
      message: 'آیا از حذف مطمئنید؟',
      header: 'تایید حذف',
      icon: 'pi pi-exclamation-triangle',
      rejectLabel: 'خیر',
      acceptLabel: 'بله',
      defaultFocus: 'reject',
      accept: () => {
        this.service.deleteFaq(this.localStorage.userToken, id).subscribe((response: any) => {
          if (response.success === true) {
            this.confirmationService.close();
            this.messageService.add({
              severity: 'success',
              summary: ' حذف اطلاعات ',
              detail: response.data,
            });
            this.getFaqs();
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

