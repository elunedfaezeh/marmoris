import { Component } from '@angular/core';
import { PrimengModule } from '../../../primeng.module';
import { LayoutService } from '../../layout.service';
import { MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-app',
  standalone: true,
  imports: [PrimengModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [MessageService],
})
export class AppComponent {
  url = "";
  product: any;
  id: any;
  images: any[] = [
    { url: '/assets/images/1.jpg' },
    { url: '/assets/images/2.jpg' },
    { url: '/assets/images/3.jpg' },
    { url: '/assets/images/4.jpg' },
    { url: '/assets/images/5.jpg' },
    { url: '/assets/images/6.jpg' },
  ];
  constructor(
    private service: LayoutService,
    private router: Router,
    private messageService: MessageService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getProduct();
    this.url = this.images[0].url;
  }

  getProduct() {
    this.service.getProduct(this.id).subscribe((response: any) => {
      if (response.success === true) {
        this.product = response.data;
        this.url = this.product.image;
      } else {
        this.messageService.add({
          severity: 'error',
          summary: 'یافت نشد',
          detail: response.data,
        });
      }
    });
  }

  onChange(item: any) {
    this.url = item
  }

  addOrder() {
    // this.router.navigate(['/order', { id: this.id }]);
    this.router.navigate(['/order'], { queryParams: { id: this.id } });
    console.log("uyyu");

  }

}
