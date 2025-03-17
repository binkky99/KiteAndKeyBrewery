import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatFormField, MatInputModule } from '@angular/material/input';
import { UnitsConversionService } from '../../services/units-conversion.service';
import { CommonModule, DecimalPipe } from '@angular/common';
import { MashEntry } from '../../services/mash-data.service';

export class IterableType<T> {
  constructor(private controls: any) { }

  *[Symbol.iterator]() {
    for (const name in this.controls) {
      yield { key: name, value: this.controls[name] as T };
    }
  }
}

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
  @Input() data!: MashEntry[] | null;

  form!: FormGroup
  get controlArray(): FormArray {
    return this.form.get("items") as FormArray
  }

  constructor(private decimalPipe: DecimalPipe,
              private fb: FormBuilder) { }

  ngOnInit(): void {
    if (!this.data) return; 

    this.form = this.fb.group({
      items: this.fb.array(this.data.map(r => new FormControl(r, Validators.min(0))))
    })
  }
  // ngOnInit(): void {
  //   this.numeratorUnits?.forEach(unit => {
  //     if (!this.unitsService.hasUnits(unit)) {
  //       throw new Error(`Units are not registerd ${unit}`);
  //     }
  //   })

  //   this.denominatorUnits?.forEach(unit => {
  //     if (!this.unitsService.hasUnits(unit)) {
  //       throw new Error(`Units are not registerd ${unit}`);
  //     }
  //   })
  // }

  formatInput(formControl: AbstractControl | null, event: any, format: string) {
    const inputVal = event.target.value;
    const num = Number(inputVal);

    if (!isNaN(num)) {
      formControl?.patchValue({
        ...formControl.value,
        value: num
      });
      event.target.value = this.decimalPipe.transform(num, format);
    } else {
      formControl?.patchValue({
        ...formControl.value,
        value: 0.00
      });
      event.target.value = '';
    }
  }
}
