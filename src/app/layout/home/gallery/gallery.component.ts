import { Component, OnInit,HostListener } from '@angular/core';
import {PrimengModule } from '../../../primeng.module';
import {MatrialModule}from '../../../matrial.module'
import { FormControl } from '@angular/forms';
@Component({
  selector: 'app-gallery',
  standalone:true,
  imports: [PrimengModule,MatrialModule,],
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  images: string[] = [
    '/assets/images/1.jpg',
    '/assets/images/2.jpg',
    '/assets/images/3.jpg',
    '/assets/images/4.jpg',
    '/assets/images/5.jpg',
    '/assets/images/6.jpg',
    '/assets/images/7.jpg',
    '/assets/images/8.jpg',
    '/assets/images/7.jpg',
    '/assets/images/6.jpg'
  ];
}