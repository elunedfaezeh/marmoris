
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimengModule } from '../../primeng.module';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LocalStorageService } from '../../auth/local-storage.service';
import { LayoutService } from '../layout.service';
import { MessageService } from 'primeng/api';
//import { IActiveDate, NgPersianDatepickerModule } from 'ng-persian-datepicker';
import { Router } from '@angular/router';
//925342 کد قالب ثبت سفارش 
@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [PrimengModule, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss',
  providers: [MessageService]
})

export class OrderComponent implements OnInit {
  items: any[] | any;
  form: FormGroup | any;
  date: Date | undefined;
  dateValue = new FormControl();
  active = 0;
  display = false;
  isVertical = window.innerWidth > 991 ? false : true;
  today: any;
  productID: any;
  constructor(
    private messageService: MessageService,
    private localStorage: LocalStorageService,
    private service: LayoutService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (!this.localStorage.getCurrentUser('current') || this.localStorage.userType != 'user') {
      this.router.navigateByUrl('/auth')
    }
    // this.route.paramMap.subscribe((params) => { this.product = window.history.state });
    this.createForm();
  }

  createForm() {
    this.form = new FormGroup({
      mobile: new FormControl(this.localStorage.userMobile),
      phone: new FormControl(this.localStorage.userPhone),
      email: new FormControl(this.localStorage.userEmail),
      address: new FormControl(null),
      fullName: new FormControl(this.localStorage.userFullName),
    });
    this.form.controls.mobile.disable();
  }

  addOrder() {
    if (this.form.controls.fullName.value == null) {
      this.messageService.add({
        severity: 'error',
        summary: 'please enter fullname'
      });
    } else if (this.form.controls.address.value == null) {
      this.messageService.add({
        severity: 'error',
        summary: 'please enter address',
      });
    } else {
      this.service.editUser(this.localStorage.userToken, this.localStorage.userID, this.form.value).subscribe((response: any) => {
        if (response.success === true) {
          this.active++;
          let data = {
            productID: this.productID,
            title: "hyuj",
            number: 3,
            description: "ghggtgtfr",
            userID: this.localStorage.userID,
            date: new Date().toLocaleDateString('fa-IR-u-nu-latn'),
          }
          this.service.addOrder(this.localStorage.userToken, data).subscribe((response: any) => {
            if (response.success === true) {
              this.active++;
            } else {
              this.messageService.add({ severity: 'error', summary: ' ثبت اطلاعات ', detail: response.data });
            }
          });
        } else {
          this.messageService.add({
            severity: 'error',
            summary: ' ثبت نشد ',
          });
        }
      });
    }
  }



}
