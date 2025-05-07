import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from '../../../auth/local-storage.service';
import { MatrialModule } from '../../../matrial.module';
import { PrimengModule } from '../../../primeng.module';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  imports: [MatrialModule, PrimengModule],
})
export class DashboardComponent implements OnInit {
  products!: any[];
  events = [
    { status: 'Ordered', date: '15/10/2020 10:30', icon: 'pi pi-shopping-cart', color: '#9C27B0', image: 'game-controller.jpg' },
    { status: 'Processing', date: '15/10/2020 14:00', icon: 'pi pi-cog', color: '#673AB7' },
    { status: 'Shipped', date: '15/10/2020 16:15', icon: 'pi pi-shopping-cart', color: '#FF9800' },
    { status: 'Delivered', date: '16/10/2020 10:00', icon: 'pi pi-check', color: '#607D8B' }
  ];
  chartData = {
    labels: ['Q1', 'Q2', 'Q3', 'Q4'],
    datasets: [
      {
        label: 'Sales',
        data: [540, 325, 702, 620],
        backgroundColor: ['rgba(255, 159, 64, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(153, 102, 255, 0.2)'],
        borderColor: ['rgb(255, 159, 64)', 'rgb(75, 192, 192)', 'rgb(54, 162, 235)', 'rgb(153, 102, 255)'],
        borderWidth: 1
      }
    ]
  };

  constructor(
    private localStorage: LocalStorageService,
    private router: Router,) { }

  ngOnInit(): void {
    if (!this.localStorage.getCurrentUser('current') || this.localStorage.userType != 'admin') {
      this.router.navigateByUrl('admin/login');
    }
    this.products = [
      { name: "اپل واچ", image: "https://www.apple.com/newsroom/images/product/watch/standard/Apple_watch-series7_hero_09142021_big.jpg.large.jpg", price: 30000, rating: 4 },
      { name: "اپل واچ", image: "https://www.apple.com/newsroom/images/product/watch/standard/Apple_watch-series7_hero_09142021_big.jpg.large.jpg", price: 30000, rating: 4.5 },
      { name: "اپل واچ", image: "https://www.apple.com/newsroom/images/product/watch/standard/Apple_watch-series7_hero_09142021_big.jpg.large.jpg", price: 30000, rating: 3 },
      { name: "اپل واچ", image: "https://www.apple.com/newsroom/images/product/watch/standard/Apple_watch-series7_hero_09142021_big.jpg.large.jpg", price: 30000, rating: 5 },
    ]
  }


  logOut() {
    this.localStorage.removeCurrentUser();
    this.router.navigateByUrl('/admin/login');
  }

}









