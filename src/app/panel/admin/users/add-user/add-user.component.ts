import { Component, OnInit, Input } from '@angular/core';
import { AdminService } from './../../admin.service';
import { LocalStorageService } from './../../../../auth/local-storage.service';
import { MessageService } from 'primeng/api';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { PrimengModule } from '../../../../primeng.module';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, PrimengModule],
  providers: [MessageService]
})
export class AddUserComponent implements OnInit {

  form: FormGroup | any;

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
      mobile: new FormControl(null),
    });
  }


  submitForm(): void {
    if (this.form.controls.mobile.value == null) {
      this.messageService.add({
        severity: 'error',
        summary: 'شماره موبایل را وارد کنید',
      });
    } else {
    this.service.authUser(this.localStorage.userToken, this.form.value).subscribe((response: { success: boolean; data: any; }) => {
        if (response.success === true) {
          this.ref.close(true);
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'ثبت شد ',
          });
        }
      });
    }
  }

}

