import { Component } from '@angular/core';
import { CalculatorComponent } from '../calculator/calculator.component';
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule } from '@angular/forms';
import { MatFormField, MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-mash-calculator',
  imports: [
    CalculatorComponent,
    FormsModule,
    MatInputModule,
    MatFormField,
    MatRadioModule
  ],
  templateUrl: './mash-calculator.component.html',
  styleUrl: './mash-calculator.component.css'
})
export class MashCalculatorComponent {
  units: string[] = ['US - Quarts / Pounds / °F', 'US - Gallons / Pounds / °F', 'Metric - Liters / Kilograms / °C'];
  selectedUnits: string = this.units[0];
  grainWeight: number = 10;
}
