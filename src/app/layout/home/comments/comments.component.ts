import { Component } from '@angular/core';
import { PrimengModule } from '../../../primeng.module';
import { LayoutService } from '../../layout.service';
import { FormsModule } from '@angular/forms';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-comments',
  standalone: true,
  imports: [PrimengModule, FormsModule,CarouselModule],
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.scss'
})
export class CommentsComponent {

  responsiveOptions = [
    {
      breakpoint: '1024px',
      numVisible: 4,
      numScroll: 4,
    },
    {
      breakpoint: '992px',
      numVisible: 3,
      numScroll: 3,
    },
    {
      breakpoint: '768px',
      numVisible: 2,
      numScroll: 2
    },
    {
      breakpoint: '560px',
      numVisible: 1,
      numScroll: 1
    }
  ];

  customOptions: OwlOptions = {
    //  rtl: true,
      autoplay: true,
      autoplaySpeed: 1500,
      autoplayTimeout: 5000,
      loop: true,
      mouseDrag: true,
      touchDrag: true,
      pullDrag: true,
      dots: false,
      navSpeed: 1500,
      nav: true,
      navText: ['<i class="pi pi-chevron-left"></i>', '<i class="pi pi-chevron-right"></i>'],
      responsive: {
        0: {
          items:1
        },
        400: {
          items: 2
        },
        600: {
          items:3
        },
        740: {
          items: 4
        },
        940: {
          items: 4
        }
      }
    };

  items: any[] = []

  constructor(private service: LayoutService) { }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.service.getComments().subscribe((response: any) => {
      if (response.success === true) {
        this.items = response.data;
        console.log(this.items)
      } else {
        // this.messageService.add({
        //   severity: 'error',
        //   summary: ''
        // })
      }
    });
  }


}

