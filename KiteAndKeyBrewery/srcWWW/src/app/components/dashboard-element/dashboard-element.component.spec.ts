import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardElementComponent } from './dashboard-element.component';

describe('CalculatorComponent', () => {
  let component: DashboardElementComponent;
  let fixture: ComponentFixture<DashboardElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardElementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
