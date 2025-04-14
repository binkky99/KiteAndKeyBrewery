import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MashCalculatorComponent } from './mash-calculator.component';

describe('TempVolumeCalculatorComponent', () => {
  let component: MashCalculatorComponent;
  let fixture: ComponentFixture<MashCalculatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MashCalculatorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MashCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
