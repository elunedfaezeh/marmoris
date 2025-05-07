import { Component, OnInit } from '@angular/core';
import { PrimengModule } from '../../../../primeng.module';
import { LayoutService } from '../../../layout.service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-order-detail',
  standalone: true,
  imports: [PrimengModule],
  templateUrl: './order-detail.component.html',
  styleUrl: './order-detail.component.scss',
  providers: [MessageService]

})
export class OrderDetailComponent implements OnInit{
  order:any;
  constructor(
    private service:LayoutService,
    public ref: DynamicDialogRef,
    public messageService: MessageService,
    public config: DynamicDialogConfig) {
  }
  ngOnInit(): void {
    this.order = this.config.data.orders;
  }

}
