import { Component } from '@angular/core';
import { PrimengModule } from '../../../primeng.module';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { AdminService } from '../admin.service';
import { TokenService } from '../../../auth/token.service';
import { LocalStorageService } from '../../../auth/local-storage.service';
import { AddCommentComponent } from './add-comment/add-comment.component';

@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [PrimengModule],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss',
  providers: [DialogService, MessageService, ConfirmationService]

})
export class CommentComponent {
 
  items: any[] = [];

  constructor(
    private messageService: MessageService,
    private dialogService: DialogService,
    private service: AdminService,
    private token: TokenService,
    private localStorage: LocalStorageService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit(): void {
    this.getData();
  }

  getData(): any {
    this.service.getComments(this.localStorage.userToken).subscribe((response: any) => {
      if (response.success === true) {
        this.items = response.data;        
      } else {
        this.token.checkTokenExamination(response.data, 'admin');
      }
    });
  }


  show() {
    const ref = this.dialogService.open(AddCommentComponent, {
      header: 'افزودن نظر',
      width: window.innerWidth > 840 ? '50%' : '95%',
      style: { "font-family": "farsi" }
    });
    ref.onClose.subscribe((res) => {
      if (res === true) {
        this.messageService.add({
          severity: 'success',
          summary: ' ثبت شد ',
        });
        this.getData();
      }
    });
  }


  delete(id: any): void {
    this.confirmationService.confirm({
      message: 'آیا از حذف رکورد انتخابی مطمین هستید؟',
      header: 'تایید حذف',
      icon: 'pi pi-exclamation-triangle',
      rejectLabel: 'خیر',
      acceptLabel: 'بله',
      defaultFocus: 'reject',
      accept: () => {
        this.service.deleteComment(this.localStorage.userToken, id).subscribe((response: any) => {
          if (response.success === true) {
            this.confirmationService.close();
            this.messageService.add({
              severity: 'success',
              summary: ' حذف شد',
            });
            this.getData();
          } else {
            this.messageService.add({
              severity: 'error',
              summary: ' حذف نشد ',
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
