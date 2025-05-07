import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { AdminService } from '../../admin.service';
import { Validators, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../../../../auth/local-storage.service';
import { PrimengModule } from '../../../../primeng.module';

@Component({
  selector: 'app-product-add',
  standalone: true,
  templateUrl: './product-edit.component.html',
  styleUrl: './product-edit.component.scss',
  imports: [ReactiveFormsModule, PrimengModule],
  providers: [MessageService]
})
export class ProductEditComponent implements OnInit {
  form: FormGroup | any;
  myGroup: FormGroup | any;
  myFeature: FormGroup | any;
  features: any[] = [];
  data: any;
  constructor(
    private localStorage: LocalStorageService,
    private service: AdminService,
    public ref: DynamicDialogRef,
    public messageService: MessageService,
    public config: DynamicDialogConfig) {
  }

  ngOnInit(): void {
    this.data = this.config.data.data;
    this.features = this.data.features;
    this.createForm();
  }


  delFeature(index: any) {
    this.features.splice(index, 1);
  }

  addFeature() {
    if (this.myFeature.value.feature == null || this.myFeature.value.value == null) {
      this.messageService.add({
        severity: 'error',
        summary: 'لطفا اطلاعات به طور کامل وارد کنید',
      });
    }
    else {
      this.features.push({
        feature: this.myFeature.value.feature,
        value: this.myFeature.value.value,
      });
    }
    this.myFeature.controls['feature'].reset();
    this.myFeature.controls['value'].reset();
  }

  createForm() {

    this.myGroup = new FormGroup({
      cell: new FormControl(null),
    });

    this.myFeature = new FormGroup({
      feature: new FormControl(null),
      value: new FormControl(null),
    });

    this.form = new FormGroup({
      title: new FormControl(this.data.title),
      description: new FormControl(this.data.description),
      price: new FormControl(this.data.price),
      image: new FormControl(this.data.image),
      features: new FormControl(this.data.features),
      gallery: new FormControl(this.data.gallery),
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

  onMultipleUpload(event: any): void {
    const formData = new FormData();
    for (let i = 0; i < event.files.length; i++) {
      formData.append('files', event.files[i], event.files[i].name);
    }
    this.service.multiUpload(formData).subscribe((response: any) => {
      if (response.success === true) {
        let gallery: any[] = [];
        response.data.forEach((element: any) => {
          gallery.push(element);
        });
        this.form.controls.gallery.setValue(gallery);
        this.messageService.add({
          severity: 'success',
          summary: 'آپلود شد ',
        });
      } else {
        this.messageService.add({
          severity: 'error',
          summary: 'آپلود نشد',
        });
      }
    });
  }

  submitForm(): void {
    this.form.controls.features.setValue(this.features);
    if (this.form.controls.title.value == null) {
      this.messageService.add({
        severity: 'error',
        summary: 'عنوان را وارد کنید',
      });
    } else if (this.form.controls.description.value == null) {
      this.messageService.add({
        severity: 'error',
        summary: 'توضیحات را وارد کنید',
      });
    } else {
      this.service.editProduct(this.localStorage.userToken,this.data._id, this.form.value).subscribe((response: any) => {
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






