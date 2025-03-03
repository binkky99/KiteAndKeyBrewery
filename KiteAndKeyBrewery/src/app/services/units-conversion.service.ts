import { Injectable } from '@angular/core';

export interface Units {
  label: string;
  weight: WeightUnits;
  volume: VolumeUnits;
}

export enum WeightUnits {
  Pounds = "Lb",
  Kilograms = "Kg"
}

export enum VolumeUnits {
  Quarts = "Qrt",
  Gallons = "Gal",
  Liters = "Ltr"
}

@Injectable()
abstract class UnitsConversion<T extends string> {
  protected abstract readonly conversionFactors: { [key in T]: number }

  public convert(value: number, fromUnit: T, toUnit: T): number {
    const fromFactor = this.conversionFactors[fromUnit];
    const toFactor = this.conversionFactors[toUnit];

    if (fromFactor === undefined || toFactor === undefined) {
      throw new Error('Invalid unit provided.');
    }

    return (value * fromFactor) / toFactor;
  }
}

// Would be great to abstract this and be able to call convert<T>() where T is the Units enum.
@Injectable({
  providedIn: 'root'
})
export class VolumeConversionService extends UnitsConversion<VolumeUnits> {
  protected override readonly conversionFactors: { [key in VolumeUnits]: number } = {
    [VolumeUnits.Quarts]: 1,
    [VolumeUnits.Gallons]: 0.25,
    [VolumeUnits.Liters]: 0.946353,
  }
}

@Injectable({
  providedIn: 'root'
})
export class WeightConversionService extends UnitsConversion<WeightUnits> {
  protected override readonly conversionFactors: { [key in WeightUnits]: number } = {
    [WeightUnits.Pounds]: 1,
    [WeightUnits.Kilograms]: 0.453592,
  }
}