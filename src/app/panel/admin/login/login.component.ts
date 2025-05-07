import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { LocalStorageService } from '../../../auth/local-storage.service';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { AdminService } from './../admin.service';
import { Component, OnInit } from '@angular/core';
import { PrimengModule } from '../../../primeng.module';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [PrimengModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  providers: [MessageService]
})
export class LoginComponent {
  form: FormGroup | any;
  constructor(
    private service: AdminService,
    private messageService: MessageService,
    private localStorage: LocalStorageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (this.localStorage.getCurrentUser('current') && this.localStorage.userType == 'admin') {
      this.router.navigateByUrl('/admin');
    }
    this.form = new FormGroup({
      userName: new FormControl(null, Validators.compose([Validators.required])),
      password: new FormControl(null, Validators.compose([Validators.required])),
    });
  }

  login(): void {
    if (this.form.controls.userName.value == null || this.form.controls.userName.value == "") {
      this.messageService.add({
        severity: 'error',
        summary: 'نام کاربری را وارد کنید.',
      });
    } else if (this.form.controls.password.value == null || this.form.controls.password.value == "") {
      this.messageService.add({
        severity: 'error',
        summary: 'رمز عبور را وارد کنید  .',
      });
    }
    else {
      this.service.login(this.form.value).subscribe((result: { success: boolean; data: any; }) => {
        if (result.success == true) {
          this.localStorage.removeCurrentUser();
          this.localStorage.saveCurrentUser('current', JSON.stringify(result.data));
          this.router.navigateByUrl('/admin');
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'خطا',
            detail: 'نام کاربری یا کلمه عبور صحیح نمی باشد.',
          });
        }
      });
    }

  }
}

