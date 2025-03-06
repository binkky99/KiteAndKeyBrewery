import { Component } from '@angular/core';
import { DashboardElementComponent } from '../calculator/dashboard-element.component';
import { MatRadioModule } from '@angular/material/radio';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormField, MatInputModule } from '@angular/material/input';
import { CommonModule, DecimalPipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { pairwise, startWith, Subject, takeUntil } from 'rxjs';
import { Units, VolumeConversionService, VolumeUnits, WeightConversionService, WeightUnits } from '../../services/units-conversion.service';

@Component({
  selector: 'app-mash-calculator',
  imports: [
    CommonModule,
    DashboardElementComponent,
    ReactiveFormsModule,
    MatIconModule,
    MatInputModule,
    MatFormField,
    MatRadioModule
  ],
  providers: [
    DecimalPipe
  ],
  templateUrl: './mash-calculator.component.html',
  styleUrl: './mash-calculator.component.css'
})
export class MashCalculatorComponent {
  private destroy$ = new Subject<void>();

  unitsLabels: string[] = ['US - Gallons / Pounds / °F', 'US - Quarts / Pounds / °F', 'Metric - Liters / Kilograms / °C'];
  units: Units[] = [ 
    { label: this.unitsLabels[0], weight: WeightUnits.Pounds, volume: VolumeUnits.Gallons },
    { label: this.unitsLabels[1], weight: WeightUnits.Pounds, volume: VolumeUnits.Quarts },
    { label: this.unitsLabels[2], weight: WeightUnits.Kilograms, volume: VolumeUnits.Liters }
  ]
  get grainWeight() : FormControl | null { return this.formGroup.controls.grainWeight }
  get waterRatio() : FormControl | null { return this.formGroup.controls.waterRatio; }
  get weightSuffix() { return this.formGroup.controls.selectedUnits.value?.weight; }
  get volumeSuffix() { return this.formGroup.controls.selectedUnits.value?.volume; }

  formGroup = new FormGroup({
    selectedUnits: new FormControl<Units>(this.units[0]),
    waterRatio: new FormControl<number>(0.31),
    grainWeight: new FormControl<number>(10.00, [Validators.min(0)])
  });

  constructor(private decimalPipe: DecimalPipe, 
              private volumeConverter: VolumeConversionService,
              private weightConverter: WeightConversionService) { }

  formatInput(control: FormControl | null, event: any) {
    const inputVal = event.target.value;
    const num = Number(inputVal);

    if (!isNaN(num)) {
      control?.patchValue(num);
      event.target.value = this.decimalPipe.transform(num, '1.2-2');
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
        takeUntil(this.destroy$))
      .subscribe(([previous, current]) => {
        const previousWeight = previous?.weight ?? WeightUnits.Pounds;
        const currentWeight = current?.weight ?? WeightUnits.Pounds;
        const previousVolume = previous?.volume ?? VolumeUnits.Gallons;
        const currentVolume = current?.volume ?? VolumeUnits.Gallons;

        const grainWeight = this.formGroup.get('grainWeight')?.value ?? 0;
        const waterRatio = this.formGroup.get('waterRatio')?.value ?? 0;
        let newWaterRatio = this.volumeConverter.convert(this.weightConverter.convert(waterRatio, previousWeight, currentWeight),
          previousVolume, currentVolume);

        this.formGroup.patchValue({ 
          grainWeight: this.weightConverter.convert(grainWeight, previousWeight, currentWeight),
          waterRatio: newWaterRatio
        });
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
