import { Component, Input, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatFormField, MatInputModule } from '@angular/material/input';
import { UnitsConversionService } from '../../services/units-conversion.service';
import { CommonModule, DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-units-control',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatIconModule,
    MatInputModule,
    MatFormField
  ],
  providers: [
    DecimalPipe,
    UnitsConversionService
  ],
  templateUrl: './units-control.component.html',
  styleUrl: './units-control.component.css'
})
export class UnitsControlComponent implements OnInit {
  @Input() control!: FormControl;
  @Input() numeratorUnits!: any[] | null;
  @Input() denominatorUnits!: any[];

  constructor(public unitsService: UnitsConversionService,
              private decimalPipe: DecimalPipe) { }

  ngOnInit(): void {
    this.numeratorUnits?.forEach(unit => {
      if (!this.unitsService.hasUnits(unit)) {
        throw new Error(`Units are not registerd ${unit}`);
      }
    })

    this.denominatorUnits?.forEach(unit => {
      if (!this.unitsService.hasUnits(unit)) {
        throw new Error(`Units are not registerd ${unit}`);
      }
    })
  }

  formatInput(formControl: FormControl | null, event: any, format: string) {
    const inputVal = event.target.value;
    const num = Number(inputVal);

    if (!isNaN(num)) {
      formControl?.patchValue(num);
      event.target.value = this.decimalPipe.transform(num, format);
    } else {
      formControl?.patchValue(0.00);
      event.target.value = '';
    }
  }
}
