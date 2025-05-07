import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { AdminService } from '../../admin.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../../../../auth/local-storage.service';
import { PrimengModule } from '../../../../primeng.module';

@Component({
  selector: 'app-edit-order',
  standalone: true,
  templateUrl: './edit-order.component.html',
  styleUrl: './edit-order.component.scss',
  imports: [ReactiveFormsModule, PrimengModule],
  providers: [MessageService]
})
export class EditOrderComponent implements OnInit {
  form: FormGroup | any;
  data: any;
  constructor(
    private localStorage: LocalStorageService,
    private service: AdminService,
    public ref: DynamicDialogRef,
    public messageService: MessageService,
    public config: DynamicDialogConfig) {
  }
  status = [
    { title: "pending" },
    { title: "registered" },
    { title: "packing" },
    { title: "sending" },
    { title: "delivered" },
  ]
  ngOnInit(): void {
    this.data = this.config.data.data;
    this.createForm();
  }

  createForm() {
    this.form = new FormGroup({
      status: new FormControl(this.data.status),
    });
  }

  onChange(e: any) {
    this.form.controls.status.setValue(e.value.title);
  }

  submitForm(): void {
    this.service.editOrder(this.localStorage.userToken, this.data._id, this.form.value).subscribe((response: any) => {
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




