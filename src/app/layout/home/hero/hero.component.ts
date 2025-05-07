import { Component } from '@angular/core';
import Typed from 'typed.js';
import { LayoutService } from '../../layout.service';
import { PrimengModule } from '../../../primeng.module';
@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [PrimengModule],
  providers: [LayoutService],

  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss'] 
})
export class HeroComponent {

  responsiveOptions: any[] = [
      {
          breakpoint: '991px',
          numVisible: 4
      },
      {
          breakpoint: '767px',
          numVisible: 3
      },
      {
          breakpoint: '575px',
          numVisible: 1
      }
  ];

  items: any[] = [
    { url: '/assets/images/hero.jpg' },
    { url: '/assets/images/hero.jpg' },

   
  ];

}
