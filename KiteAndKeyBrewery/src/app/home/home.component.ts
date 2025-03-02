import { Component } from '@angular/core';
import { MashCalculatorComponent } from '../components/mash-calculator/mash-calculator.component';

@Component({
  selector: 'app-home',
  imports: [MashCalculatorComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
