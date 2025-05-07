import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { LocalStorageService } from '../../auth/local-storage.service';
import { PrimengModule } from '../../primeng.module';

@Component({
  selector: 'app-profile',
  standalone: true,
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  imports: [ PrimengModule],
})
export class ProfileComponent implements OnInit {
  mobile!: string;
  fullName!: string;
  image!: string;
  items: MenuItem[] = [];
  screenWidth: number = window.innerWidth;
  isMobile: boolean = window.innerWidth < 768;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.screenWidth = event.target.innerWidth;
    this.isMobile = this.screenWidth < 768;
  }

  constructor(
    private localStorage: LocalStorageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const currentUser = this.localStorage.getCurrentUser('current');

    if (!currentUser || this.localStorage.userType !== 'user') {
      this.router.navigate(['/login']);
      return;
    }

    this.image = this.localStorage.userImage ?? '';
    this.mobile = this.localStorage.userMobile ?? '';
    this.fullName = this.localStorage.userFullName ?? '';

    this.isMobile = this.screenWidth < 768;
  }


  initMenuItems() {
    this.items = [
      {
        label: 'داشبرد',
        icon: 'pi pi-home',
        routerLink: '/profile',
        tooltip: 'داشبرد',
      },
      {
        label: 'سفارش‌ها',
        icon: 'pi pi-shopping-bag',
        tooltip: 'سفارش‌ها',
        routerLink: '/profile/order',
      },
      {
        label: 'پروفایل',
        icon: 'pi pi-user',
        tooltip: 'پروفایل',
        routerLink: '/profile/account',
      },
      {
        label: 'خروج',
        icon: 'pi pi-sign-out',
        tooltip: 'خروج',
        command: () => this.logout(),
      },
    ];
  }

  logout() {
    this.localStorage.removeCurrentUser();
    this.router.navigate(['/']);
  }
}
