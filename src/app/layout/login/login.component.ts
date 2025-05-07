import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LocalStorageService } from '../../auth/local-storage.service';
import { LayoutService } from '../layout.service';
import { PrimengModule } from '../../primeng.module';
import { MessageService } from 'primeng/api';
import { Message } from 'primeng/api';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, PrimengModule, NgIf],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [MessageService]
})

export class LoginComponent implements OnInit {
  form: FormGroup | any;
  returnPath: any;
  code = "";
  display = false;
  timer = 90;
  invalidSMS: boolean = false;
  resendSMS: boolean = false;
  interval: any;
  messages: Message[] | any;
  value: any;

  constructor(
    private service: LayoutService,
    private messageService: MessageService,
    private router: Router,
    private localStorage: LocalStorageService,
    private rout: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.createform();
    switch (window.history.state.route) {
      case 'profile':
        this.returnPath = '/profile';
        break;
      case 'cart':
        this.returnPath = '/cart';
        break;
      default:
        this.returnPath = '/';
    }
  }

  startTimer() {
    this.interval = setInterval(() => {
      if (this.timer > 0) {
        this.timer--;
      } else {
        this.invalidSMS = false;
        this.resendSMS = true;
        this.timer = 0;
        this.code = "";
      }
    }, 1000);
  }

  randomNumber() {
    var text = '';
    var possible = '123456789';
    for (var i = 0; i < 4; i++) {
      var sup = Math.floor(Math.random() * possible.length);
      text += i > 0 && sup == i ? '0' : possible.charAt(sup);
    }
    return text;
  }

  sendSMS() {
    if (this.form.controls.mobile.value == null) {
      this.messageService.add({
        severity: 'error',
        summary: 'please enter the mobile',
      });
    }
    else if (this.form.controls.mobile.value.length < 11) {
      this.messageService.add({
        severity: 'error',
        summary: 'Enter the number correctly',
      });
    } else {
      this.display = true;
      this.code = this.randomNumber();
      let data = {
        "Mobile": this.form.value.mobile,
        "TemplateId": 375025,
        "Parameters": [
          {
            "Name": "Code",
            "Value": this.code
          }
        ]
      };
      this.service.sendSms(data).subscribe((result: any) => {
        if (result.status === 1) {
          this.invalidSMS = false;
          this.timer = 90;
          this.resendSMS = false;
          clearInterval(this.interval);
          this.startTimer();
        } else {
          console.log("شماره را به درستی وارد کنید");
        }
      });
    }
  }

  onVerifyCode(event: any) {
    if (this.code != "") {
      if (event.value !== this.code) {
        this.invalidSMS = true;
      } else {
        this.invalidSMS = false;
        this.login();
      }
    }
  }

  login() {
    // 🛒 مرحله 1: سبد خرید مهمان رو نگه می‌داریم
    const guestCart = localStorage.getItem('cartList');
  
    // 📡 مرحله 2: لاگین کاربر
    this.service.authUser(this.form.value).subscribe((result: any) => {
      if (result.success === true) {
  
        // 🧹 مرحله 3: پاک‌سازی اطلاعات قبلی کاربر ولی نگه‌داشتن cart
        this.localStorage.removeCurrentUser();
  
        // مرحله 4: ذخیره‌ی اطلاعات جدید کاربر
        this.localStorage.saveCurrentUser('current', JSON.stringify(result.data));
  
        // 🔁 مرحله 5: بازگرداندن سبد خرید اگر وجود داشته
        if (guestCart) {
          localStorage.setItem('cartList', guestCart);
        }
  
        // ✅ مرحله 6: هدایت به مسیر برگشتی
        this.router.navigateByUrl(this.returnPath);
  
      } else {
        console.log('خطا در ورود به حساب کاربری');
        this.messageService.add({
          severity: 'error',
          summary: 'ورود ناموفق',
          detail: result.data || 'لطفاً دوباره تلاش کنید'
        });
      }
    });
  }
  
  createform() {
    this.form = new FormGroup({
      mobile: new FormControl(null, Validators.compose([Validators.required])),
    })
  }

}
