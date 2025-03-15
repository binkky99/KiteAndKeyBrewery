import { Injectable } from '@angular/core';

export enum WeightUnits {
  Pounds = "Lb",
  Kilograms = "Kg"
}

export enum VolumeUnits {
  Quarts = "Qrt",
  Gallons = "Gal",
  Liters = "Ltr"
}

export enum TemperatureUnits {
  Celcius = "°C",
  Fahrenheit = "°F",
}

interface IUnitsConversion {
  convert(value: number, fromUnit: any, toUnit: any): number;
  enumValues: string[];
}

abstract class UnitsConversion<T extends string> {
  protected abstract readonly conversionFactors: { [key in T]: number }
  protected readonly mFactors: { [key in T]: number } | null = null;
  abstract readonly enumValues: string[];

  public convert(value: number, fromUnit: T, toUnit: T): number {
    const fromFactor = this.conversionFactors[fromUnit];
    const toFactor = this.conversionFactors[toUnit];
    const fromMFactor = this.mFactors ? this.mFactors[fromUnit] : 0;
    const toMFactor = this.mFactors ? this.mFactors[toUnit] : 0;

    if (fromFactor === undefined || toFactor === undefined) {
      throw new Error('Invalid unit provided.');
    }

    return ((value - fromMFactor) * fromFactor) / toFactor + toMFactor;
  }
}

class VolumeConversion extends UnitsConversion<VolumeUnits> implements IUnitsConversion {
  protected override readonly conversionFactors = {
    [VolumeUnits.Quarts]: 1,
    [VolumeUnits.Gallons]: 0.25,
    [VolumeUnits.Liters]: 0.946353,
  }
  override enumValues: string[] = Object.values(VolumeUnits);
}

class WeightConversion extends UnitsConversion<WeightUnits> implements IUnitsConversion {
  protected override readonly conversionFactors = {
    [WeightUnits.Pounds]: 1,
    [WeightUnits.Kilograms]: 0.453592,
  }

  override enumValues: string[] = Object.values(WeightUnits);
}

class TemeratureConversion extends UnitsConversion<TemperatureUnits> {
  protected override readonly conversionFactors = {
    [TemperatureUnits.Celcius]: 9 / 5,
    [TemperatureUnits.Fahrenheit]: 1,
  }

  protected override readonly mFactors = {
    [TemperatureUnits.Celcius]: 0,
    [TemperatureUnits.Fahrenheit]: 32,
  }

  override enumValues: string[] = Object.values(TemperatureUnits);
}

@Injectable()
export class UnitsConversionService {
  private static unitClasses = [
    new TemeratureConversion,
    new VolumeConversion,
    new WeightConversion
  ]

  private readonly unitsMap = new Map<string, IUnitsConversion>();

  constructor() {
    UnitsConversionService.unitClasses.forEach((unitClass: IUnitsConversion) => {
      this.registerUnits(unitClass);
    })
  }

  hasUnits(units: any): boolean {
    return this.unitsMap.has(units);
  }

  convert(value: number, fromUnits: any, toUnits: any): number {
    if (fromUnits === toUnits) return value;
    
    let fromConvert = this.unitsMap.get(fromUnits);
    let toConvert  = this.unitsMap.get(toUnits);

    if (!toConvert || !fromConvert) return NaN;

    if (typeof toConvert !== typeof fromConvert) {
      return NaN;
    }

    return toConvert.convert(value, fromUnits, toUnits);
  }

  private registerUnits(unitsClass: IUnitsConversion) {
    unitsClass.enumValues.forEach(value => {
      if (this.unitsMap.has(value)) throw Error(`Unit already registered ${value}`);
      this.unitsMap.set(value, unitsClass);
    });
  }
}