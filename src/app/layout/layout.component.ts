import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from "./shared/footer/footer.component";
import { HeaderComponent } from './shared/header/header.component';
import { PrimengModule } from '../primeng.module';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet,PrimengModule, FooterComponent, HeaderComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {

}
