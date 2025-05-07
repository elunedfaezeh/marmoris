import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { LayoutService } from '../../layout.service';
import { LocalStorageService } from '../../../auth/local-storage.service';
import { ActivatedRoute } from '@angular/router';
import { PrimengModule } from '../../../primeng.module';
@Component({
  selector: 'app-result',
  standalone: true,
  imports: [PrimengModule],
  templateUrl: './result.component.html',
  styleUrl: './result.component.scss'
})
export class ResultComponent implements OnInit {
  authority: any;
  price: any;
  status: any;
  result: any;
  orderID: any;

  constructor(
    private cartService: CartService,
    private route: ActivatedRoute,
    private localStorage: LocalStorageService,
    private service: LayoutService
  ) { }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => this.status = params.get('Status'));
    this.route.queryParamMap.subscribe(params => this.authority = params.get('Authority'));
    this.route.queryParamMap.subscribe(params => this.price = params.get('price'));
    this.route.queryParamMap.subscribe(params => this.orderID = params.get('orderID'));
    this.verifyPayment();
  }

  verifyPayment() {
    let data = {
      price: this.price,
      authority: this.authority,
      orderID: this.orderID
    }
    this.service.verifyPayment(this.localStorage.userToken, data).subscribe((response: any) => {
      if (response.success === true) {
        this.result = true;
        this.cartService.clearCart();
        let data = { orderStatus: 'ثبت سفارش' }
        this.service.editOrder(this.localStorage.userToken, this.orderID, data).subscribe((response: any) => { });
      }
      else {
        this.result = false;
      }
    });
  }
}
