import { Component } from '@angular/core';
import { PrimengModule } from '../../primeng.module';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [PrimengModule],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.scss'
})
export class GalleryComponent {

}
