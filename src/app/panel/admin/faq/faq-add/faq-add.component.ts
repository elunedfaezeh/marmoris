import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { AdminService } from '../../admin.service';
import { Validators, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from './../../../../auth/local-storage.service';
import { PrimengModule } from '../../../../primeng.module';

@Component({
  selector: 'app-faq-dialog',
  standalone: true,
  imports: [ReactiveFormsModule, PrimengModule],
  templateUrl: './faq-add.component.html',
  styleUrls: ['./faq-add.component.scss'],
  providers: [MessageService]
})
export class FaqAddComponent implements OnInit {
  public form: FormGroup | any;
  constructor(
    private localStorage: LocalStorageService,
    private service: AdminService,
    public ref: DynamicDialogRef,
    public messageService: MessageService,
    public config: DynamicDialogConfig) {
  }

  ngOnInit(): void {
    this.createform();
  }

  createform(): void {
    this.form = new FormGroup({
      question: new FormControl(null, [Validators.required]),
      reply: new FormControl(null, [Validators.required])
    });
  }

  submitForm(): void {
    if (this.form.controls.question.value == null) {
      this.messageService.add({
        severity: 'error',
        summary: ' سوال را وارد کنید.',
      });
    } else if (this.form.controls.reply.value == null) {
      this.messageService.add({
        severity: 'error',
        summary: ' پاسخ را وارد کنید.',
      });
    } else {
      this.service.addFaq(this.localStorage.userToken, this.form.value).subscribe((response: any) => {
        if (response.success === true) {
          this.ref.close(true);
        } else {
          this.messageService.add({ severity: 'error', summary: ' ثبت اطلاعات ', detail: response.data });
        }
      });
    }
  }

}
