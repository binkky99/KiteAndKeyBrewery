import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeerRecipeDashboard } from './beer-recipe-dashboard.component';

describe('BeerRecipeDashboard', () => {
  let component: BeerRecipeDashboard;
  let fixture: ComponentFixture<BeerRecipeDashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BeerRecipeDashboard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BeerRecipeDashboard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
