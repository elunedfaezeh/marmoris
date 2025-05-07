import { Component, HostListener, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { MatrialModule } from '../../../matrial.module';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { PrimengModule } from '../../../primeng.module';

@Component({
  standalone: true,
  selector: 'app-dashboard',
  imports: [MatrialModule, MatCardModule, MatProgressBarModule, CommonModule, PrimengModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  isMobile: boolean = false;

  ngOnInit(): void {
  }

  
  
}
