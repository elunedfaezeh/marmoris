import { Component, OnInit } from '@angular/core';
import { AdminService } from './../../admin.service';
import { LocalStorageService } from './../../../../auth/local-storage.service';
import { MessageService } from 'primeng/api';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { PrimengModule } from '../../../../primeng.module';

@Component({
  selector: 'app-edit-admin',
  standalone: true,
  imports: [ReactiveFormsModule, PrimengModule],
  templateUrl: './edit-admin.component.html',
  styleUrl: './edit-admin.component.scss'
})
export class EditAdminComponent {

  admin: any;
  form: FormGroup | any;

  constructor(
    private messageService: MessageService,
    private localStorage: LocalStorageService,
    private service: AdminService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig) { }

  ngOnInit(): void {
    this.admin = this.config.data.admin;
    this.createForm();
  }

  createForm() {
    this.form = new FormGroup({
      userName: new FormControl(this.admin.userName),
      password: new FormControl(this.admin.password),
      fullName: new FormControl(this.admin.fullName),
      image: new FormControl(this.admin.image),
      //  accessLevel: new FormControl(this.user.accessLevel),
    });
  }


  submitForm(): void {
    this.service.editAdmin(this.localStorage.userToken, this.admin._id, this.form.value)
      .subscribe((response: any) => {
        if (response.success === true) {
          this.ref.close(true);
        } else {
          this.messageService.add({
            severity: 'error',
            summary: ' ثبت نشد ',
          });
        }
      });
  }


  onFileUpload(event: any) {
    const formData = new FormData();
    formData.append('file', event.files[0], event.files[0].name);
    this.service.upload(formData).subscribe((response: any) => {
      if (response.success === true) {
        this.form.controls.image.setValue(response.path);
        this.messageService.add({
          severity: 'success',
          summary: 'آپلود شد ',
        });
      } else {
        this.messageService.add({
          severity: 'error',
          summary: 'آپلود نشد',
          detail: response.data,
        });
      }
    });
  }

}