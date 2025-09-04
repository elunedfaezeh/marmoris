import { ComponentFixture, TestBed } from '@angular/core/testing';

import { whyusComponent } from './why-us.component';

describe('whyusComponent', () => {
  let component: whyusComponent;
  let fixture: ComponentFixture<whyusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [whyusComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(whyusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
