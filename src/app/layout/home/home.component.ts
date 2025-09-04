import { Component } from '@angular/core';
import { HeroComponent } from './hero/hero.component';
import { FaqComponent } from './faq/faq.component';
import { FavstarComponent } from './Favstar/Favstar.component';
import { whyusComponent } from './why-us/why-us.component';
import { CategoriesComponent } from './Categories/Categories.component';
import { NewArrivalsComponent } from './NewArrivals/NewArrivals.component';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeroComponent, CategoriesComponent, FaqComponent, FavstarComponent, whyusComponent, NewArrivalsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
