import { Component, OnInit, Input } from '@angular/core';
import { AdminService } from './../../admin.service';
import { LocalStorageService } from './../../../../auth/local-storage.service';
import { MessageService } from 'primeng/api';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { PrimengModule } from '../../../../primeng.module';

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrl: './add-comment.component.scss',
  standalone: true,
  imports: [ReactiveFormsModule, PrimengModule],
  providers: [MessageService]
})
export class AddCommentComponent implements OnInit {

  form: FormGroup | any;
  users: any;

  constructor(
    private messageService: MessageService,
    private localStorage: LocalStorageService,
    private service: AdminService,
    public ref: DynamicDialogRef) {
  }
  ngOnInit(): void {
    this.getData();
    this.createForm();
  }
  onChange(e: any) {
    this.form.controls.userID.setValue(e.value._id);
  }
  createForm() {
    this.form = new FormGroup({
      userID:new FormControl(null),
      comment: new FormControl(null),
      rate:new FormControl(null),
    });
  }

  getData(): any {
    this.service.getUsers(this.localStorage.userToken).subscribe((response: any) => {
      if (response.success === true) {
        this.users = response.data;        
      } else {
       // this.token.checkTokenExamination(response.data, 'admin');
      }
    });
  }
  submitForm(): void {
    if (this.form.controls.userID.value == null) {
      this.messageService.add({
        severity: 'error',
        summary: 'کاربر را انتخاب کنید',
      });
    } else {
      this.service.addComment(this.localStorage.userToken, this.form.value).subscribe((response: { success: boolean; data: any; }) => {
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

