import { Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { CategoryDetailComponent } from './category-detail/category-detail.component';
import { CartComponent } from './cart/cart.component';
import { AccountComponent } from './profile/account/account.component';
import { DashboardComponent } from './profile/dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { OrderComponent } from './profile/order/order.component';
import { FooterComponent } from './shared/footer/footer.component';
import { FaqComponent } from './home/faq/faq.component';
import { CategoriesComponent } from './home/Categories/Categories.component';
import { NewArrivalsComponent } from './home/NewArrivals/NewArrivals.component';
import { productdetailComponent } from './product/product-detail.component';
export const routes: Routes = [
    { path: 'auth', component: LoginComponent },
    {
      path: '', component: LayoutComponent,
      children: [
        { path: 'NewArrivals', component: NewArrivalsComponent },
        { path: 'cart', component: CartComponent },
        { path: 'login', component: LoginComponent },
        { path: '', component: HomeComponent },
        { path: 'product/:id', component: productdetailComponent },
        { path: 'Categories', component: CategoriesComponent },
        { path: 'category/:category', component: CategoryDetailComponent },

        {
          path: 'profile',
          component: ProfileComponent,
          children: [
            { path: '', component: DashboardComponent },
            { path: 'order', component: OrderComponent },
            { path: 'account', component: AccountComponent },
          ]
        }
      ],
    },
  ];
  









