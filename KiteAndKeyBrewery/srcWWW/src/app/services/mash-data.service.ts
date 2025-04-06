import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface MashEntry {
  id: string,
  value: number,
  units: string,
  label: string,
  icon: string
}

const data: MashEntry[] = [
  {
    id: "grain-weight",
    value: 10.00,
    units: "Lb",
    label: "Grain Weight",
    icon: "scale"
  },
  {
    id: "water-grain-ratio",
    value: 0.31,
    units: "Gal / Lb",
    label: "Mash Water/Grain Ratio",
    icon: "water_drop"
  },
  {
    id: "first-rest-temperature",
    value: 155,
    units: "°F",
    label: "First Rest Temperature",
    icon: "thermostat"
  },
  {
    id: "grain-temperature",
    value: 65,
    units: "°F",
    label: "Grain Temperature",
    icon: "thermostat"
  },
  {
    id: "boiling-temperature",
    value: 212,
    units: "°F",
    label: "Boiling Temperature",
    icon: "thermostat"
  },
]

@Injectable()
export class MashDataService {
  private data = data;
  private readonly API_URL = 'http://localhost:8080/';

  constructor(private http: HttpClient) { }

  getData(): Observable<any> {
    return this.http.get(`${this.API_URL}/resources/default-recipe`);
  }

  setData(newData: any): Observable<void> {
    this.data = newData;
    
    return of()
  }
}
