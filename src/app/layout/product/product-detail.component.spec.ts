import { ComponentFixture, TestBed } from '@angular/core/testing';

import { productdetailComponent } from './product-detail.component';

describe('productdetailComponent', () => {
  let component: productdetailComponent;
  let fixture: ComponentFixture<productdetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [productdetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(productdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
