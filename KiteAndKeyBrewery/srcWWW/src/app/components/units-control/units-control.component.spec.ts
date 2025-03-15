import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitsControlComponent } from './units-control.component';

describe('UnitsControlComponent', () => {
  let component: UnitsControlComponent;
  let fixture: ComponentFixture<UnitsControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnitsControlComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnitsControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
