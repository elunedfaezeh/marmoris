import { AdminService } from './../../admin.service';
import { LocalStorageService } from './../../../../auth/local-storage.service';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { PrimengModule } from '../../../../primeng.module';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-add-admin',
  standalone: true,
  imports: [ReactiveFormsModule, PrimengModule,NgIf,NgFor],
  templateUrl: './add-admin.component.html',
  styleUrl: './add-admin.component.scss',
  providers: [MessageService],

})
export class AddAdminComponent implements OnInit {

  form: FormGroup | any;
  selectedItems: any[] | any;
  items = [
    {
      title: 'داشبورد',
    },
    {
      title: 'لیست سفارشات',
    },
    {
      title: 'دسته بندی محصول',
    },
    {
      title: 'لیست محصولات',
    },
    {
      title: 'کاربران',
    },
    {
      title: 'مدیریت پیام ها',
    },
    {
      title: 'سوالات متداول',
    },
    {
      title: 'مدیران',
    },
  ];


  errorMessages = {
    userName: [{ type: 'required', message: 'نام کاربری را وارد کنید.' }],
    password: [{ type: 'required', message: 'رمز عبور را وارد کنید.' }],
    fullName: [
      { type: 'required', message: 'نام و نام خانوادگی را وارد کنید.' },
    ],
  };

  constructor(
    private messageService: MessageService,
    private localStorage: LocalStorageService,
    private service: AdminService,
    public ref: DynamicDialogRef) {

  }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.form = new FormGroup({
      userName: new FormControl(
        null,
        Validators.compose([Validators.required])
      ),
      password: new FormControl(
        null,
        Validators.compose([Validators.required])
      ),
      fullName: new FormControl(
        null,
        Validators.compose([Validators.required])
      ),
      image: new FormControl(null),
      accessLevel: new FormControl(null),
    });
  }

  onFileUpload(event: any): void {
    const file: File = event.files[0];
    const formData = new FormData();
    formData.append("file", file, file.name);
    this.service
      .upload(formData)
      .subscribe((response: { success: boolean; imagePath: any; data: any; }) => {
        if (response.success === true) {
          this.form.controls.image.setValue(response.imagePath);
          this.messageService.add({
            severity: 'success',
            summary: 'آپلود فایل',
            detail: 'آپلود شد.',
          });
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'آپلود تصویر ',
            detail: response.data,
          });
        }
      });
  }


  submitForm(): void {
    this.service
      .addAdmin(this.localStorage.userToken, this.form.value)
      .subscribe((response: { success: boolean; data: any; }) => {
        if (response.success === true) {
          this.ref.close(true);
        } else {
          this.messageService.add({
            severity: 'error',
            summary: ' ثبت اطلاعات ',
            detail: response.data,
          });
        }
      });
  }
}
