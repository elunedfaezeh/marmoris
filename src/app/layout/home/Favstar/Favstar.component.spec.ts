import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavstarComponent } from './Favstar.component';

describe('ArticleComponent', () => {
  let component: FavstarComponent;
  let fixture: ComponentFixture<FavstarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FavstarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FavstarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
