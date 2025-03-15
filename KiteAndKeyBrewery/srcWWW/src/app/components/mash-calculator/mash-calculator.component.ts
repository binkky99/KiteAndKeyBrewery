import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { DashboardElementComponent } from '../dashboard-element/dashboard-element.component';
import { MatRadioModule } from '@angular/material/radio';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormField, MatInputModule } from '@angular/material/input';
import { CommonModule, DecimalPipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { pairwise, startWith, Subject, takeUntil } from 'rxjs';
import { UnitsConversionService, VolumeUnits, WeightUnits, TemperatureUnits } from '../../services/units-conversion.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { UnitsControlComponent } from '../units-control/units-control.component';

export interface Units {
  label: string;
  weight: WeightUnits;
  volume: VolumeUnits;
  temperature: TemperatureUnits;
}

@Component({
  selector: 'app-mash-calculator',
  imports: [
    CommonModule,
    DashboardElementComponent,
    ReactiveFormsModule,
    MatIconModule,
    MatInputModule,
    MatRadioModule,
    UnitsControlComponent
  ],
  providers: [
    DecimalPipe,
    UnitsConversionService
  ],
  templateUrl: './mash-calculator.component.html',
  styleUrl: './mash-calculator.component.css'
})
export class MashCalculatorComponent implements OnInit {
  private destroyRef = inject(DestroyRef);

  unitsLabels: string[] = ['US - Gallons / Pounds / °F', 'US - Quarts / Pounds / °F', 'Metric - Liters / Kilograms / °C'];
  units: Units[] = [ 
    { label: this.unitsLabels[0], weight: WeightUnits.Pounds, volume: VolumeUnits.Gallons, temperature: TemperatureUnits.Fahrenheit },
    { label: this.unitsLabels[1], weight: WeightUnits.Pounds, volume: VolumeUnits.Quarts, temperature: TemperatureUnits.Fahrenheit },
    { label: this.unitsLabels[2], weight: WeightUnits.Kilograms, volume: VolumeUnits.Liters, temperature: TemperatureUnits.Celcius }
  ]
  get grainWeight() : FormControl { return this.formGroup.controls.grainWeight }
  get waterRatio() : FormControl | null { return this.formGroup.controls.waterRatio; }
  get firstRest() : FormControl | null { return this.formGroup.controls.firstRest; }
  // get selectedUnits(): Units | null { return this.formGroup.controls.selectedUnits?.value ?? null; }

  formGroup = new FormGroup({
    selectedUnits: new FormControl<Units>(this.units[0]),
    waterRatio: new FormControl<number>(0.31, [Validators.min(0)]),
    grainWeight: new FormControl<number>(10.00, [Validators.min(0)]),
    firstRest: new FormControl<number>(155, [Validators.min(0)])
  });

  constructor(private decimalPipe: DecimalPipe, 
              private unitsConverter: UnitsConversionService) { }

  formatInput(control: FormControl | null, event: any, format: string) {
    const inputVal = event.target.value;
    const num = Number(inputVal);

    if (!isNaN(num)) {
      control?.patchValue(num);
      event.target.value = this.decimalPipe.transform(num, format);
    } else {
      control?.patchValue(0.00);
      event.target.value = '';
    }
  }

  ngOnInit() {
    this.formGroup.get('selectedUnits')
      ?.valueChanges
      .pipe(
        startWith(this.units[0]),
        pairwise(), 
        takeUntilDestroyed(this.destroyRef))
      .subscribe(([previous, current]) => {
        const previousWeight = previous?.weight ?? WeightUnits.Pounds;
        const currentWeight = current?.weight ?? WeightUnits.Pounds;
        const previousVolume = previous?.volume ?? VolumeUnits.Gallons;
        const currentVolume = current?.volume ?? VolumeUnits.Gallons;
        const previousTemp = previous?.temperature ?? TemperatureUnits.Fahrenheit;
        const currentTemp = current?.temperature ?? TemperatureUnits.Fahrenheit;

        const grainWeight = this.formGroup.get('grainWeight')?.value ?? 0;
        const firstRest = this.formGroup.get('firstRest')?.value ?? 0;
        const waterRatio = this.formGroup.get('waterRatio')?.value ?? 0;
        let newWaterRatio = this.unitsConverter.convert(this.unitsConverter.convert(waterRatio, previousWeight, currentWeight),
          currentVolume, previousVolume);

        this.formGroup.patchValue({ 
          grainWeight: this.unitsConverter.convert(grainWeight, previousWeight, currentWeight),
          waterRatio: newWaterRatio,
          firstRest: this.unitsConverter.convert(firstRest, previousTemp, currentTemp)
        });
      });
  }
}
