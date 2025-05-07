import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { AdminService } from '../../admin.service';
import { Validators, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from './../../../../auth/local-storage.service';
import { PrimengModule } from '../../../../primeng.module';

@Component({
  selector: 'app-gallery-add',
  templateUrl: './gallery-add.component.html',
  styleUrls: ['./gallery-add.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, PrimengModule],
  providers: [MessageService]

})
export class GalleryAddComponent implements OnInit {
  form: FormGroup | any;
  constructor(
    private localStorage: LocalStorageService,
    private service: AdminService,
    public ref: DynamicDialogRef,
    public messageService: MessageService,
    public config: DynamicDialogConfig) {
  }
  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.form = new FormGroup({
      url: new FormControl(null),
      alt: new FormControl(null),
    });
  }

  onFileUpload(event: any) {
    const formData = new FormData();
    formData.append('file', event.files[0], event.files[0].name);
    this.service.upload(formData).subscribe((response: any) => {
      if (response.success === true) {
        this.form.controls.url.setValue(response.path);
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

  submitForm(): void {
    if (this.form.controls.url.value == null) {
      this.messageService.add({
        severity: 'error',
        summary: ' تصویر را آپلود کنید.',
      });
    } else if (this.form.controls.alt.value == null) {
      this.messageService.add({
        severity: 'error',
        summary: ' توضیح تصویر را وارد کنید.',
      });
    } else {
      this.service.addGallery(this.localStorage.userToken, this.form.value).subscribe((response: any) => {
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

}






