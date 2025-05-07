import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../../auth/local-storage.service';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { MatrialModule } from '../../matrial.module';
import { PrimengModule } from '../../primeng.module';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-admin',
  standalone: true,
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
  imports: [MatrialModule, PrimengModule, NgIf]
})
export class AdminComponent implements OnInit {
  mobile: any;
  fullName: any;
  image: any;
  items: MenuItem[];
  screenWidth: number;

  constructor(
    private localStorage: LocalStorageService,
    private router: Router,
  ) {

    this.screenWidth = window.innerWidth;
    window.onresize = () => {
      this.screenWidth =  window.innerWidth;
    };

    this.items = [
      {
        label: 'داشبرد',
        icon: 'pi pi-home',
        routerLink: '/admin',
      },
      {
        label: 'مدیریت کاربران',
        icon: 'pi pi-users',
        routerLink: '/admin/user',
      },
      {
        label: 'سوالات متداول',
        icon: 'pi pi-question-circle',
        routerLink: '/admin/faq',
      },
      {
        label: 'مدیریت گالری',
        icon: 'pi pi-images',
        routerLink: '/admin/gallery',
      },
      {
        label: 'مدیریت نظرات',
        icon: 'pi pi-comments',
        routerLink: '/admin/comment',
      },
      {
        label: 'مدیریت محصولات',
        icon: 'pi pi-list',
        routerLink: '/admin/product',
      },
      {
        label: 'مدیریت سفارشات',
        icon: 'pi pi-shopping-cart',
        routerLink: '/admin/order',
      },
      {
        label: 'تنظیمات',
        icon: 'pi pi-cog pi-spin',
        routerLink: '/admin/config',
      },
    ];
  }


  ngOnInit(): void {
    if (!this.localStorage.getCurrentUser('current') || this.localStorage.userType != 'admin') {
      this.router.navigateByUrl('admin/login');
    }
    this.image = this.localStorage.userImage;
    this.mobile = this.localStorage.userMobile;
    this.fullName = this.localStorage.userFullName;
  }

  logOut() {
    this.localStorage.removeCurrentUser();
    this.router.navigateByUrl('/admin/login');
  }
}
