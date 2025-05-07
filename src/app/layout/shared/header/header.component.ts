import { Component, OnInit } from '@angular/core';
import { MenuItem, MegaMenuItem } from 'primeng/api';
import { ViewportScroller } from '@angular/common';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PrimengModule } from '../../../primeng.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessageService, ConfirmationService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CartService } from '../../cart/cart.service';
import { BadgeModule } from 'primeng/badge';
import { LocalStorageService } from '../../../auth/local-storage.service';
import { LayoutService } from '../../layout.service';
import { LoginComponent } from '../../login/login.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [PrimengModule, CommonModule, FormsModule, ReactiveFormsModule, BadgeModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [MessageService, ConfirmationService, DialogService],
})
export class HeaderComponent implements OnInit {
  items: MenuItem[] = [];
  display = false;
  cartCount: number = 0;
  currentUser: any = null;
  currentUserSubscription: Subscription | undefined;
  displayBasket: boolean = false;
  cartlist: any[] | undefined;
  constructor(
    private viewportScroller: ViewportScroller,
    private localStorage: LocalStorageService,
    private dialogService: DialogService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private service: LayoutService,
    public cartService: CartService,
    private router: Router) { }

  ngOnInit(): void {
    this.initializeMenu();
    this.updateCartCount();
    this.subscribeToUserStatus();
  }
  showBasket() {
    this.cartlist = this.cartService.getItems();
    this.displayBasket = !this.displayBasket;
  }
  subscribeToUserStatus(): void {
    this.currentUserSubscription = this.localStorage.currentUser$.subscribe(user => {
      this.currentUser = user;
    });
  }

  ngOnDestroy(): void {
    if (this.currentUserSubscription) {
      this.currentUserSubscription.unsubscribe();
    }
  }

  initializeMenu(): void {
    this.items = [
      {
        label: 'صفحه اصلی',
        command: () => {
          this.router.navigate(['/']).then(() => {
            setTimeout(() => {
              const element = document.getElementById('hero');
              if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }
            }, 0);
          });
        }
      },
      { label: 'تماس با ما', command: () => this.scrollToElement('footer') },
      { label: 'سوالات متداول', command: () => this.scrollToElement('faqs') },
    ];
  }

  scrollToElement(id: string) {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  updateCartCount(): void {
    this.cartCount = this.cartService.getCount();
  }

  goToCart(): void {
    this.router.navigate(['/cart']);
  }

  showMenu(): void {
    this.display = true;
  }

  onClick(elementId: string): void {
    this.viewportScroller.scrollToAnchor(elementId);
    if (this.display) {
      this.display = false;
    }
  }

  showLoginPage(): void {
    this.router.navigate(['/login']);
  }

}
