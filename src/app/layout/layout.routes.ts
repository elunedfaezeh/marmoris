import { Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ProductComponent } from './product/product.component';
import { ProductsComponent } from './products/products.component';
import { GalleryComponent } from './gallery/gallery.component';
import { WorksComponent } from './works/works.component';
import { NewsComponent } from './home/news/news.component';
import { CategoryDetailComponent } from './category-detail/category-detail.component';
import { ServiceComponent } from './home/service/service.component';
import { CartComponent } from './cart/cart.component';
import { AccountComponent } from './profile/account/account.component';
import { DashboardComponent } from './profile/dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { OrderComponent } from './profile/order/order.component';
import { FooterComponent } from './shared/footer/footer.component';
import { FaqComponent } from './home/faq/faq.component';
export const routes: Routes = [
    { path: 'auth', component: LoginComponent },
    {
      path: '', component: LayoutComponent,
      children: [
        { path: 'news', component: NewsComponent },
        { path: 'cart', component: CartComponent },
        { path: 'login', component: LoginComponent },
        { path: '', component: HomeComponent },
        { path: 'product/:id', component: ProductComponent },
        { path: 'services', component: ServiceComponent },
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
  









